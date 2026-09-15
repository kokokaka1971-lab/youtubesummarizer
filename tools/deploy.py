"""
Upload dist/ to Hostinger over FTP.

    python tools/deploy.py --dry-run     list what would change, touch nothing
    python tools/deploy.py               upload

Credentials come from .env (gitignored) and are never written here:

    FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS, FTP_DIR

Transport: we ask for explicit FTPS first and use it if the certificate
verifies. Hostinger's certificate is not issued for the bare IP and the host has
no reverse DNS, so in practice that check fails and we fall back to plain FTP,
which sends the password in the clear. The script says which one it got and
tells you to rotate the password when it wasn't encrypted. If you would rather
never send it in the clear, upload dist/ through hPanel's File Manager over
HTTPS instead, or switch the account to SFTP if your plan offers it.
"""

import argparse, io, os, ssl, sys
from ftplib import FTP, FTP_TLS, error_perm

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')


def load_env():
    env = {}
    path = os.path.join(ROOT, '.env')
    if not os.path.exists(path):
        sys.exit('No .env found — cannot deploy without credentials.')
    for line in io.open(path, encoding='utf-8'):
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        env[k.strip()] = v.split('#')[0].strip()
    missing = [k for k in ('FTP_HOST', 'FTP_USER', 'FTP_PASS') if not env.get(k)]
    if missing:
        sys.exit(f'Missing from .env: {", ".join(missing)}')
    return env


def connect(env):
    """Explicit FTPS if the certificate verifies, otherwise plain FTP."""
    host, port = env['FTP_HOST'], int(env.get('FTP_PORT', 21))
    user, pw = env['FTP_USER'], env['FTP_PASS']
    try:
        f = FTP_TLS(context=ssl.create_default_context())
        f.connect(host, port, timeout=30)
        f.login(user, pw)
        f.prot_p()
        return f, 'FTPS, certificate verified'
    except ssl.SSLCertVerificationError as e:
        print(f'  FTPS certificate did not verify ({e.verify_message}); using plain FTP')
    except Exception as e:
        print(f'  FTPS unavailable ({type(e).__name__}); using plain FTP')
    f = FTP()
    f.connect(host, port, timeout=30)
    f.login(user, pw)
    return f, 'plain FTP — credentials sent in the clear'


def local_files():
    out = []
    for dp, _, fn in os.walk(DIST):
        for name in fn:
            full = os.path.join(dp, name)
            out.append(os.path.relpath(full, DIST).replace(os.sep, '/'))
    return sorted(out)


def ensure_dir(ftp, path, made):
    """mkd each missing segment of a remote directory path."""
    if not path or path in made:
        return
    parent = os.path.dirname(path)
    if parent:
        ensure_dir(ftp, parent, made)
    try:
        ftp.mkd(path)
    except error_perm as e:
        if not str(e).startswith('550'):   # 550 here means it already exists
            raise
    made.add(path)


def remote_size(ftp, path):
    try:
        return ftp.size(path)
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    if not os.path.isdir(DIST):
        sys.exit('No dist/ — run `npm run build` first.')

    env = load_env()
    files = local_files()
    print(f'{len(files)} files in dist/')

    ftp, how = connect(env)
    print(f'connected: {how}')
    target = env.get('FTP_DIR', '.')
    if target not in ('.', ''):
        ftp.cwd(target)
    print(f'remote cwd: {ftp.pwd()}\n')

    made, sent, failed = set(), 0, []
    for rel in files:
        local = os.path.join(DIST, rel.replace('/', os.sep))
        size = os.path.getsize(local)

        if args.dry_run:
            was = remote_size(ftp, rel)
            state = 'NEW' if was is None else ('unchanged size' if was == size else f'{was:,} -> {size:,} B')
            print(f'  {rel:<46} {state}')
            continue

        d = os.path.dirname(rel)
        if d:
            ensure_dir(ftp, d, made)
        try:
            with open(local, 'rb') as fh:
                ftp.storbinary(f'STOR {rel}', fh)
            sent += 1
            print(f'  {rel:<46} {size:>9,} B')
        except Exception as e:
            failed.append((rel, str(e)))
            print(f'  FAILED {rel}: {e}')

    ftp.quit()
    print()
    if args.dry_run:
        print('dry run — nothing was written')
    else:
        print(f'uploaded {sent}/{len(files)} files')
        for rel, e in failed:
            print(f'  failed: {rel}: {e}')
    if 'clear' in how:
        print('\nThe password crossed the network unencrypted — rotate it in hPanel.')


if __name__ == '__main__':
    main()
