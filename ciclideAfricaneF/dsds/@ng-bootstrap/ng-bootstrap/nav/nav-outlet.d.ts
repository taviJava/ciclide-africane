import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgbNav, NgbNavItem } from './nav';
import * as ɵngcc0 from '@angular/core';
export declare class NgbNavPane {
    elRef: ElementRef<HTMLElement>;
    item: NgbNavItem;
    nav: NgbNav;
    role: string;
    constructor(elRef: ElementRef<HTMLElement>);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbNavPane, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NgbNavPane, "[ngbNavPane]", never, { "item": "item"; "nav": "nav"; "role": "role"; }, {}, never>;
}
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
export declare class NgbNavOutlet implements AfterViewInit {
    private _cd;
    private _activePane;
    private _panes;
    /**
     * A role to set on the nav pane
     */
    paneRole: any;
    /**
     * Reference to the `NgbNav`
     */
    nav: NgbNav;
    constructor(_cd: ChangeDetectorRef);
    isPanelTransitioning(item: NgbNavItem): boolean;
    ngAfterViewInit(): void;
    private _getPaneForItem;
    private _getActivePane;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbNavOutlet, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgbNavOutlet, "[ngbNavOutlet]", never, { "paneRole": "paneRole"; "nav": "ngbNavOutlet"; }, {}, never, never>;
}

//# sourceMappingURL=nav-outlet.d.ts.map