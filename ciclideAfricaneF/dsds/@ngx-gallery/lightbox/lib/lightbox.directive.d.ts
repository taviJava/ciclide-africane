import { ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { Lightbox } from './lightbox.service';
import * as ɵngcc0 from '@angular/core';
export declare class LightboxDirective implements OnInit, OnDestroy {
    private _lightbox;
    private _el;
    private _renderer;
    clickEvent: SubscriptionLike;
    index: number;
    id: string;
    constructor(_lightbox: Lightbox, _el: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<LightboxDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<LightboxDirective, "[lightbox]", never, { "index": "lightbox"; "id": "gallery"; }, {}, never>;
}

//# sourceMappingURL=lightbox.directive.d.ts.map