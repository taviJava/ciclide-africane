import { GalleryRef } from './gallery-ref';
import { GalleryConfig } from '../models/config.model';
import * as ɵngcc0 from '@angular/core';
export declare class Gallery {
    /** Store gallery instances */
    private readonly _instances;
    /** Global config */
    config: GalleryConfig;
    constructor(config: GalleryConfig);
    /**
     * Get or create gallery by ID
     * @param id
     * @param config
     */
    ref(id?: string, config?: GalleryConfig): GalleryRef;
    /**
     * Destroy all gallery instances
     */
    destroyAll(): void;
    /**
     * Reset all gallery instances
     */
    resetAll(): void;
    /**
     * A destroyer function for each gallery instance
     */
    private deleteInstance;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Gallery, [{ optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<Gallery>;
}

//# sourceMappingURL=gallery.service.d.ts.map