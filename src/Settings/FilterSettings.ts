import { FilterClause } from '../FilterClause';
import { PrecedenceGroup } from '../PrecedenceGroup';
import { FilterObj } from '../FilterObj';

export class FilterSettings {
    filters: FilterObj[];
    defaultFilters: FilterObj[];
    capturedFilter: FilterObj[];

    constructor() {
        this.filters = [];
        this.defaultFilters = [];
        this.capturedFilter = [];
    }

    toString() {
        const allFilters: FilterObj[] = [];
        let filter: string = '$filter=';

        if (this.defaultFilters.length > 0) {
            for (let i = 0; i < this.defaultFilters.length; i += 1) {
                allFilters.push(this.defaultFilters[i]);
            }
        }

        for (let i = 0; i < this.filters.length; i += 1) {
            allFilters.push(this.filters[i]);
        }

        for (let i = 0; i < allFilters.length; i += 1) {
            filter += allFilters[i].toString(i);
        }

        return filter;
    }

    reset() {
        this.filters = [];
        if (this.capturedFilter.length > 0) {
            for (let i = 0; i < this.capturedFilter.length; i += 1) {
                this.filters.push(this.capturedFilter[i]);
            }
        }
    }

    fullReset(): void {
        this.filters = [];
        this.capturedFilter = [];
    }

    loadFromJson(filterSettings: FilterSettings): void {
        let filter: FilterObj;

        for (let i = 0; i < filterSettings.filters.length; i += 1) {
            filter = filterSettings.filters[i];
            const fO: FilterObj = new FilterObj(this.loadFilterObj(filter.filterObj), filter.logicalOperator);
            this.filters.push(fO);
        }

        for (let i = 0; i < filterSettings.defaultFilters.length; i += 1) {
            filter = filterSettings.defaultFilters[i];
            this.defaultFilters.push(new FilterObj(this.loadFilterObj(filter.filterObj), filter.logicalOperator));
        }
    }

    isSet(): boolean {
        return this.filters.length > 0 || this.defaultFilters.length > 0;
    }

    private loadPrecedenceGroup(precedenceGroup: PrecedenceGroup): PrecedenceGroup {
        const group: PrecedenceGroup = new PrecedenceGroup();
        let currentClause: FilterObj;

        for (let j = 0; j < precedenceGroup.clauses.length; j += 1) {
            currentClause = precedenceGroup.clauses[j];
            group.clauses.push(new FilterObj(this.loadFilterObj(currentClause.filterObj), currentClause.logicalOperator));
        }

        return group;
    }

    private loadFilterObj(currentFilter: FilterClause | PrecedenceGroup): FilterClause | PrecedenceGroup {
        // isPrecedenceGroup?
        if ((currentFilter as PrecedenceGroup).clauses !== undefined) {
            return this.loadPrecedenceGroup(currentFilter as PrecedenceGroup);
        }

        const newFilterClause: FilterClause = new FilterClause();

        for (let key in currentFilter) {
            if (currentFilter.hasOwnProperty(key)) {
                (newFilterClause as any)[key] = (currentFilter as any)[key];
            }
        }

        return newFilterClause;
    }
}
