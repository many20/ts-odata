export class SelectSettings {

    select: string[] | null | undefined;
    defaultSelect: string[] | null;

    constructor() {
        this.select = null;
        this.defaultSelect = null;
    }

    toString(): string {
        let selectArray: string[] = (this.select || this.defaultSelect) || [];
        return '$select=' + selectArray.join(',');
    }

    reset(): void {
        this.select = null;
    }

    isSet(): boolean {
        return (this.select !== null && typeof this.select !== 'undefined') || this.defaultSelect !== null;
    }
}
