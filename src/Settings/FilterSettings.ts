import { FilterClause } from '../FilterClause';
import { PrecedenceGroup } from '../PrecedenceGroup';
import { FilterObj } from '../FilterObj';

export class FilterSettings {

    Filters: FilterObj[];
    DefaultFilters: FilterObj[];
    CapturedFilter: FilterObj[];

    constructor() {
        this.Filters = [];
        this.DefaultFilters = [];
        this.CapturedFilter = [];
    }

    toString() {
        let allFilters: FilterObj[] = [];
        let filter: string= '$filter=';

        if (this.DefaultFilters.length > 0) {
            for (let i = 0; i < this.DefaultFilters.length; i++) {
                allFilters.push(this.DefaultFilters[i]);
            }
        }

        for (let i = 0; i < this.Filters.length; i++) {
            allFilters.push(this.Filters[i]);
        }

        for (let i = 0; i < allFilters.length; i++) {
            filter += allFilters[i].toString(i);
        }

        return filter;
    }

    reset() {
        this.Filters = [];
        if (this.CapturedFilter.length > 0) {
            for (let i = 0; i < this.CapturedFilter.length; i++) {
                this.Filters.push(this.CapturedFilter[i]);
            }
        }
    }

    fullReset(): void {
        this.Filters = [];
        this.CapturedFilter = [];
    }

    loadFromJson(filterSettings: FilterSettings): void {
        let filter: FilterObj;

        for (let i = 0; i < filterSettings.Filters.length; i++) {
            filter = filterSettings.Filters[i];
            let fO: FilterObj = new FilterObj(this.loadFilterObj(filter.filterObj), filter.logicalOperator);
            this.Filters.push(fO);
        }

        for (let i = 0; i < filterSettings.DefaultFilters.length; i++) {
            filter = filterSettings.DefaultFilters[i];
            this.DefaultFilters.push(new FilterObj(this.loadFilterObj(filter.filterObj), filter.logicalOperator));
        }
    }

    isSet(): boolean {
        return this.Filters.length > 0 || this.DefaultFilters.length > 0;
    }


    private loadPrecedenceGroup(precedenceGroup: PrecedenceGroup): any {
        let group: PrecedenceGroup; 
        let currentClause: FilterObj;

        group = new PrecedenceGroup();

        for (let j = 0; j < precedenceGroup.clauses.length; j++) {
            currentClause = precedenceGroup.clauses[j];
            group.clauses.push(new FilterObj(this.loadFilterObj(currentClause.filterObj), currentClause.logicalOperator));
        }

        return group;
    }

    private loadFilterObj(currentFilter: FilterClause | PrecedenceGroup): any {
        //isPrecedenceGroup?
        if ((currentFilter as PrecedenceGroup).clauses !== undefined) {
            return this.loadPrecedenceGroup(currentFilter as PrecedenceGroup);
        }

        let newFilterClause: FilterClause = new FilterClause();

        for (let key in currentFilter) {
            if (currentFilter.hasOwnProperty(key)) {
                (newFilterClause as any)[key] = (currentFilter as any)[key];
            }
        }

        return newFilterClause;
    }
}
