import { NgbDateStruct } from './ngb-date-struct';
import * as ɵngcc0 from '@angular/core';
export declare function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY(): NgbDateISOParserFormatter;
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
export declare abstract class NgbDateParserFormatter {
    /**
     * Parses the given `string` to an `NgbDateStruct`.
     *
     * Implementations should try their best to provide a result, even
     * partial. They must return `null` if the value can't be parsed.
     */
    abstract parse(value: string): NgbDateStruct | null;
    /**
     * Formats the given `NgbDateStruct` to a `string`.
     *
     * Implementations should return an empty string if the given date is `null`,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     */
    abstract format(date: NgbDateStruct | null): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbDateParserFormatter, never>;
}
export declare class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct | null;
    format(date: NgbDateStruct | null): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbDateISOParserFormatter, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NgbDateISOParserFormatter>;
}

//# sourceMappingURL=ngb-date-parser-formatter.d.ts.map