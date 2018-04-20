import { FilterClause } from './FilterClause';
import { FilterObj } from './FilterObj';

export class PrecedenceGroup<FilterType = any> {
    clauses: FilterObj[];

    constructor(filterClause?: FilterClause<FilterType>) {
        this.clauses = [];

        if (filterClause !== undefined) {
            this.clauses.push(new FilterObj(filterClause));
        }
    }

    isEmpty(): boolean {
        return this.clauses.length === 0;
    }

    andFilter(filterClause: FilterClause<FilterType>): PrecedenceGroup<FilterType> {
        this.clauses.push(new FilterObj(filterClause, 'and'));

        return this;
    }

    orFilter(filterClause: FilterClause<FilterType>): PrecedenceGroup<FilterType> {
        this.clauses.push(new FilterObj(filterClause, 'or'));

        return this;
    }

    toString(): string {
        let filter: string;

        filter = '(';
        for (let i = 0; i < this.clauses.length; i++) {
            filter += this.clauses[i].toString(i);
        }
        filter += ')';

        return filter;
    }
}
