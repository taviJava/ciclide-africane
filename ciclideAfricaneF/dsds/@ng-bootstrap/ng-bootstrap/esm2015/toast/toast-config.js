import { Injectable } from '@angular/core';
import { NgbConfig } from '../ngb-config';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
export class NgbToastConfig {
    constructor(ngbConfig) {
        this.autohide = true;
        this.delay = 500;
        this.ariaLive = 'polite';
        this.animation = ngbConfig.animation;
    }
}
NgbToastConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbToastConfig_Factory() { return new NgbToastConfig(i0.ɵɵinject(i1.NgbConfig)); }, token: NgbToastConfig, providedIn: "root" });
NgbToastConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
NgbToastConfig.ctorParameters = () => [
    { type: NgbConfig }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RvYXN0L3RvYXN0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7OztBQTZCeEM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFNekIsWUFBWSxTQUFvQjtRQUpoQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixhQUFRLEdBQXVCLFFBQVEsQ0FBQztRQUVKLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUFDLENBQUM7Ozs7WUFQNUUsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7O1lBcEN4QixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiQ29uZmlnfSBmcm9tICcuLi9uZ2ItY29uZmlnJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgdXNlZCB0byB0eXBlIGFsbCB0b2FzdCBjb25maWcgb3B0aW9ucy4gU2VlIGBOZ2JUb2FzdENvbmZpZ2AuXG4gKlxuICogQHNpbmNlIDUuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVG9hc3RPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgaWYgdGhlIHRvYXN0IGNvbXBvbmVudCBzaG91bGQgZW1pdCB0aGUgYGhpZGUoKWAgb3V0cHV0XG4gICAqIGFmdGVyIGEgY2VydGFpbiBgZGVsYXlgIGluIG1zLlxuICAgKi9cbiAgYXV0b2hpZGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWxheSBpbiBtcyBhZnRlciB3aGljaCB0aGUgYGhpZGUoKWAgb3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAgKi9cbiAgZGVsYXk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgYXJpYS1saXZlIGF0dHJpYnV0ZSB0byBiZSB1c2VkLlxuICAgKlxuICAgKiBDb3VsZCBiZSBvbmUgb2YgdGhlc2UgMiB2YWx1ZXMgKGFzIHN0cmluZyk6XG4gICAqIC0gYHBvbGl0ZWAgKGRlZmF1bHQpXG4gICAqIC0gYGFsZXJ0YFxuICAgKi9cbiAgYXJpYUxpdmU/OiAncG9saXRlJyB8ICdhbGVydCc7XG59XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVG9hc3QgY29tcG9uZW50LiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LFxuICogYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9hc3RzIHVzZWQgaW4gdGhlXG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiVG9hc3RDb25maWcgaW1wbGVtZW50cyBOZ2JUb2FzdE9wdGlvbnMge1xuICBhbmltYXRpb246IGJvb2xlYW47XG4gIGF1dG9oaWRlID0gdHJ1ZTtcbiAgZGVsYXkgPSA1MDA7XG4gIGFyaWFMaXZlOiAncG9saXRlJyB8ICdhbGVydCcgPSAncG9saXRlJztcblxuICBjb25zdHJ1Y3RvcihuZ2JDb25maWc6IE5nYkNvbmZpZykgeyB0aGlzLmFuaW1hdGlvbiA9IG5nYkNvbmZpZy5hbmltYXRpb247IH1cbn1cbiJdfQ==