import { NgbDate } from '../ngb-date';
import { NgbPeriod, NgbCalendar } from '../ngb-calendar';
import * as ɵngcc0 from '@angular/core';
export declare abstract class NgbCalendarHijri extends NgbCalendar {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    abstract getDaysPerMonth(month: number, year: number): number;
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     */
    abstract fromGregorian(gDate: Date): NgbDate;
    /**
     * Converts the current Hijri date to Gregorian.
     */
    abstract toGregorian(hDate: NgbDate): Date;
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    private _setDay;
    private _setMonth;
    private _setYear;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbCalendarHijri, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NgbCalendarHijri>;
}

//# sourceMappingURL=ngb-calendar-hijri.d.ts.map