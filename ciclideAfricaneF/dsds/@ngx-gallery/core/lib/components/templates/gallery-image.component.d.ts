import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryImageComponent implements OnInit, OnDestroy {
    private _sanitizer;
    /** Stream that emits the state */
    private readonly _state;
    readonly state: import("rxjs").Observable<"failed" | "loading" | "success">;
    /** Progress value */
    progress: number;
    /** Is thumbnail */
    isThumbnail: boolean;
    /** Image source URL */
    src: string;
    /** Loaded image URL */
    imageUrl: SafeStyle;
    /** Custom loader template */
    loadingIcon: string;
    /** Custom loader safe template */
    loaderTemplate: SafeHtml;
    /** Custom error template */
    loadingError: string;
    /** Custom error safe template */
    errorTemplate: SafeHtml;
    /** Stream that emits when an error occurs */
    error: EventEmitter<Error>;
    /** loading error */
    loadError: Error;
    readonly imageLoadSuccess: boolean;
    readonly imageLoadFailed: boolean;
    constructor(_sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onProgress({ loaded, total }: {
        loaded: number;
        total: number;
    }): void;
    onLoaded(blobUrl: string): void;
    onError(err: Error): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GalleryImageComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GalleryImageComponent, "gallery-image", never, { "isThumbnail": "isThumbnail"; "src": "src"; "loadingIcon": "loadingIcon"; "loadingError": "loadingError"; }, { "error": "error"; }, never, never>;
}

//# sourceMappingURL=gallery-image.component.d.ts.map