import { ChangeDetectorRef, OnInit, OnChanges, DoCheck, SimpleChanges, AfterViewInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { NgImageSliderService } from './ng-image-slider.service';
export declare class NgImageSliderComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy {
    private cdRef;
    private platformId;
    imageSliderService: NgImageSliderService;
    private elRef;
    sliderMainDivWidth: number;
    imageParentDivWidth: number;
    imageObj: Array<object>;
    ligthboxImageObj: Array<object>;
    totalImages: number;
    leftPos: number;
    effectStyle: string;
    speed: number;
    sliderPrevDisable: boolean;
    sliderNextDisable: boolean;
    slideImageCount: number;
    sliderImageWidth: number;
    sliderImageReceivedWidth: number | string;
    sliderImageHeight: number;
    sliderImageReceivedHeight: number | string;
    sliderImageSizeWithPadding: number;
    autoSlideCount: number;
    stopSlideOnHover: boolean;
    autoSlideInterval: any;
    showArrowButton: boolean;
    textDirection: string;
    imageMargin: number;
    private swipeCoord?;
    private swipeTime?;
    sliderMain: any;
    imageDiv: any;
    set imageSize(data: any);
    infinite: boolean;
    imagePopup: boolean;
    set direction(dir: string);
    set animationSpeed(data: number);
    images: Array<object>;
    set slideImage(count: any);
    set autoSlide(count: any);
    set showArrow(flag: any);
    videoAutoPlay: boolean;
    paginationShow: boolean;
    arrowKeyMove: boolean;
    manageImageRatio: boolean;
    showVideoControls: boolean;
    imageClick: EventEmitter<number>;
    arrowClick: EventEmitter<string>;
    lightboxArrowClick: EventEmitter<object>;
    lightboxClose: EventEmitter<object>;
    ligthboxShow: boolean;
    activeImageIndex: number;
    visiableImageIndex: number;
    onResize(event: any): void;
    handleKeyboardEvent(event: KeyboardEvent): void;
    constructor(cdRef: ChangeDetectorRef, platformId: Object, imageSliderService: NgImageSliderService, elRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    setSliderImages(imgObj: any): void;
    setSliderWidth(): void;
    imageOnClick(index: any): void;
    imageAutoSlide(): void;
    imageMouseEnterHandler(): void;
    prev(): void;
    next(): void;
    prevImg(): void;
    nextImg(): void;
    infinitePrevImg(): void;
    infiniteNextImg(): void;
    getVisiableIndex(): void;
    /**
     * Disable slider left/right arrow when image moving
     */
    sliderArrowDisableTeam(): void;
    nextPrevSliderButtonDisable(): void;
    showLightbox(): void;
    close(): void;
    lightboxArrowClickHandler(event: any): void;
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    swipe(e: TouchEvent, when: string): void;
}
