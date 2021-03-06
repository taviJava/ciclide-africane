import { NgbDateStruct } from '../ngb-date-struct';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
import * as ɵngcc0 from '@angular/core';
export declare class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbDateNativeUTCAdapter, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NgbDateNativeUTCAdapter>;
}

//# sourceMappingURL=ngb-date-native-utc-adapter.d.ts.map