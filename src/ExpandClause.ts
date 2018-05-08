import FilterClause from './FilterClause';
import PrecedenceGroup from './PrecedenceGroup';
import FilterObj from './FilterObj';
import OrderBySettings from './Settings/OrderBySettings';
import TopSettings from './Settings/TopSettings';
import SkipSettings from './Settings/SkipSettings';
import SelectSettings from './Settings/SelectSettings';
import ExpandSettings from './Settings/ExpandSettings';
import FilterSettings from './Settings/FilterSettings';

export class ExpandClause<ExpandType = any, ExpandOfType = any> {
    private _ExpandSettings?: ExpandSettings;
    get ExpandSettings(): ExpandSettings {
        if (!this._ExpandSettings) {
            this._ExpandSettings = new ExpandSettings();
        }
        return this._ExpandSettings!;
    }

    private _FilterSettings?: FilterSettings;
    get FilterSettings(): FilterSettings {
        if (!this._FilterSettings) {
            this._FilterSettings = new FilterSettings();
        }
        return this._FilterSettings!;
    }
    set FilterSettings(settings: FilterSettings) {
        this._FilterSettings = settings;
    }

    private _OrderBySettings?: OrderBySettings;
    get OrderBySettings(): OrderBySettings {
        if (!this._OrderBySettings) {
            this._OrderBySettings = new OrderBySettings();
        }
        return this._OrderBySettings!;
    }
    set OrderBySettings(settings: OrderBySettings) {
        this._OrderBySettings = settings;
    }

    private _SelectSettings?: SelectSettings;
    get SelectSettings(): SelectSettings {
        if (!this._SelectSettings) {
            this._SelectSettings = new SelectSettings();
        }
        return this._SelectSettings!;
    }
    set SelectSettings(settings: SelectSettings) {
        this._SelectSettings = settings;
    }

    private _SkipSettings?: SkipSettings;
    get SkipSettings(): SkipSettings {
        if (!this._SkipSettings) {
            this._SkipSettings = new SkipSettings();
        }
        return this._SkipSettings!;
    }
    set SkipSettings(settings: SkipSettings) {
        this._SkipSettings = settings;
    }

    private _TopSettings?: TopSettings;
    get TopSettings(): TopSettings {
        if (!this._TopSettings) {
            this._TopSettings = new TopSettings();
        }
        return this._TopSettings!;
    }
    set TopSettings(settings: TopSettings) {
        this._TopSettings = settings;
    }

    constructor(public property: keyof ExpandType) {}

    // order by
    setOrderByDefault(property: string, order?: string): ExpandClause<ExpandType, ExpandOfType> {
        this.OrderBySettings.defaultProperty = property;
        this.OrderBySettings.defaultOrder = order === undefined ? 'desc' : order;
        return this;
    }

    toggleOrderBy(property: string, callback?: Function): ExpandClause<ExpandType, ExpandOfType> {
        const useDesc = this.OrderBySettings.property === null || this.OrderBySettings.order === 'asc';
        (<any>this.orderBy(property))[useDesc ? 'desc' : 'asc']();

        if (callback && typeof callback === 'function') {
            (<any>callback).call(this);
        }

        return this;
    }

    orderBy(property: string): ExpandClause<ExpandType, ExpandOfType> {
        this.OrderBySettings.property = property;
        return this;
    }

    desc(): ExpandClause<ExpandType, ExpandOfType> {
        this.OrderBySettings.order = 'desc';
        return this;
    }

    asc(): ExpandClause<ExpandType, ExpandOfType> {
        this.OrderBySettings.order = 'asc';
        return this;
    }

    resetOrderBy(): ExpandClause<ExpandType, ExpandOfType> {
        this.OrderBySettings.reset();
        return this;
    }

    // top
    setTopDefault(top: number): ExpandClause<ExpandType, ExpandOfType> {
        this.TopSettings.defaultTop = top;
        return this;
    }

    top(top: number): ExpandClause<ExpandType, ExpandOfType> {
        this.TopSettings.top = top;
        return this;
    }

    resetTop(): ExpandClause<ExpandType, ExpandOfType> {
        this.TopSettings.reset();
        return this;
    }

    // skip
    setSkipDefault(skip: number): ExpandClause<ExpandType, ExpandOfType> {
        this.SkipSettings.defaultSkip = skip;
        return this;
    }

    skip(skip: number): ExpandClause<ExpandType, ExpandOfType> {
        this.SkipSettings.skip = skip;
        return this;
    }

