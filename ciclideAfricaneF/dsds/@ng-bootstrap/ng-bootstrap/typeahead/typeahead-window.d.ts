import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { toString } from '../util/util';
/**
 * The context for the typeahead result template in case you want to override the default one.
 */
import * as ɵngcc0 from '@angular/core';
export interface ResultTemplateContext {
    /**
     * Your typeahead result item.
     */
    result: any;
    /**
     * Search term from the `<input>` used to get current result.
     */
    term: string;
}
export declare class NgbTypeaheadWindow implements OnInit {
    activeIdx: number;
    /**
     *  The id for the typeahead window. The id should be unique and the same
     *  as the associated typeahead's id.
     */
    id: string;
    /**
     * Flag indicating if the first row should be active initially
     */
    focusFirst: boolean;
    /**
     * Typeahead match results to be displayed
     */
    results: any;
    /**
     * Search term used to get current results
     */
    term: string;
    /**
     * A function used to format a given result before display. This function should return a formatted string without any
     * HTML markup
     */
    formatter: typeof toString;
    /**
     * A template to override a matching result default display
     */
    resultTemplate: TemplateRef<ResultTemplateContext>;
    /**
     * Event raised when user selects a particular result row
     */
    selectEvent: EventEmitter<any>;
    activeChangeEvent: EventEmitter<any>;
    hasActive(): boolean;
    getActive(): any;
    markActive(activeIdx: number): void;
    next(): void;
    prev(): void;
    resetActive(): void;
    select(item: any): void;
    ngOnInit(): void;
    private _activeChanged;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbTypeaheadWindow, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgbTypeaheadWindow, "ngb-typeahead-window", ["ngbTypeaheadWindow"], { "focusFirst": "focusFirst"; "formatter": "formatter"; "id": "id"; "results": "results"; "term": "term"; "resultTemplate": "resultTemplate"; }, { "selectEvent": "select"; "activeChangeEvent": "activeChange"; }, never, never>;
}

//# sourceMappingURL=typeahead-window.d.ts.map