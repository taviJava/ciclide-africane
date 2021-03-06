import { ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class SliderLightboxComponent implements OnInit, AfterViewInit, OnDestroy {
    private cdRef;
    private sanitizer;
    private elRef;
    private document;
    totalImages: number;
    nextImageIndex: number;
    popupWidth: number;
    marginLeft: number;
    imageFullscreenView: boolean;
    lightboxPrevDisable: boolean;
    lightboxNextDisable: boolean;
    showLoading: boolean;
    effectStyle: string;
    speed: number;
    title: string;
    currentImageIndex: number;
    private swipeLightboxImgCoord?;
    private swipeLightboxImgTime?;
    lightboxDiv: any;
    lightboxImageDiv: any;
    images: Array<object>;
    set imageIndex(index: number);
    set show(visiableFlag: boolean);
    videoAutoPlay: boolean;
    direction: string;
    paginationShow: boolean;
    set animationSpeed(data: number);
    infinite: boolean;
    arrowKeyMove: boolean;
    showVideoControls: boolean;
    close: EventEmitter<any>;
    prevImage: EventEmitter<any>;
    nextImage: EventEmitter<any>;
    onResize(event: any): void;
    handleKeyboardEvent(event: KeyboardEvent): void;
    constructor(cdRef: ChangeDetectorRef, sanitizer: DomSanitizer, elRef: ElementRef, document: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setPopupSliderWidth(): void;
    closeLightbox(): void;
    prevImageLightbox(): void;
    nextImageLightbox(): void;
    nextPrevDisable(): void;
    applyButtonDisableCondition(): void;
    getImageData(): void;
    resetState(): void;
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    swipeLightboxImg(e: TouchEvent, when: string): void;
}
