import { FilterClause } from './FilterClause';
import { ExpandClause } from './ExpandClause';
import { PrecedenceGroup } from './PrecedenceGroup';
import { FilterObj } from './FilterObj';
import { OrderBySettings } from './Settings/OrderBySettings';
import { TopSettings } from './Settings/TopSettings';
import { SkipSettings } from './Settings/SkipSettings';
import { SelectSettings } from './Settings/SelectSettings';
import { ExpandSettings } from './Settings/ExpandSettings';
import { FormatSettings } from './Settings/FormatSettings';
import { InlineCountSettings } from './Settings/InlineCountSettings';
import { CountSettings } from './Settings/CountSettings';
import { FindSettings } from './Settings/FindSettings';
import { FilterSettings } from './Settings/FilterSettings';
import { IFormatOptions } from './Options/IFormatOptions';
import { IInlineCountOptions } from './Options/IInlineCountOptions';

export { Concat } from './Concat';

export class Tso<CallForType = any, ReturnType = any> {
    baseUri: string;
    ExpandSettings: ExpandSettings;
    FilterSettings: FilterSettings;
    FormatSettings: FormatSettings;
    InlineCountSettings: InlineCountSettings;
    OrderBySettings: OrderBySettings;
    SelectSettings: SelectSettings;
    SkipSettings: SkipSettings;
    TopSettings: TopSettings;
    CountSettings: CountSettings;
    FindSettings: FindSettings;
    format: IFormatOptions<CallForType, ReturnType>;
    formatDefault: IFormatOptions<CallForType, ReturnType>;
    inlineCount: IInlineCountOptions<CallForType, ReturnType>;
    inlineCountDefault: IInlineCountOptions<CallForType, ReturnType>;

    currentHashRoute: string;

    static literal(stringLiteral: { toString(): string; }): string {
        return '\'' + stringLiteral.toString() + '\'';
    }

    static datetime(datetime: string): string {
        return 'datetime\'' + datetime + '\'';
    }

    static guid(guid: string): string {
        return 'guid\'' + guid + '\'';
    }

    static v4guid(guid: string): string {
        return 'v4guid' + guid;
    }

    static decimal(decimal: number): string {
        return decimal + 'm';
    }

    static double(double: number): string {
        return double + 'd';
    }

    static single(single: number) {
        return single + 'f';
    }

    //cast(type) or cast(expression,type)
    static cast(expression: string | null = null, type: string) {
        if (!!expression) {
            return 'cast(' + type + ')';
        } else {
            return 'cast(' + expression + ',' + type + ')';
        }
    }

