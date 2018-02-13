export class FindSettings {
    
    find: string | null | undefined;
    defaultFind: string | null;

    constructor() {
        this.find = null;
        this.defaultFind = null;
    }

    toString(): string {
        return '(' + (this.find !== null ? this.find : this.defaultFind) + ')';
    };

    reset(): void {
        this.find = null;
    }

    isSet(): boolean {
        return (this.find !== null && typeof this.find !== 'undefined') || this.defaultFind !== null;
    }
}
