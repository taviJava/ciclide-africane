import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryVideoComponent implements OnInit {
    videoSources: {
        url: string;
        type?: string;
    }[];
    src: string | {
        url: string;
        type?: string;
    }[];
    poster: string;
    pauseVideo: boolean;
    /** Stream that emits when an error occurs */
    error: EventEmitter<Error>;
    video: ElementRef;
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GalleryVideoComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GalleryVideoComponent, "gallery-video", never, { "pauseVideo": "pause"; "src": "src"; "poster": "poster"; }, { "error": "error"; }, never, never>;
}

//# sourceMappingURL=gallery-video.component.d.ts.map