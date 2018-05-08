import FilterClause from './FilterClauseInterface';

export class Helpers {
    public static formatValue(value: string | number | boolean): string | number | boolean {
        if (typeof value === 'string') {
            if (value.length > 8 && value.substring(0, 8) === 'datetime') {
                return value;
            }

            if (value.length > 4 && (value.substring(0, 4) === 'guid' || value.substring(0, 4) === 'cast')) {
                return value;
            }

            if (value.length > 1) {
                const numberSuffixes: string[] = ['m', 'f', 'd'];
                for (let i = 0; i < numberSuffixes.length; i += 1) {
                    const suffix = numberSuffixes[i];
                    if (value.indexOf(suffix, value.length - suffix.length) !== -1) {
                        const numberValue = value.substring(0, value.length - 1);
                        if (!isNaN(<any>numberValue)) {
                            return value;
                        }
                    }
                }
            }

            if (value.substr(0, 1) === `'` && value.substr(value.length - 1, value.length) === `'`) {
                return value;
            }

            return `'${value}'`;
        }

        return value;
    }

    public static addLogicalOperator(value: string | number | boolean, operator: string, filterClause: FilterClause): FilterClause {
        filterClause.value = value;
        filterClause.isClauseEmpty = false;

        filterClause.components.push(`${operator} ${this.formatValue(value)}`);

        return filterClause;
    }

    public static addLogicalOperatorForProperty(propertyName: string, operator: string, filterClause: FilterClause): FilterClause {
        filterClause.value = propertyName;
        filterClause.isClauseEmpty = false;

        filterClause.components.push(`${operator} ${propertyName}`);

        return filterClause;
    }

    public static addArithmeticOperator(amount: number, operator: string, filterClause: FilterClause): FilterClause {
        filterClause.components.push(`${operator} ${amount}`);

        return filterClause;
    }

    public static addMethodWrapper(filterClause: FilterClause, func: string): FilterClause {
        filterClause.propertyIncluded = true;
        filterClause.funcReturnType = Number();
        filterClause.components.push(`${func}(${filterClause.property})`);

        return filterClause;
    }
}

export default Helpers;
