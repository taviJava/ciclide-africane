import { EventEmitter } from '@angular/core';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryCoreComponent {
    state: GalleryState;
    config: GalleryConfig;
    action: EventEmitter<string | number>;
    itemClick: EventEmitter<number>;
    thumbClick: EventEmitter<number>;
    error: EventEmitter<GalleryError>;
    /** Set thumbnails position */
    readonly thumbPosition: 'top' | 'left' | 'right' | 'bottom';
    /** Set sliding direction */
    readonly slidingDirection: 'horizontal' | 'vertical';
    /** Disable thumbnails clicks */
    readonly disableThumb: boolean;
    /** Set gallery image size */
    readonly imageSize: 'cover' | 'contain';
    /** Set gallery dots position */
    readonly dotsPosition: 'top' | 'bottom';
    /** Set gallery counter position */
    readonly counterPosition: 'top' | 'bottom';
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GalleryCoreComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GalleryCoreComponent, "gallery-core", never, { "state": "state"; "config": "config"; }, { "action": "action"; "itemClick": "itemClick"; "thumbClick": "thumbClick"; "error": "error"; }, never, never>;
}

//# sourceMappingURL=gallery-core.component.d.ts.map