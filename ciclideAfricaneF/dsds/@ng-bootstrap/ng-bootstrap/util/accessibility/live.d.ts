import { InjectionToken, OnDestroy } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare type ARIA_LIVE_DELAY_TYPE = number | null;
export declare const ARIA_LIVE_DELAY: InjectionToken<number | null>;
export declare function ARIA_LIVE_DELAY_FACTORY(): number;
export declare class Live implements OnDestroy {
    private _document;
    private _delay;
    constructor(_document: any, _delay: any);
    ngOnDestroy(): void;
    say(message: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Live, never>;
}

//# sourceMappingURL=live.d.ts.map