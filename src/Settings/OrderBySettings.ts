export class OrderBySettings {

    property: string | null | undefined;
    order: string | null;
    defaultProperty: string | null;
    defaultOrder: string | null;

    constructor() {
        this.property = null;
        this.order = null;
        this.defaultProperty = null;
        this.defaultOrder = null;
    }

    toString(): string {
        let qsValue: string = '$orderby=' + (this.property || this.defaultProperty);
        if (this.defaultOrder !== null || this.order !== null) {
            qsValue += ' ' + (this.order || this.defaultOrder);
        }

        return qsValue;
    }

    reset(): void {
        this.property = null;
        this.order = null;
    }

    isSet(): boolean {
        return (this.property !== null && typeof this.property !== 'undefined') || this.defaultProperty !== null;
    }
}
