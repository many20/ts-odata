import { IFilterClause } from './IFilterClause';

export class Helpers {

    public static formatValue (value: string | number | boolean): string | number | boolean {

        if (typeof value === 'string') {

            if (value.length > 8 && value.substring(0, 8) === 'datetime') {
                return value;
            }

            if (value.length > 4 && (value.substring(0, 4) === 'guid' || value.substring(0, 4) === 'cast')) {
                return value;
            }

            if (value.length > 4 && value.substring(0, 6) === 'v4guid') {
                return value.slice(6, value.length);
            }

            let numberSuffixes: string[] = ['m', 'f', 'd'];
            for (let i = 0; i < numberSuffixes.length; i++) {
                let suffix = numberSuffixes[i];
                if (value.indexOf(suffix, value.length - suffix.length) !== -1) {
                    let numberValue = value.substring(0, (<any>value).length - 1);
                    if (!isNaN(<any>numberValue)) {
                        return value;
                    }
                }
            }

            return '\'' + value + '\'';
        }

        return value;
    }

    public static addLogicalOperator (value: string | number | boolean, operator: string, filterClause: IFilterClause): IFilterClause {
        filterClause.value = value;
        filterClause.isClauseEmpty = false;

        filterClause.components.push(operator + ' ' + this.formatValue(value));

        return filterClause;
    }

    public static addArithmeticOperator (amount: number, operator: string, filterClause: IFilterClause): IFilterClause {
        filterClause.components.push(operator + ' ' + amount);

        return filterClause;
    }

    public static addMethodWrapper (filterClause: IFilterClause, func: string): IFilterClause {
        filterClause.propertyIncluded = true;
        filterClause.funcReturnType = Number();
        filterClause.components.push(func + '(' + filterClause.property + ')');

        return filterClause;
    }

}
