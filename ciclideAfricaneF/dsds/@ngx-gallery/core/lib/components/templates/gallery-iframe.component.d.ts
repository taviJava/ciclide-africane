import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryIframeComponent implements OnInit {
    private _sanitizer;
    iframeSrc: SafeResourceUrl;
    src: string;
    pauseVideo: boolean;
    iframe: ElementRef;
    constructor(_sanitizer: DomSanitizer);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GalleryIframeComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GalleryIframeComponent, "gallery-iframe", never, { "pauseVideo": "pause"; "src": "src"; }, {}, never, never>;
}

//# sourceMappingURL=gallery-iframe.component.d.ts.map