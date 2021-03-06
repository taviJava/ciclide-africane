import { OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryNavComponent implements OnInit {
    private _sanitizer;
    navIcon: SafeHtml;
    state: GalleryState;
    config: GalleryConfig;
    action: EventEmitter<string>;
    constructor(_sanitizer: DomSanitizer);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GalleryNavComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GalleryNavComponent, "gallery-nav", never, { "state": "state"; "config": "config"; }, { "action": "action"; }, never, never>;
}

//# sourceMappingURL=gallery-nav.component.d.ts.map