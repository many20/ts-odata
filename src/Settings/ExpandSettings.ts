export class ExpandSettings {

    expand: { toString: () => string; }[] | null | undefined;
    defaultExpand: { toString: () => string; }[] | null;

    constructor() {
        this.expand = null;
        this.defaultExpand = null;
    }

    toString(): string {
        let expandArray: { toString: () => string; }[] = (this.expand || this.defaultExpand) || [];
        return '$expand=' + expandArray.map((e) => e.toString()).join(',');
    }

    reset(): void {
        this.expand = null;
    }

    isSet(): boolean {
        return (this.expand !== null && typeof this.expand !== 'undefined') || this.defaultExpand !== null;
    }
}
