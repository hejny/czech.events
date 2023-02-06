import node_ssh from 'node-ssh';
// TODO: Maybe use https://github.com/MatthieuLemoine/ssh2-client

export class SSHClient {
    constructor(sshCredentials, remoteDir, log = true /*TODO: logger instead*/) {
        this.remoteDir = remoteDir;
        this.sshCredentials = sshCredentials;
        this.log = log;
    }

    async connect() {
        //TODO: Method name? init?
        this.client = new node_ssh();
        this.sshCredentials.username = this.sshCredentials.user; //TODO: Better
        this.sshCredentials.privateKey = this.sshCredentials.privateKeyFile; //TODO: Better
        await this.client.connect(this.sshCredentials);
        return this;
    }

    async exec(command, crashOnError = true /*, cwd = this.remoteDir*/) {
        if (this.log) console.info('\x1b[36m%s\x1b[0m', command, '\x1b[0m');
        const result = await this.client.execCommand(command, { cwd: this.remoteDir });
        //code:
        //console.info(result);

        if (this.log) console.info(result.stdout);

        if (result.code === 1 && crashOnError) {
            throw new Error(result.stderr);
        } else {
            if (result.stderr) {
                if (this.log) console.warn(result.stderr);
            }
        }

        return result.stdout;
    }

    async list() {
        const ls = await this.exec('ls', true);
        //console.info('ls', ls);
        const dirs = ls.split(/\s+/);
        //console.info('dirs', dirs);
        return dirs;
    }

    dispose() {
        //TODO: Method name?
        this.client.dispose();
    }

    // TODO: Add also file commands
}
