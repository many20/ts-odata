export interface IFilterClause<FilterType = any, FilterOfType = any> {
    property: keyof FilterType | null;
    components: string[];
    isClauseEmpty: boolean;
    propertyIncluded: boolean;
    usingNot: boolean;
    value: string | number | boolean | undefined;
    funcReturnType: string | number | boolean | undefined;
    transformFunc: Function | undefined;

    toString(): string;
}
