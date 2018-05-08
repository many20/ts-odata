import Tso from '../Tso';

export interface FormatOptions<CallForType, ReturnType = any> {
    atom(): Tso<CallForType, ReturnType>;
    custom(value: string): Tso<CallForType, ReturnType>;
    json(): Tso<CallForType, ReturnType>;
    xml(): Tso<CallForType, ReturnType>;
}

export default FormatOptions;
