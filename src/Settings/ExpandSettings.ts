export class ExpandSettings {

    Expand: string[];
    DefaultExpand: string[];

    constructor() {
        this.Expand = [];
        this.DefaultExpand = [];
    }

    toString(): string {
        let allExpands: { toString: () => string; }[] = [];
        let expand: string= '$expand=';

        if (this.DefaultExpand.length > 0) {
            for (let i = 0; i < this.DefaultExpand.length; i++) {
                allExpands.push(this.DefaultExpand[i]);
            }
        }

        for (let i = 0; i < this.Expand.length; i++) {
            allExpands.push(this.Expand[i]);
        }

        expand += allExpands.join(',');

        return expand;
    }

    reset(): void {
        this.Expand = [];
    }

    isSet(): boolean {
        return this.Expand.length > 0 || this.DefaultExpand.length > 0;
    }
}
