import { Tso } from '../Tso';

export interface IInlineCountOptions<CallForType, ReturnType = any> {
    allPages(): Tso<CallForType, ReturnType>;
    none(): Tso<CallForType, ReturnType>;
}