    resetSkip(): ExpandClause<ExpandType, ExpandOfType> {
        this.SkipSettings.reset();
        return this;
    }

    // select
    setSelectDefault(select: (keyof ExpandOfType)[]): ExpandClause<ExpandType, ExpandOfType> {
        this.SelectSettings.defaultSelect = select;
        return this;
    }

    select(select: (keyof ExpandOfType)[]): ExpandClause<ExpandType, ExpandOfType> {
        this.SelectSettings.select = select;
        return this;
    }

    resetSelect(): ExpandClause<ExpandType, ExpandOfType> {
        this.SelectSettings.reset();
        return this;
    }

    // expand
    setExpandDefault<U>(expand: keyof ExpandOfType | ExpandClause<ExpandOfType, U> | (keyof ExpandOfType | ExpandClause<ExpandOfType, U>)[]): ExpandClause<ExpandType, ExpandOfType> {
        if (!Array.isArray(expand)) {
            expand = [expand];
        }

        this.ExpandSettings.defaultExpand = expand;
        return this;
    }

    expand<U>(expand: keyof ExpandOfType | ExpandClause<ExpandOfType, U> | (keyof ExpandOfType | ExpandClause<ExpandOfType, U>)[]): ExpandClause<ExpandType, ExpandOfType> {
        if (!Array.isArray(expand)) {
            expand = [expand];
        }

        this.ExpandSettings.expand = expand;
        return this;
    }

    resetExpand(): ExpandClause<ExpandType, ExpandOfType> {
        this.ExpandSettings.reset();
        return this;
    }

    // Filter
    filter(filterClause: FilterClause<ExpandOfType> | PrecedenceGroup<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.filters.push(new FilterObj<ExpandOfType>(filterClause));
        return this;
    }

    andFilter(filterClause: FilterClause<ExpandOfType> | PrecedenceGroup<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.filters.push(new FilterObj<ExpandOfType>(filterClause, 'and'));
        return this;
    }

    orFilter(filterClause: FilterClause<ExpandOfType> | PrecedenceGroup<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.filters.push(new FilterObj<ExpandOfType>(filterClause, 'or'));
        return this;
    }

    removeFilter(property: string): ExpandClause<ExpandType, ExpandOfType> {
        if (!this.FilterSettings.isSet()) {
            return this;
        }

        for (let i = 0; i < this.FilterSettings.filters.length; i += 1) {
            // isFilterClause
            if ((this.FilterSettings.filters[i].filterObj as FilterClause).property === property) {
                this.FilterSettings.filters.splice(i, 1);
            }
        }

        // TODO: remove PrecedenceGroups Filter

        return this;
    }

    captureFilter(): void {
        this.FilterSettings.capturedFilter = [];
        for (let i = 0; i < this.FilterSettings.filters.length; i += 1) {
            this.FilterSettings.capturedFilter.push(this.FilterSettings.filters[i]);
        }
    }

    resetFilter(): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.fullReset();
        return this;
    }

    resetToCapturedFilter(): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.reset();
        return this;
    }

    defaultFilter(filterClause: FilterClause<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.defaultFilters.push(new FilterObj<ExpandOfType>(filterClause));
        return this;
    }

    defaultAndFilter(filterClause: FilterClause<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.defaultFilters.push(new FilterObj<ExpandOfType>(filterClause, 'and'));
        return this;
    }

    defaultOrFilter(filterClause: FilterClause<ExpandOfType>): ExpandClause<ExpandType, ExpandOfType> {
        this.FilterSettings.defaultFilters.push(new FilterObj<ExpandOfType>(filterClause, 'or'));
        return this;
    }

    // Casts
    toString(): string {
        const url: string = this.property;
        const components: string[] = [];

        if (!!this._OrderBySettings && this.OrderBySettings.isSet()) {
            components.push(this.OrderBySettings.toString());
        }

        if (!!this._TopSettings && this.TopSettings.isSet()) {
            components.push(this.TopSettings.toString());
        }

        if (!!this._SkipSettings && this.SkipSettings.isSet()) {
            components.push(this.SkipSettings.toString());
        }

        if (!!this._SelectSettings && this.SelectSettings.isSet()) {
            components.push(this.SelectSettings.toString());
        }

        if (!!this._FilterSettings && this.FilterSettings.isSet()) {
            components.push(this.FilterSettings.toString());
        }

        if (!!this._ExpandSettings && this.ExpandSettings.isSet()) {
            components.push(this.ExpandSettings.toString());
        }

        return components.length > 0 ? `${url}(${components.join('; ')})` : url;
    }
}

export default ExpandClause;
