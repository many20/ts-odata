import { Tso } from '../Tso';

export interface IFormatOptions<CallForType, ReturnType = any> {
    atom(): Tso<CallForType, ReturnType>;
    custom(value: string): Tso<CallForType, ReturnType>;
    json(): Tso<CallForType, ReturnType>;
    xml(): Tso<CallForType, ReturnType>;
}
