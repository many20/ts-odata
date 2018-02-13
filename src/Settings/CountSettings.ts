export class CountSettings {
    
    count: string | null | undefined;
    defaultCount: string | null;

    constructor() {
        this.count = null;
        this.defaultCount = null;
    }

    toString(): string {
        return '$count=' + (this.count || this.defaultCount);
    }

    reset(): void {
        this.count = null;
    }

    isSet(): boolean {
        return (this.count !== null && typeof this.count !== 'undefined') || this.defaultCount !== null;
    }
}
