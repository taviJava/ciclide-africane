import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { regExpEscape, toString } from '../util/util';
/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
export class NgbHighlight {
    constructor() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
    }
    ngOnChanges(changes) {
        const result = toString(this.result);
        const terms = Array.isArray(this.term) ? this.term : [this.term];
        const escapedTerms = terms.map(term => regExpEscape(toString(term))).filter(term => term);
        this.parts = escapedTerms.length ? result.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];
    }
}
NgbHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ngb-highlight',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                    `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                    `</ng-template>`,
                styles: [".ngb-highlight{font-weight:700}"]
            },] }
];
NgbHighlight.propDecorators = {
    highlightClass: [{ type: Input }],
    result: [{ type: Input }],
    term: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC9oaWdobGlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXBEOzs7Ozs7O0dBT0c7QUFVSCxNQUFNLE9BQU8sWUFBWTtJQVR6QjtRQVlFOztXQUVHO1FBQ00sbUJBQWMsR0FBRyxlQUFlLENBQUM7SUF3QjVDLENBQUM7SUFSQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFGLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9HLENBQUM7OztZQXRDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGdFQUFnRTtvQkFDdEUsa0hBQWtIO29CQUNsSCxnQkFBZ0I7O2FBRXJCOzs7NkJBT0UsS0FBSztxQkFRTCxLQUFLO21CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7cmVnRXhwRXNjYXBlLCB0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGhlbHBzIHdpdGggdGV4dCBoaWdobGlnaHRpbmcuXG4gKlxuICogSWYgc3BsaXRzIHRoZSBgcmVzdWx0YCB0ZXh0IGludG8gcGFydHMgdGhhdCBjb250YWluIHRoZSBzZWFyY2hlZCBgdGVybWAgYW5kIGdlbmVyYXRlcyB0aGUgSFRNTCBtYXJrdXAgdG8gc2ltcGxpZnlcbiAqIGhpZ2hsaWdodGluZzpcbiAqXG4gKiBFeC4gYHJlc3VsdD1cIkFsYXNrYVwiYCBhbmQgYHRlcm09XCJhc1wiYCB3aWxsIHByb2R1Y2UgYEFsPHNwYW4gY2xhc3M9XCJuZ2ItaGlnaGxpZ2h0XCI+YXM8L3NwYW4+a2FgLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInBhcnRzXCIgbGV0LXBhcnQgbGV0LWlzT2RkPVwib2RkXCI+YCArXG4gICAgICBgPHNwYW4gKm5nSWY9XCJpc09kZDsgZWxzZSBldmVuXCIgW2NsYXNzXT1cImhpZ2hsaWdodENsYXNzXCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlICNldmVuPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcbiAgICAgIGA8L25nLXRlbXBsYXRlPmAsICAvLyB0ZW1wbGF0ZSBuZWVkcyB0byBiZSBmb3JtYXR0ZWQgaW4gYSBjZXJ0YWluIHdheSBzbyB3ZSBkb24ndCBhZGQgZW1wdHkgdGV4dCBub2Rlc1xuICBzdHlsZVVybHM6IFsnLi9oaWdobGlnaHQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYkhpZ2hsaWdodCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHBhcnRzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIENTUyBjbGFzcyBmb3IgYDxzcGFuPmAgZWxlbWVudHMgd3JhcHBpbmcgdGhlIGB0ZXJtYCBpbnNpZGUgdGhlIGByZXN1bHRgLlxuICAgKi9cbiAgQElucHV0KCkgaGlnaGxpZ2h0Q2xhc3MgPSAnbmdiLWhpZ2hsaWdodCc7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZXh0IGhpZ2hsaWdodGluZyBpcyBhZGRlZCB0by5cbiAgICpcbiAgICogSWYgdGhlIGB0ZXJtYCBpcyBmb3VuZCBpbnNpZGUgdGhpcyB0ZXh0LCBpdCB3aWxsIGJlIGhpZ2hsaWdodGVkLlxuICAgKiBJZiB0aGUgYHRlcm1gIGNvbnRhaW5zIGFycmF5IHRoZW4gYWxsIHRoZSBpdGVtcyBmcm9tIGl0IHdpbGwgYmUgaGlnaGxpZ2h0ZWQgaW5zaWRlIHRoZSB0ZXh0LlxuICAgKi9cbiAgQElucHV0KCkgcmVzdWx0Pzogc3RyaW5nIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIHRlcm0gb3IgYXJyYXkgb2YgdGVybXMgdG8gYmUgaGlnaGxpZ2h0ZWQuXG4gICAqIFNpbmNlIHZlcnNpb24gYHY0LjIuMGAgdGVybSBjb3VsZCBiZSBhIGBzdHJpbmdbXWBcbiAgICovXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZyB8IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0b1N0cmluZyh0aGlzLnJlc3VsdCk7XG5cbiAgICBjb25zdCB0ZXJtcyA9IEFycmF5LmlzQXJyYXkodGhpcy50ZXJtKSA/IHRoaXMudGVybSA6IFt0aGlzLnRlcm1dO1xuICAgIGNvbnN0IGVzY2FwZWRUZXJtcyA9IHRlcm1zLm1hcCh0ZXJtID0+IHJlZ0V4cEVzY2FwZSh0b1N0cmluZyh0ZXJtKSkpLmZpbHRlcih0ZXJtID0+IHRlcm0pO1xuXG4gICAgdGhpcy5wYXJ0cyA9IGVzY2FwZWRUZXJtcy5sZW5ndGggPyByZXN1bHQuc3BsaXQobmV3IFJlZ0V4cChgKCR7ZXNjYXBlZFRlcm1zLmpvaW4oJ3wnKX0pYCwgJ2dtaScpKSA6IFtyZXN1bHRdO1xuICB9XG59XG4iXX0=