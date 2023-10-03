export class Timeout {
    private _timeout: NodeJS.Timeout = null;

    constructor(public delay: number) { }

    public get isRunning(): boolean { return !!this._timeout; }

    public start(): Promise<void> {
        if (this.isRunning)
            throw new Error('timeout has started already');

        return new Promise(resolve => this._timeout = setTimeout(() => resolve(), this.delay));
    }

    public stop(): void {
        if (!this.isRunning)
            return;

        clearTimeout(this._timeout);
        this._timeout = null;
    }

    public restart(): Promise<void> {
        this.stop();
        return this.start();
    }
}