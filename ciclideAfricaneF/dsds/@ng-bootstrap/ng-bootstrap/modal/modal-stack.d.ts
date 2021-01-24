import { ApplicationRef, ComponentFactoryResolver, EventEmitter, Injector, NgZone, RendererFactory2 } from '@angular/core';
import { ScrollBar } from '../util/scrollbar';
import { NgbModalRef } from './modal-ref';
import * as ɵngcc0 from '@angular/core';
export declare class NgbModalStack {
    private _applicationRef;
    private _injector;
    private _document;
    private _scrollBar;
    private _rendererFactory;
    private _ngZone;
    private _activeWindowCmptHasChanged;
    private _ariaHiddenValues;
    private _backdropAttributes;
    private _modalRefs;
    private _windowAttributes;
    private _windowCmpts;
    private _activeInstances;
    constructor(_applicationRef: ApplicationRef, _injector: Injector, _document: any, _scrollBar: ScrollBar, _rendererFactory: RendererFactory2, _ngZone: NgZone);
    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options: any): NgbModalRef;
    get activeInstances(): EventEmitter<NgbModalRef[]>;
    dismissAll(reason?: any): void;
    hasOpenModals(): boolean;
    private _attachBackdrop;
    private _attachWindowComponent;
    private _applyWindowOptions;
    private _applyBackdropOptions;
    private _getContentRef;
    private _createFromTemplateRef;
    private _createFromString;
    private _createFromComponent;
    private _setAriaHidden;
    private _revertAriaHidden;
    private _registerModalRef;
    private _registerWindowCmpt;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgbModalStack, never>;
}

//# sourceMappingURL=modal-stack.d.ts.map