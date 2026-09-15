"""
Upload dist/ to the live site.

    python tools/deploy.py --dry-run     show what would change, touch nothing
    python tools/deploy.py               back up the remote, then upload
    python tools/deploy.py --no-backup   skip the backup step

Transport is SFTP over SSH, which is encrypted end to end. The server's host key
is pinned in tools/known_hosts and an unknown key is rejected rather than
auto-trusted, so a substituted server fails the connection instead of silently
receiving the credentials.

Credentials come from the gitignored .env and appear nowhere in this file:

    SSH_HOST, SSH_PORT, SSH_USER, SSH_PASS, SSH_DIR

SSH_DIR matters. This hosting account carries more than one site, so the upload
is scoped to one web root and the script refuses to run against a home
directory — a stray value there would scatter 53 files across unrelated sites.
"""

import argparse, io, os, posixpath, sys, time

try:
    import paramiko
except ImportError:
    sys.exit('paramiko is required: python -m pip install paramiko')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
KNOWN_HOSTS = os.path.join(ROOT, 'tools', 'known_hosts')


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
    missing = [k for k in ('SSH_HOST', 'SSH_USER', 'SSH_PASS', 'SSH_DIR') if not env.get(k)]
    if missing:
        sys.exit(f'Missing from .env: {", ".join(missing)}')
    target = env['SSH_DIR'].strip('/')
    # Refuse anything that isn't clearly a web root inside this account.
    if not target.endswith('public_html') or target in ('', '.', '~'):
        sys.exit(f'SSH_DIR must point at a public_html directory, got "{env["SSH_DIR"]}"')
    return env


def connect(env):
    c = paramiko.SSHClient()
    if not os.path.exists(KNOWN_HOSTS):
        sys.exit(f'No pinned host key at {KNOWN_HOSTS} — run:\n'
                 f'  ssh-keyscan -p {env.get("SSH_PORT", 22)} {env["SSH_HOST"]} > tools/known_hosts')
    c.load_host_keys(KNOWN_HOSTS)
    c.set_missing_host_key_policy(paramiko.RejectPolicy())
    c.connect(env['SSH_HOST'], port=int(env.get('SSH_PORT', 22)),
              username=env['SSH_USER'], password=env['SSH_PASS'],
              timeout=30, allow_agent=False, look_for_keys=False)
    return c


def local_files():
    out = []
    for dp, _, fn in os.walk(DIST):
        for name in fn:
            full = os.path.join(dp, name)
            out.append(os.path.relpath(full, DIST).replace(os.sep, '/'))
    return sorted(out)


def ensure_dir(sftp, path, made):
    if not path or path in made:
        return
    parent = posixpath.dirname(path)
    if parent:
        ensure_dir(sftp, parent, made)
    try:
        sftp.stat(path)
    except IOError:
        sftp.mkdir(path)
    made.add(path)


def remote_size(sftp, path):
    try:
        return sftp.stat(path).st_size
    except IOError:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--no-backup', action='store_true')
    args = ap.parse_args()

    if not os.path.isdir(DIST):
        sys.exit('No dist/ — run `npm run build` first.')

    env = load_env()
    files = local_files()
    target = env['SSH_DIR'].rstrip('/')
    print(f'{len(files)} files in dist/  ->  {target}')

    client = connect(env)
    print('connected over SFTP, host key verified against tools/known_hosts')
    sftp = client.open_sftp()

    try:
        sftp.stat(target)
    except IOError:
        sys.exit(f'Remote directory does not exist: {target}')

    if not args.dry_run and not args.no_backup:
        stamp = time.strftime('%Y%m%d-%H%M%S')
        parent, leaf = posixpath.split(target)
        archive = f'ytsum-backup-{stamp}.tar.gz'
        cmd = f'tar -czf {archive} -C {parent} {leaf}'
        _, out, err = client.exec_command(cmd)
        rc = out.channel.recv_exit_status()
        msg = err.read().decode().strip()
        print(f'backup: {archive}' + (f' (rc={rc}: {msg})' if rc else ' — created in home directory'))

    made, sent, failed = set(), 0, []
    for rel in files:
        local = os.path.join(DIST, rel.replace('/', os.sep))
        remote = posixpath.join(target, rel)
        size = os.path.getsize(local)

        if args.dry_run:
            was = remote_size(sftp, remote)
            state = 'NEW' if was is None else ('same size' if was == size else f'{was:,} -> {size:,} B')
            print(f'  {rel:<46} {state}')
            continue

        d = posixpath.dirname(remote)
        ensure_dir(sftp, d, made)
        try:
            sftp.put(local, remote)
            sent += 1
            print(f'  {rel:<46} {size:>9,} B')
        except Exception as e:
            failed.append((rel, str(e)))
            print(f'  FAILED {rel}: {e}')

    sftp.close()
    client.close()
    print()
    if args.dry_run:
        print('dry run — nothing was written')
    else:
        print(f'uploaded {sent}/{len(files)} files')
        for rel, e in failed:
            print(f'  failed: {rel}: {e}')


if __name__ == '__main__':
    main()