    constructor(baseUri: string) {
        this.baseUri = baseUri;
        this.ExpandSettings = new ExpandSettings();
        this.FilterSettings = new FilterSettings();
        this.FormatSettings = new FormatSettings();
        this.InlineCountSettings = new InlineCountSettings();
        this.OrderBySettings = new OrderBySettings();
        this.SelectSettings = new SelectSettings();
        this.SkipSettings = new SkipSettings();
        this.TopSettings = new TopSettings();
        this.CountSettings = new CountSettings();
        this.FindSettings = new FindSettings();

        let contextThis = this;

        this.format = {
            atom: function () {
                contextThis.FormatSettings.format = 'atom';
                return contextThis;
            },
            custom: function (value: string) {
                contextThis.FormatSettings.format = value;
                return contextThis;
            },
            xml: function () {
                contextThis.FormatSettings.format = 'xml';
                return contextThis;
            },
            json: function () {
                contextThis.FormatSettings.format = 'json';
                return contextThis;
            }
        };
        this.formatDefault = {
            atom: function () {
                contextThis.FormatSettings.defaultFormat = 'atom';
                return contextThis;
            },
            custom: function (value: string) {
                contextThis.FormatSettings.defaultFormat = value;
                return contextThis;
            },
            xml: function () {
                contextThis.FormatSettings.defaultFormat = 'xml';
                return contextThis;
            },
            json: function () {
                contextThis.FormatSettings.defaultFormat = 'json';
                return contextThis;
            }
        };

        this.inlineCount = {
            allPages: function () {
                contextThis.InlineCountSettings.inlineCount = 'allpages';
                return contextThis;
            },
            none: function () {
                contextThis.InlineCountSettings.inlineCount = 'none';
                return contextThis;
            }
        };

        this.inlineCountDefault = {
            allPages: function () {
                contextThis.InlineCountSettings.defaultInlineCount = 'allpages';
                return contextThis;
            },
            none: function () {
                contextThis.InlineCountSettings.defaultInlineCount = 'none';
                return contextThis;
            }
        };
    }

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
        let useDesc = this.OrderBySettings.property === null || this.OrderBySettings.order === 'asc';
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
            this.ExpandSettings.DefaultExpand = expand;
        }    
        return this;
    }

    expand<U = any>(expand: keyof CallForType | ExpandClause<CallForType, U> | (keyof CallForType | ExpandClause<CallForType, U>)[] | null | undefined): Tso<CallForType, ReturnType> {
        if (!!expand) {
            if (!Array.isArray(expand)) {
                expand = [expand];
            }
            this.ExpandSettings.Expand = expand;
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
            this.FilterSettings.Filters.push(new FilterObj(filterClause));
        }
        return this;
    }

    andFilter(filterClause: FilterClause<CallForType> | PrecedenceGroup<CallForType> | null | undefined): Tso<CallForType, ReturnType> {
        if (filterClause !== null && typeof filterClause !== 'undefined') {
            this.FilterSettings.Filters.push(new FilterObj(filterClause, 'and'));
        }
        return this;
    }

    orFilter(filterClause: FilterClause<CallForType> | PrecedenceGroup<CallForType> | null | undefined): Tso<CallForType, ReturnType> {
        if (filterClause !== null && typeof filterClause !== 'undefined') {
            this.FilterSettings.Filters.push(new FilterObj(filterClause, 'or'));
        }
        return this;
    }

    removeFilter(property: string): Tso<CallForType, ReturnType> {
        if (!this.FilterSettings.isSet()) {
            return this;
        }

        for (let i = 0; i < this.FilterSettings.Filters.length; i++) {
            //isFilterClause
            if ((this.FilterSettings.Filters[i].filterObj as FilterClause).property === property) {
                this.FilterSettings.Filters.splice(i, 1);
            }
        }

        //TODO: remove PrecedenceGroups Filter

        return this;
    }

    captureFilter(): void {
        this.FilterSettings.CapturedFilter = [];
        for (let i = 0; i < this.FilterSettings.Filters.length; i++) {
            this.FilterSettings.CapturedFilter.push(this.FilterSettings.Filters[i]);
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
        this.FilterSettings.DefaultFilters.push(new FilterObj(filterClause));
        return this;
    }

    defaultAndFilter(filterClause: FilterClause<CallForType>): Tso<CallForType, ReturnType> {
        this.FilterSettings.DefaultFilters.push(new FilterObj(filterClause, 'and'));
        return this;
    }

    defaultOrFilter(filterClause: FilterClause<CallForType>): Tso<CallForType, ReturnType> {
        this.FilterSettings.DefaultFilters.push(new FilterObj(filterClause, 'or'));
        return this;
    }

    // Casts
    toString(): string {
        let url: string, components: string[];

        url = this.baseUri;
        components = [];

        if (this.FindSettings.isSet()) {
            url += this.FindSettings.toString();
        }

        if (this.OrderBySettings.isSet()) {
            components.push(this.OrderBySettings.toString());
        }

        if (this.TopSettings.isSet()) {
            components.push(this.TopSettings.toString());
        }

        if (this.SkipSettings.isSet()) {
            components.push(this.SkipSettings.toString());
        }

        if (this.SelectSettings.isSet()) {
            components.push(this.SelectSettings.toString());
        }

        if (this.FilterSettings.isSet()) {
            components.push(this.FilterSettings.toString());
        }

        if (this.ExpandSettings.isSet()) {
            components.push(this.ExpandSettings.toString());
        }

        if (this.FormatSettings.isSet()) {
            components.push(this.FormatSettings.toString());
        }

        if (this.InlineCountSettings.isSet()) {
            components.push(this.InlineCountSettings.toString());
        }

        if (this.CountSettings.isSet()) {
            components.push(this.CountSettings.toString());
        }

        return components.length > 0 ? url + '?' + components.join('&') : url;
    }

    toJson(): string {
        let jsonObj: any = {};

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

        if (this.FindSettings.isSet()) {
            jsonObj.FindSettings = this.FindSettings;
        }

        if (this.OrderBySettings.isSet()) {
            jsonObj.OrderBySettings = this.OrderBySettings;
        }

        if (this.TopSettings.isSet()) {
            jsonObj.TopSettings = this.TopSettings;
        }

        if (this.SkipSettings.isSet()) {
            jsonObj.SkipSettings = this.SkipSettings;
        }

        if (this.SelectSettings.isSet()) {
            jsonObj.SelectSettings = this.SelectSettings;
        }

        if (this.ExpandSettings.isSet()) {
            jsonObj.ExpandSettings = this.ExpandSettings;
        }

        if (this.FormatSettings.isSet()) {
            jsonObj.FormatSettings = this.FormatSettings;
        }

        if (this.InlineCountSettings.isSet()) {
            jsonObj.InlineCountSettings = this.InlineCountSettings;
        }

        if (this.FilterSettings.isSet()) {
            jsonObj.FilterSettings = this.FilterSettings;
        }

        if (this.CountSettings.isSet()) {
            jsonObj.CountSettings = this.CountSettings;
        }

        return JSON.stringify(jsonObj);
    }

    public callFunction: ((queryString: string) => ReturnType) | undefined;
    public setCallFunction(callFunction: (queryString: string) => ReturnType): Tso<CallForType, ReturnType> {
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
