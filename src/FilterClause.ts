import { Helpers } from './Helpers';
import { Concat } from './Concat';
import { IFilterClause } from './IFilterClause';

export class FilterClause<FilterType = any, FilterOfType = any> implements IFilterClause<FilterType, FilterOfType> {

    property: keyof FilterType | null;
    components: string[];
    isClauseEmpty: boolean;
    propertyIncluded: boolean;
    usingNot: boolean;
    value: string | number | boolean | null;
    funcReturnType: string | number | boolean | null;
    transformFunc: Function | null;

    constructor(property: keyof FilterType | null = null) {
        this.property = property;
        this.components = [];
        this.isClauseEmpty = false;
        this.propertyIncluded = false;
        this.usingNot = false;
        this.value = null;
        this.funcReturnType = null;
        this.transformFunc = null;
    }

    toString(): string {
        let strComps: string[] = [];
        let filterStr: string;

        if (!this.propertyIncluded) {
            strComps.push(this.property);
        }

        for (let i = 0; i < this.components.length; i++) {
            strComps.push(this.components[i]);
        }
        filterStr = strComps.join(' ');

        if (!this.usingNot) {
            return filterStr;
        }

        return typeof this.funcReturnType === 'boolean' ? 'not ' + filterStr : 'not (' + filterStr + ')';
    }

    isEmpty(): Boolean {
        return this.isClauseEmpty || (this.propertyIncluded && this.usingNot);
    }

    // Logical operators
    eq(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'eq', this) as any;
    }

    ne(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'ne', this) as any;
    }

    gt(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'gt', this) as any;
    }

    ge(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'ge', this) as any;
    }

    lt(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'lt', this) as any;
    }

    le(value: string | number | boolean): FilterClause<FilterType, FilterOfType> {
        return Helpers.addLogicalOperator(value, 'le', this) as any;
    }

    not(): FilterClause<FilterType, FilterOfType> {
        this.usingNot = true;
        return this;
    }

    // Arithmetic methods
    add(amount: number): FilterClause<FilterType, FilterOfType> {
        return Helpers.addArithmeticOperator(amount, 'add', this) as any;
    }

    sub(amount: number): FilterClause<FilterType, FilterOfType> {
        return Helpers.addArithmeticOperator(amount, 'sub', this) as any;
    }

    mul(amount: number): FilterClause<FilterType, FilterOfType> {
        return Helpers.addArithmeticOperator(amount, 'mul', this) as any;
    }

    div(amount: number): FilterClause<FilterType, FilterOfType> {
        return Helpers.addArithmeticOperator(amount, 'div', this) as any;
    }

    mod(amount: number): FilterClause<FilterType, FilterOfType> {
        return Helpers.addArithmeticOperator(amount, 'mod', this) as any;
    }

    // String functions
    substringof(value: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Boolean();

        let property: string | undefined;
        if (this.transformFunc !== null) {
            property = this.components[this.components.length - 1];
            this.components.splice(this.components.length - 1, 1);
        }

        if (!!property) {
          this.components.push('substringof(\'' + value + '\',' + property + ')');
        } else {
          this.components.push('substringof(\'' + value + '\',' + this.property + ')');
        }

        return this;
    }

    substring(position: number, length?: number): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        let comps = [this.property, position];
        if (length !== undefined) {
            comps.push(length);
        }

        this.components.push('substring(' + comps.join(',') + ')');

        return this;
    }

    toLower(): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        this.transformFunc = this.toLower;
        this.components.push('tolower(' + this.property + ')');

        return this;
    }

    toUpper(): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        this.transformFunc = this.toUpper;
        this.components.push('toupper(' + this.property + ')');

        return this;
    }

    trim(): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        this.transformFunc = this.trim;
        this.components.push('trim(' + this.property + ')');

        return this;
    }

    endswith(value: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Boolean();

        this.components.push('endswith(' + this.property + ',\'' + value + '\')');

        return this;
    }

    startswith(value: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Boolean();

        this.components.push('startswith(' + this.property + ',\'' + value + '\')');

        return this;
    }

    length(): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Number();

        this.components.push('length(' + this.property + ')');

        return this;
    }

    indexof(value: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Number();

        this.components.push('indexof(' + this.property + ',\'' + value + '\')');

        return this;
    }

    replace(find: string, replace: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        this.components.push('replace(' + this.property + ',\'' + find + '\',\'' + replace + '\')');

        return this;
    }

    // Concat
    Concat(concat: Concat): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = String();

        this.components.push(concat.toString());

        return this;
    }

    // Date functions
    day(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'day') as any;
    }

    hour(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'hour') as any;
    }

    minute(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'minute') as any;
    }

    month(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'month') as any;
    }

    second(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'second') as any;
    }

    year(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'year') as any;
    }

    // Math functions
    round(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'round') as any;
    }

    floor(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'floor') as any;
    }

    ceiling(): FilterClause<FilterType, FilterOfType> {
        return Helpers.addMethodWrapper(this, 'ceiling') as any;
    }

    // $filter=isof(expression, type) of $filter=isof(type)
    isOf(type: string): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = false;
        this.funcReturnType = Boolean();

        if (this.property !== null) {
            this.components.push('isof(' + this.property + ',' + type + ')');
        } else {
            this.components.push('isof(' + type + ')');
        }

        return this;
    }

    any<U>(filter: FilterClause<FilterOfType, U>): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Boolean();

        this.components.push(`${this.property}/any(d:d/${filter.toString()})`);

        return this;
    }

    all<U>(filter: FilterClause<FilterOfType, U>): FilterClause<FilterType, FilterOfType> {
        this.propertyIncluded = true;
        this.funcReturnType = Boolean();

        this.components.push(`${this.property}/all(d:d/${filter.toString()})`);

        return this;
    }

}
