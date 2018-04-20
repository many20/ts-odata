export interface IFilterClause<FilterType = any, FilterOfType = any> {
    property: keyof FilterType | null;
    components: string[];
    isClauseEmpty: boolean;
    propertyIncluded: boolean;
    usingNot: boolean;
    value: string | number | boolean | null;
    funcReturnType: string | number | boolean | null;
    transformFunc: Function | null;

    toString(): string;
}
