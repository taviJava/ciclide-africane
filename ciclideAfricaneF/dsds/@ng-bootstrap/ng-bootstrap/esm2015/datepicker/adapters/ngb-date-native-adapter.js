import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
import { isInteger } from '../../util/util';
/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
export class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date) {
        return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
            null;
    }
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFMUM7OztHQUdHO0FBRUgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGNBQW9CO0lBQzVEOztPQUVHO0lBQ0gsU0FBUyxDQUFDLElBQWlCO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBMEI7UUFDaEMsT0FBTyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUM7SUFDN0YsQ0FBQztJQUVTLGVBQWUsQ0FBQyxJQUFVO1FBQ2xDLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQztJQUNyRixDQUFDO0lBRVMsYUFBYSxDQUFDLElBQW1CO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBMUJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuXG4vKipcbiAqIFtgTmdiRGF0ZUFkYXB0ZXJgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZUFkYXB0ZXIpIGltcGxlbWVudGF0aW9uIHRoYXQgdXNlc1xuICogbmF0aXZlIGphdmFzY3JpcHQgZGF0ZXMgYXMgYSB1c2VyIGRhdGUgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlQWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPERhdGU+IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgbmF0aXZlIGBEYXRlYCB0byBhIGBOZ2JEYXRlU3RydWN0YC5cbiAgICovXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlIHwgbnVsbCk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsIHtcbiAgICByZXR1cm4gKGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihkYXRlLmdldFRpbWUoKSkpID8gdGhpcy5fZnJvbU5hdGl2ZURhdGUoZGF0ZSkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgYE5nYkRhdGVTdHJ1Y3RgIHRvIGEgbmF0aXZlIGBEYXRlYC5cbiAgICovXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkgPyB0aGlzLl90b05hdGl2ZURhdGUoZGF0ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZnJvbU5hdGl2ZURhdGUoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RvTmF0aXZlRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKTtcbiAgICAvLyBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgICBqc0RhdGUuc2V0RnVsbFllYXIoZGF0ZS55ZWFyKTtcbiAgICByZXR1cm4ganNEYXRlO1xuICB9XG59XG4iXX0=