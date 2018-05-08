import FilterClause from './FilterClause';
import ExpandClause from './ExpandClause';
import PrecedenceGroup from './PrecedenceGroup';
import FilterObj from './FilterObj';
import OrderBySettings from './Settings/OrderBySettings';
import TopSettings from './Settings/TopSettings';
import SkipSettings from './Settings/SkipSettings';
import SelectSettings from './Settings/SelectSettings';
import ExpandSettings from './Settings/ExpandSettings';
import FormatSettings from './Settings/FormatSettings';
import InlineCountSettings from './Settings/InlineCountSettings';
import CountSettings from './Settings/CountSettings';
import FindSettings from './Settings/FindSettings';
import FilterSettings from './Settings/FilterSettings';
import FormatOptions from './Options/FormatOptions';
import InlineCountOptions from './Options/InlineCountOptions';

export { Concat } from './Concat';

export class Tso<CallForType = any, ReturnType = any> {
    private _ExpandSettings?: ExpandSettings;
    get ExpandSettings(): ExpandSettings {
        if (!this._ExpandSettings) {
            this._ExpandSettings = new ExpandSettings();
        }
        return this._ExpandSettings!;
    }
    set ExpandSettings(settings: ExpandSettings) {
        this._ExpandSettings = settings;
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

    private _InlineCountSettings?: InlineCountSettings;
    get InlineCountSettings(): InlineCountSettings {
        if (!this._InlineCountSettings) {
            this._InlineCountSettings = new InlineCountSettings();
        }
        return this._InlineCountSettings!;
    }
    set InlineCountSettings(settings: InlineCountSettings) {
        this._InlineCountSettings = settings;
    }

    private _FormatSettings?: FormatSettings;
    get FormatSettings(): FormatSettings {
        if (!this._FormatSettings) {
            this._FormatSettings = new FormatSettings();
        }
        return this._FormatSettings!;
    }
    set FormatSettings(settings: FormatSettings) {
        this._FormatSettings = settings;
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

    private _CountSettings?: CountSettings;
    get CountSettings(): CountSettings {
        if (!this._CountSettings) {
            this._CountSettings = new CountSettings();
        }
        return this._CountSettings!;
    }
    set CountSettings(settings: CountSettings) {
        this._CountSettings = settings;
    }

    private _FindSettings?: FindSettings;
    get FindSettings(): FindSettings {
        if (!this._FindSettings) {
            this._FindSettings = new FindSettings();
        }
        return this._FindSettings!;
    }
    set FindSettings(settings: FindSettings) {
        this._FindSettings = settings;
    }

    private _format?: FormatOptions<CallForType, ReturnType>;
    get format(): FormatOptions<CallForType, ReturnType> {
        if (!this._format) {
            this._format = {
                atom: () => {
                    this.FormatSettings.format = 'atom';
                    return this;
                },
                custom: (value: string) => {
                    this.FormatSettings.format = value;
                    return this;
                },
                xml: () => {
                    this.FormatSettings.format = 'xml';
                    return this;
                },
                json: () => {
                    this.FormatSettings.format = 'json';
                    return this;
                },
            };
        }
        return this._format!;
    }

    private _formatDefault?: FormatOptions<CallForType, ReturnType>;
    get formatDefault(): FormatOptions<CallForType, ReturnType> {
        if (!this._formatDefault) {
            this._formatDefault = {
                atom: () => {
                    this.FormatSettings.defaultFormat = 'atom';
                    return this;
                },
                custom: (value: string) => {
                    this.FormatSettings.defaultFormat = value;
                    return this;
                },
                xml: () => {
                    this.FormatSettings.defaultFormat = 'xml';
                    return this;
                },
                json: () => {
                    this.FormatSettings.defaultFormat = 'json';
                    return this;
                },
            };
        }
        return this._formatDefault!;
    }

    private _inlineCount?: InlineCountOptions<CallForType, ReturnType>;
    get inlineCount(): InlineCountOptions<CallForType, ReturnType> {
        if (!this._inlineCount) {
            this._inlineCount = {
                allPages: () => {
                    this.InlineCountSettings.inlineCount = 'allpages';
                    return this;
                },
                none: () => {
                    this.InlineCountSettings.inlineCount = 'none';
                    return this;
                },
            };
        }
        return this._inlineCount!;
    }

    private _inlineCountDefault?: InlineCountOptions<CallForType, ReturnType>;
    get inlineCountDefault(): InlineCountOptions<CallForType, ReturnType> {
        if (!this._inlineCountDefault) {
            this._inlineCountDefault = {
                allPages: () => {
                    this.InlineCountSettings.defaultInlineCount = 'allpages';
                    return this;
                },
                none: () => {
                    this.InlineCountSettings.defaultInlineCount = 'none';
                    return this;
                },
            };
        }
        return this._inlineCountDefault!;
    }

    currentHashRoute?: string;

    public callFunction: ((queryString: string) => ReturnType) | undefined;

    static literal(stringLiteral: { toString(): string }): string {
        return `'${stringLiteral.toString()}'`;
    }

    static datetime(datetime: string): string {
        return `datetime'${datetime}'`;
    }

    static guid(guid: string): string {
        return `guid'${guid}'`;
    }

    static v4guid(guid: string): string {
        return `v4guid${guid}`;
    }

    static decimal(decimal: number): string {
        return `${decimal}m`;
    }

    static double(double: number): string {
        return `${double}d`;
    }

    static single(single: number) {
        return `${single}f`;
    }

    // cast(type) or cast(expression,type)
    static cast(expression: string | null = null, type: string) {
        if (!!expression) {
            return `cast(${type})`;
        }

        return `cast(${expression},${type})`;
    }

    constructor(public baseUri: string, public encodeResult: boolean = false) {}

    updateHashRoute(hashRoute: string): void {
        this.currentHashRoute = hashRoute;
    }

    // find
    setFindDefault(property: number | string): Tso<CallForType, ReturnType> {
        this.FindSettings.defaultFind = property;
        return this;
    }

    find(property: number | string | null | undefined): Tso<CallForType, ReturnType> {
        this.FindSettings.find = property;
        return this;
    }

    resetFind(): Tso<CallForType, ReturnType> {
        this.FindSettings.reset();
        return this;
    }

    // order by
    setOrderByDefault(property: string, order?: string): Tso<CallForType, ReturnType> {
        this.OrderBySettings.defaultProperty = property;
        this.OrderBySettings.defaultOrder = order === undefined ? 'desc' : order;
        return this;
    }

    toggleOrderBy(property: string, callback?: Function): Tso<CallForType, ReturnType> {
        const useDesc = this.OrderBySettings.property === null || this.OrderBySettings.order === 'asc';
        (<any>this.orderBy(property))[useDesc ? 'desc' : 'asc']();

        if (callback && typeof callback === 'function') {
            (<any>callback).call(this);
        }

        return this;
    }

    orderBy(property: string | null | undefined): Tso<CallForType, ReturnType> {
        this.OrderBySettings.property = property;
        return this;
    }

    desc(): Tso<CallForType, ReturnType> {
        this.OrderBySettings.order = 'desc';
        return this;
    }

    asc(): Tso<CallForType, ReturnType> {
        this.OrderBySettings.order = 'asc';
        return this;
    }

    resetOrderBy(): Tso<CallForType, ReturnType> {
        this.OrderBySettings.reset();
        return this;
    }

    // top
    setTopDefault(top: number): Tso<CallForType, ReturnType> {
        this.TopSettings.defaultTop = top;
        return this;
    }

    top(top: number | null | undefined): Tso<CallForType, ReturnType> {
        this.TopSettings.top = top;
        return this;
    }

    resetTop(): Tso<CallForType, ReturnType> {
        this.TopSettings.reset();
        return this;
    }

    // skip
    setSkipDefault(skip: number): Tso<CallForType, ReturnType> {
        this.SkipSettings.defaultSkip = skip;
        return this;
    }

    skip(skip: number | null | undefined): Tso<CallForType, ReturnType> {
        this.SkipSettings.skip = skip;
        return this;
    }

    resetSkip(): Tso<CallForType, ReturnType> {
        this.SkipSettings.reset();
        return this;
    }

    // select
    setSelectDefault(select: (keyof CallForType)[]): Tso<CallForType, ReturnType> {
        this.SelectSettings.defaultSelect = select;
        return this;
    }

    select(select: (keyof CallForType)[] | null | undefined): Tso<CallForType, ReturnType> {
        this.SelectSettings.select = select;
        return this;
    }

    resetSelect(): Tso<CallForType, ReturnType> {
        this.SelectSettings.reset();
        return this;
    }

    // expand
    setExpandDefault<U = any>(expand: keyof CallForType | (keyof CallForType)[]): Tso<CallForType, ReturnType> {
        if (!!expand) {
            if (!Array.isArray(expand)) {
                expand = [expand];
            }
            this.ExpandSettings.defaultExpand = expand;
        } else {
            this.ExpandSettings.defaultExpand = null;
        }
        return this;
    }

    expand<U = any>(expand: keyof CallForType | ExpandClause<CallForType, U> | (keyof CallForType | ExpandClause<CallForType, U>)[] | null | undefined): Tso<CallForType, ReturnType> {
        if (!!expand) {
            if (!Array.isArray(expand)) {
                expand = [expand];
            }
            this.ExpandSettings.expand = expand;
        } else {
            this.ExpandSettings.expand = null;
        }
        return this;
    }

    resetExpand(): Tso<CallForType, ReturnType> {
        this.ExpandSettings.reset();
        return this;
    }

    // format

    resetFormat(): void {
        this.FormatSettings.reset();
    }

    // Inline count

    resetInlineCount(): Tso<CallForType, ReturnType> {
        this.InlineCountSettings.reset();
        return this;
    }

    // count
    setCountDefault(): Tso<CallForType, ReturnType> {
        this.CountSettings.defaultCount = 'true';
        return this;
    }

    count(): Tso<CallForType, ReturnType> {
        this.CountSettings.count = 'true';
        return this;
    }

    resetCount(): Tso<CallForType, ReturnType> {
        this.CountSettings.reset();
        return this;
    }

    // Filter
    filter(filterClause: FilterClause<CallForType> | PrecedenceGroup<CallForType> | null | undefined): Tso<CallForType, ReturnType> {
        if (filterClause !== null && typeof filterClause !== 'undefined') {
            this.FilterSettings.filters.push(new FilterObj(filterClause));
        }
        return this;
    }

    andFilter(filterClause: FilterClause<CallForType> | PrecedenceGroup<CallForType> | null | undefined): Tso<CallForType, ReturnType> {
        if (filterClause !== null && typeof filterClause !== 'undefined') {
            this.FilterSettings.filters.push(new FilterObj(filterClause, 'and'));
        }
        return this;
    }

    orFilter(filterClause: FilterClause<CallForType> | PrecedenceGroup<CallForType> | null | undefined): Tso<CallForType, ReturnType> {
        if (filterClause !== null && typeof filterClause !== 'undefined') {
            this.FilterSettings.filters.push(new FilterObj(filterClause, 'or'));
        }
        return this;
    }

    removeFilter(property: string): Tso<CallForType, ReturnType> {
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

    resetFilter(): Tso<CallForType, ReturnType> {
        this.FilterSettings.fullReset();
        return this;
    }

    resetToCapturedFilter(): Tso<CallForType, ReturnType> {
        this.FilterSettings.reset();
        return this;
    }

    defaultFilter(filterClause: FilterClause<CallForType>): Tso<CallForType, ReturnType> {
        this.FilterSettings.defaultFilters.push(new FilterObj(filterClause));
        return this;
    }

    defaultAndFilter(filterClause: FilterClause<CallForType>): Tso<CallForType, ReturnType> {
        this.FilterSettings.defaultFilters.push(new FilterObj(filterClause, 'and'));
        return this;
    }

    defaultOrFilter(filterClause: FilterClause<CallForType>): Tso<CallForType, ReturnType> {
        this.FilterSettings.defaultFilters.push(new FilterObj(filterClause, 'or'));
        return this;
    }

    // Casts
    toString(): string {
        let url: string = this.baseUri;
        const components: string[] = [];

        if (!!this._FindSettings && this.FindSettings.isSet()) {
            url += this.FindSettings.toString();
        }

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

        if (!!this._FormatSettings && this.FormatSettings.isSet()) {
            components.push(this.FormatSettings.toString());
        }

        if (!!this._InlineCountSettings && this.InlineCountSettings.isSet()) {
            components.push(this.InlineCountSettings.toString());
        }

        if (!!this._CountSettings && this.CountSettings.isSet()) {
            components.push(this.CountSettings.toString());
        }

        let queryUrl = components.length > 0 ? url + '?' + components.join('&') : url;

        if (this.encodeResult) {
            queryUrl = encodeURI(queryUrl);
        }

        return queryUrl;
    }

    toJson(): string {
        const jsonObj: any = {};

        jsonObj.baseUri = this.baseUri;
        jsonObj.currentHashRoute = this.currentHashRoute;

        jsonObj.OrderBySettings = null;
        jsonObj.TopSettings = null;
        jsonObj.SkipSettings = null;
        jsonObj.SelectSettings = null;
        jsonObj.ExpandSettings = null;
        jsonObj.FormatSettings = null;
        jsonObj.InlineCountSettings = null;
        jsonObj.FilterSettings = null;
        jsonObj.FindSettings = null;

        jsonObj.defaults = (<any>this).defaults;

        if (!!this._FindSettings && this.FindSettings.isSet()) {
            jsonObj.FindSettings = this.FindSettings;
        }

        if (!!this._OrderBySettings && this.OrderBySettings.isSet()) {
            jsonObj.OrderBySettings = this.OrderBySettings;
        }

        if (!!this._TopSettings && this.TopSettings.isSet()) {
            jsonObj.TopSettings = this.TopSettings;
        }

        if (!!this._SkipSettings && this.SkipSettings.isSet()) {
            jsonObj.SkipSettings = this.SkipSettings;
        }

        if (!!this._SelectSettings && this.SelectSettings.isSet()) {
            jsonObj.SelectSettings = this.SelectSettings;
        }

        if (!!this._ExpandSettings && this.ExpandSettings.isSet()) {
            jsonObj.ExpandSettings = this.ExpandSettings;
        }

        if (!!this._FormatSettings && this.FormatSettings.isSet()) {
            jsonObj.FormatSettings = this.FormatSettings;
        }

        if (!!this._InlineCountSettings && this.InlineCountSettings.isSet()) {
            jsonObj.InlineCountSettings = this.InlineCountSettings;
        }

        if (!!this._FilterSettings && this.FilterSettings.isSet()) {
            jsonObj.FilterSettings = this.FilterSettings;
        }

        if (!!this._CountSettings && this.CountSettings.isSet()) {
            jsonObj.CountSettings = this.CountSettings;
        }

        return JSON.stringify(jsonObj);
    }

    public setCallFunction(callFunction: (queryString: string) => ReturnType) {
        this.callFunction = callFunction;
        return this;
    }

    public call(callFunction?: (queryString: string) => ReturnType): ReturnType {
        if (!!callFunction) {
            this.callFunction = callFunction;
        }

        if (!this.callFunction) {
            throw new Error('this.callFunction is undefined');
        }

        return this.callFunction(this.toString());
    }
}

export default Tso;
