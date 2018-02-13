import { FilterClause } from './FilterClause';
import { PrecedenceGroup } from './PrecedenceGroup';

export class FilterObj<FilterType = any> {

    filterObj: FilterClause<FilterType> | PrecedenceGroup<FilterType>;
    logicalOperator: string | null;

    constructor(filterObj: FilterClause<FilterType> | PrecedenceGroup<FilterType>, logicalOperator: string | null = null) {
        this.filterObj = filterObj;
        this.logicalOperator = null;

        if (logicalOperator !== undefined && logicalOperator !== null) {
            this.logicalOperator = logicalOperator;
        }
    }

    toString (i: number): string {
        let filter = '';
        if (this.logicalOperator !== null && i > 0) {
            filter += ' ' + this.logicalOperator + ' ';
        } else if (i > 0 && this.logicalOperator === null) {
            filter += ' and ';
        }

        filter += this.filterObj.toString();

        return filter;
    }
}
