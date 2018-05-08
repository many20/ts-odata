import Tso from '../Tso';

export interface InlineCountOptions<CallForType, ReturnType = any> {
    allPages(): Tso<CallForType, ReturnType>;
    none(): Tso<CallForType, ReturnType>;
}

export default InlineCountOptions;
