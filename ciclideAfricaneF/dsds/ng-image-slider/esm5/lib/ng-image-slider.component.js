/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-image-slider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, HostListener, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgImageSliderService } from './ng-image-slider.service';
/** @type {?} */
var NEXT_ARROW_CLICK_MESSAGE = 'next';
/** @type {?} */
var PREV_ARROW_CLICK_MESSAGE = 'previous';
var NgImageSliderComponent = /** @class */ (function () {
    function NgImageSliderComponent(cdRef, platformId, imageSliderService, elRef
    // @Inject(ElementRef) private _elementRef: ElementRef
    ) {
        this.cdRef = cdRef;
        this.platformId = platformId;
        this.imageSliderService = imageSliderService;
        this.elRef = elRef;
        // for slider
        this.sliderMainDivWidth = 0;
        this.imageParentDivWidth = 0;
        this.imageObj = [];
        this.ligthboxImageObj = [];
        this.totalImages = 0;
        this.leftPos = 0;
        this.effectStyle = 'all 1s ease-in-out';
        this.speed = 1; // default speed in second
        // default speed in second
        this.sliderPrevDisable = false;
        this.sliderNextDisable = false;
        this.slideImageCount = 1;
        this.sliderImageWidth = 205;
        this.sliderImageReceivedWidth = 205;
        this.sliderImageHeight = 200;
        this.sliderImageReceivedHeight = 205;
        this.sliderImageSizeWithPadding = 211;
        this.autoSlideCount = 0;
        this.stopSlideOnHover = true;
        this.showArrowButton = true;
        this.textDirection = 'ltr';
        this.imageMargin = 3;
        this.infinite = false;
        this.imagePopup = true;
        this.images = [];
        this.videoAutoPlay = false;
        this.paginationShow = false;
        this.arrowKeyMove = true;
        this.manageImageRatio = false;
        this.showVideoControls = true;
        // @Outputs
        this.imageClick = new EventEmitter();
        this.arrowClick = new EventEmitter();
        this.lightboxArrowClick = new EventEmitter();
        this.lightboxClose = new EventEmitter();
        // for lightbox
        this.ligthboxShow = false;
        this.activeImageIndex = -1;
        this.visiableImageIndex = 0;
    }
    Object.defineProperty(NgImageSliderComponent.prototype, "imageSize", {
        // @inputs
        set: 
        // @inputs
        /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data
                && typeof (data) === 'object') {
                if (data.hasOwnProperty('space') && typeof (data['space']) === 'number' && data['space'] > -1) {
                    this.imageMargin = data['space'];
                }
                if (data.hasOwnProperty('width') && (typeof (data['width']) === 'number' || typeof (data['width']) === 'string')) {
                    this.sliderImageReceivedWidth = data['width'];
                    // this.sliderImageSizeWithPadding = data['width'] + (this.imageMargin * 2); // addeing padding with image width
                }
                if (data.hasOwnProperty('height') && (typeof (data['height']) === 'number' || typeof (data['height']) === 'string')) {
                    this.sliderImageReceivedHeight = data['height'];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgImageSliderComponent.prototype, "direction", {
        set: /**
         * @param {?} dir
         * @return {?}
         */
        function (dir) {
            if (dir) {
                this.textDirection = dir;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgImageSliderComponent.prototype, "animationSpeed", {
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data
                && typeof (data) === 'number'
                && data >= 0.1
                && data <= 5) {
                this.speed = data;
                this.effectStyle = "all " + this.speed + "s ease-in-out";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgImageSliderComponent.prototype, "slideImage", {
        set: /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            if (count && typeof count === 'number') {
                this.slideImageCount = Math.round(count);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgImageSliderComponent.prototype, "autoSlide", {
        set: /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            if (count && (typeof count === 'number'
                || typeof count === 'boolean'
                || typeof count === 'object')) {
                if (typeof count === 'number' && count >= 1 && count <= 5) {
                    count = Math.round(count);
                }
                else if (typeof count === 'boolean') {
                    count = 1;
                }
                else if (typeof count === 'object'
                    && count.hasOwnProperty('interval')
                    && Math.round(count['interval'])
                    && Math.round(count['interval']) >= 1
                    && Math.round(count['interval']) <= 5) {
                    this.stopSlideOnHover = count.hasOwnProperty('stopOnHover') ? count['stopOnHover'] : true;
                    count = Math.round(count['interval']);
                }
                this.autoSlideCount = count * 1000;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgImageSliderComponent.prototype, "showArrow", {
        set: /**
         * @param {?} flag
         * @return {?}
         */
        function (flag) {
            if (flag !== undefined && typeof flag === 'boolean') {
                this.showArrowButton = flag;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgImageSliderComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setSliderWidth();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgImageSliderComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.key) {
            if (event.key.toLowerCase() === 'arrowright' && !this.ligthboxShow && this.arrowKeyMove) {
                this.next();
            }
            if (event.key.toLowerCase() === 'arrowleft' && !this.ligthboxShow && this.arrowKeyMove) {
                this.prev();
            }
            if (event.key.toLowerCase() === 'escape' && this.ligthboxShow) {
                this.close();
            }
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // @TODO: for future use
        // console.log(this._elementRef)
        // for slider
        if (this.infinite) {
            this.effectStyle = 'none';
            this.leftPos = -1 * this.sliderImageSizeWithPadding * this.slideImageCount;
            for (var i = 1; i <= this.slideImageCount; i++) {
                this.imageObj.unshift(this.imageObj[this.imageObj.length - i]);
            }
        }
    };
    // for slider
    // for slider
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.ngAfterViewInit = 
    // for slider
    /**
     * @return {?}
     */
    function () {
        this.setSliderWidth();
        this.cdRef.detectChanges();
        if (isPlatformBrowser(this.platformId)) {
            this.imageAutoSlide();
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        if (this.ligthboxShow === true) {
            this.close();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgImageSliderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.images
            && changes.images.hasOwnProperty('previousValue')
            && changes.images.hasOwnProperty('currentValue')
            && changes.images.previousValue != changes.images.currentValue) {
            this.setSliderImages(changes.images.currentValue);
        }
        if (changes && changes.imageSize) {
            /** @type {?} */
            var size = changes.imageSize;
            if (size
                && size.previousValue
                && size.currentValue
                && size.previousValue.width && size.previousValue.height
                && size.currentValue.width && size.currentValue.height
                && (size.previousValue.width !== size.currentValue.width
                    || size.previousValue.height !== size.currentValue.height)) {
                this.setSliderWidth();
            }
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.images
            && this.ligthboxImageObj
            && this.images.length !== this.ligthboxImageObj.length) {
            this.setSliderImages(this.images);
        }
    };
    /**
     * @param {?} imgObj
     * @return {?}
     */
    NgImageSliderComponent.prototype.setSliderImages = /**
     * @param {?} imgObj
     * @return {?}
     */
    function (imgObj) {
        if (imgObj && imgObj instanceof Array && imgObj.length) {
            this.imageObj = imgObj.map((/**
             * @param {?} img
             * @param {?} index
             * @return {?}
             */
            function (img, index) {
                img['index'] = index;
                return img;
            }));
            this.ligthboxImageObj = __spread(this.imageObj);
            this.totalImages = this.imageObj.length;
            // this.imageParentDivWidth = imgObj.length * this.sliderImageSizeWithPadding;
            this.setSliderWidth();
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.setSliderWidth = /**
     * @return {?}
     */
    function () {
        if (this.sliderMain
            && this.sliderMain.nativeElement
            && this.sliderMain.nativeElement.offsetWidth) {
            this.sliderMainDivWidth = this.sliderMain.nativeElement.offsetWidth;
        }
        if (this.sliderMainDivWidth
            && this.sliderImageReceivedWidth) {
            if (typeof this.sliderImageReceivedWidth === 'number') {
                this.sliderImageWidth = this.sliderImageReceivedWidth;
            }
            else if (typeof this.sliderImageReceivedWidth === 'string') {
                if (this.sliderImageReceivedWidth.indexOf('px') >= 0) {
                    this.sliderImageWidth = parseFloat(this.sliderImageReceivedWidth);
                }
                else if (this.sliderImageReceivedWidth.indexOf('%') >= 0) {
                    this.sliderImageWidth = +((this.sliderMainDivWidth * parseFloat(this.sliderImageReceivedWidth)) / 100).toFixed(2);
                }
                else if (parseFloat(this.sliderImageReceivedWidth)) {
                    this.sliderImageWidth = parseFloat(this.sliderImageReceivedWidth);
                }
            }
        }
        if (window && window.innerHeight
            && this.sliderImageReceivedHeight) {
            if (typeof this.sliderImageReceivedHeight === 'number') {
                this.sliderImageHeight = this.sliderImageReceivedHeight;
            }
            else if (typeof this.sliderImageReceivedHeight === 'string') {
                if (this.sliderImageReceivedHeight.indexOf('px') >= 0) {
                    this.sliderImageHeight = parseFloat(this.sliderImageReceivedHeight);
                }
                else if (this.sliderImageReceivedHeight.indexOf('%') >= 0) {
                    this.sliderImageHeight = +((window.innerHeight * parseFloat(this.sliderImageReceivedHeight)) / 100).toFixed(2);
                }
                else if (parseFloat(this.sliderImageReceivedHeight)) {
                    this.sliderImageHeight = parseFloat(this.sliderImageReceivedHeight);
                }
            }
        }
        this.sliderImageSizeWithPadding = this.sliderImageWidth + (this.imageMargin * 2);
        this.imageParentDivWidth = this.imageObj.length * this.sliderImageSizeWithPadding;
        if (this.imageDiv && this.imageDiv.nativeElement && this.imageDiv.nativeElement.offsetWidth) {
            this.leftPos = this.infinite ? -1 * this.sliderImageSizeWithPadding * this.slideImageCount : 0;
        }
        this.nextPrevSliderButtonDisable();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgImageSliderComponent.prototype.imageOnClick = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.activeImageIndex = index;
        if (this.imagePopup) {
            this.showLightbox();
        }
        this.imageClick.emit(index);
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.imageAutoSlide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.infinite && this.autoSlideCount && !this.ligthboxShow) {
            this.autoSlideInterval = setInterval((/**
             * @return {?}
             */
            function () {
                _this.next();
            }), this.autoSlideCount);
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.imageMouseEnterHandler = /**
     * @return {?}
     */
    function () {
        if (this.infinite && this.autoSlideCount && this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        if (!this.sliderPrevDisable) {
            if (this.infinite) {
                this.infinitePrevImg();
            }
            else {
                this.prevImg();
            }
            this.arrowClick.emit(PREV_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam();
            this.getVisiableIndex();
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        if (!this.sliderNextDisable) {
            if (this.infinite) {
                this.infiniteNextImg();
            }
            else {
                this.nextImg();
            }
            this.arrowClick.emit(NEXT_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam();
            this.getVisiableIndex();
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.prevImg = /**
     * @return {?}
     */
    function () {
        if (0 >= this.leftPos + (this.sliderImageSizeWithPadding * this.slideImageCount)) {
            this.leftPos += this.sliderImageSizeWithPadding * this.slideImageCount;
        }
        else {
            this.leftPos = 0;
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.nextImg = /**
     * @return {?}
     */
    function () {
        if ((this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth > this.sliderImageSizeWithPadding * this.slideImageCount) {
            this.leftPos -= this.sliderImageSizeWithPadding * this.slideImageCount;
        }
        else if ((this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth > 0) {
            this.leftPos -= (this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth;
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.infinitePrevImg = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.effectStyle = "all " + this.speed + "s ease-in-out";
        this.leftPos = 0;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.effectStyle = 'none';
            _this.leftPos = -1 * _this.sliderImageSizeWithPadding * _this.slideImageCount;
            for (var i = 0; i < _this.slideImageCount; i++) {
                _this.imageObj.unshift(_this.imageObj[_this.imageObj.length - _this.slideImageCount - 1]);
                _this.imageObj.pop();
            }
        }), this.speed * 1000);
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.infiniteNextImg = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.effectStyle = "all " + this.speed + "s ease-in-out";
        this.leftPos = -2 * this.sliderImageSizeWithPadding * this.slideImageCount;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.effectStyle = 'none';
            for (var i = 0; i < _this.slideImageCount; i++) {
                _this.imageObj.push(_this.imageObj[_this.slideImageCount]);
                _this.imageObj.shift();
            }
            _this.leftPos = -1 * _this.sliderImageSizeWithPadding * _this.slideImageCount;
        }), this.speed * 1000);
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.getVisiableIndex = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentIndex = Math.round((Math.abs(this.leftPos) + this.sliderImageWidth) / this.sliderImageWidth);
        if (this.imageObj[currentIndex - 1] && this.imageObj[currentIndex - 1]['index'] !== undefined) {
            this.visiableImageIndex = this.imageObj[currentIndex - 1]['index'];
        }
    };
    /**
     * Disable slider left/right arrow when image moving
     */
    /**
     * Disable slider left/right arrow when image moving
     * @return {?}
     */
    NgImageSliderComponent.prototype.sliderArrowDisableTeam = /**
     * Disable slider left/right arrow when image moving
     * @return {?}
     */
    function () {
        var _this = this;
        this.sliderNextDisable = true;
        this.sliderPrevDisable = true;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.nextPrevSliderButtonDisable();
        }), this.speed * 1000);
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.nextPrevSliderButtonDisable = /**
     * @return {?}
     */
    function () {
        this.sliderNextDisable = false;
        this.sliderPrevDisable = false;
        if (!this.infinite) {
            if (this.imageParentDivWidth + this.leftPos <= this.sliderMainDivWidth) {
                this.sliderNextDisable = true;
            }
            if (this.leftPos >= 0) {
                this.sliderPrevDisable = true;
            }
        }
    };
    // for lightbox
    // for lightbox
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.showLightbox = 
    // for lightbox
    /**
     * @return {?}
     */
    function () {
        if (this.imageObj.length) {
            this.imageMouseEnterHandler();
            this.ligthboxShow = true;
            this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
        }
    };
    /**
     * @return {?}
     */
    NgImageSliderComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.ligthboxShow = false;
        this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
        this.lightboxClose.emit();
        this.imageAutoSlide();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgImageSliderComponent.prototype.lightboxArrowClickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.lightboxArrowClick.emit(event);
    };
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    NgImageSliderComponent.prototype.swipe = /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    function (e, when) {
        /** @type {?} */
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        /** @type {?} */
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            /** @type {?} */
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            /** @type {?} */
            var duration = time - this.swipeTime;
            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                if (direction[0] < 0) {
                    this.next();
                }
                else {
                    this.prev();
                }
            }
        }
    };
    NgImageSliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-image-slider',
                    template: "<div class=\"ng-image-slider\" [ngStyle]=\"{'height':sliderImageHeight+'px'}\">\n    <div class=\"ng-image-slider-container\">\n        <div class=\"main\"\n            [ngStyle]=\"{'height':sliderImageHeight+'px'}\"\n            #sliderMain>\n            <div class=\"main-inner\"\n                *ngIf=\"imageObj.length\"\n                [ngClass]=\"{'with-ng-main-pagination': paginationShow}\"\n                [ngStyle]=\"{'margin-left':leftPos+'px', 'width':imageParentDivWidth+'px', 'transition': effectStyle}\"\n                (touchstart)=\"swipe($event, 'start')\"\n                (touchend)=\"swipe($event, 'end')\">\n                <div *ngFor=\"let img of imageObj; let i = index\"\n                    [ngClass]=\"{'image-popup': imagePopup, 'selected-image': activeImageIndex == i}\"\n                    [ngStyle]=\"{'width':sliderImageWidth+'px', 'margin-left':imageMargin+'px', 'margin-right':imageMargin+'px'}\"\n                    class=\"img-div\"\n                    (click)=\"imageOnClick(img.index)\"\n                    (mouseenter)=\"stopSlideOnHover && imageMouseEnterHandler()\"\n                    (mouseleave)=\"stopSlideOnHover && imageAutoSlide()\"\n                    #imageDiv>\n                    <custom-img [imageUrl]=\"img?.thumbImage || img?.posterImage || img?.video\"\n                        [isVideo]=\"!!(img?.posterImage || img?.video)\"\n                        [alt]=\"img?.alt || img?.title || ''\"\n                        [title]=\"img?.title || img?.alt || ''\"\n                        [direction]=\"textDirection\"\n                        [ratio]=\"manageImageRatio\">\n                    </custom-img>\n                    <div [dir]=\"textDirection\" class=\"caption\" *ngIf=\"img?.title\">{{ img?.title }}</div>\n                </div>\n            </div>\n            <div class=\"ng-image-slider-error\"\n                *ngIf=\"!imageObj.length\">\n                <span class=\"ng-image-slider-loader\"></span>\n            </div>\n            <a *ngIf=\"showArrowButton && imageObj.length > 1\"\n                [ngClass]=\"{'disable': sliderPrevDisable}\"\n                class=\"prev icons prev-icon\"\n                (click)=\"prev()\"\n                (mouseenter)=\"stopSlideOnHover && imageMouseEnterHandler()\"\n                (mouseleave)=\"stopSlideOnHover && imageAutoSlide()\">&lsaquo;</a>\n            <a *ngIf=\"showArrowButton && imageObj.length > 1\"\n                [ngClass]=\"{'disable': sliderNextDisable}\"\n                class=\"next icons next-icon\"\n                (click)=\"next()\"\n                (mouseenter)=\"imageMouseEnterHandler()\"\n                (mouseleave)=\"imageAutoSlide()\">&rsaquo;</a>\n        </div>\n        <div *ngIf=\"imageObj.length && paginationShow\" class=\"ng-main-pagination\">{{visiableImageIndex + 1}} of {{totalImages}}</div>\n    </div>\n</div>\n<div *ngIf=\"ligthboxShow\">\n    <slider-lightbox\n        [paginationShow]=\"paginationShow\"\n        [showVideoControls]=\"showVideoControls\"\n        [arrowKeyMove]=\"arrowKeyMove\"\n        [images]=\"ligthboxImageObj\"\n        [infinite]=\"infinite\"\n        [animationSpeed]=\"speed\"\n        [imageIndex]=\"activeImageIndex\"\n        [show]=\"ligthboxShow\"\n        [direction]=\"textDirection\"\n        [videoAutoPlay]=\"videoAutoPlay\"\n        (prevImage)=\"lightboxArrowClickHandler($event)\"\n        (nextImage)=\"lightboxArrowClickHandler($event)\"\n        (close)=\"close()\">\n    </slider-lightbox>\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ng-image-slider{display:inline-block;position:relative;width:100%}.ng-image-slider .ng-image-slider-container .main{overflow:hidden;position:absolute;height:200px;width:100%}.ng-image-slider .ng-image-slider-container .main .main-inner{width:1760px;padding:0;height:100%}.ng-image-slider .ng-image-slider-container .main .main-inner.with-ng-main-pagination{height:calc(100% - 30px)}.ng-image-slider .ng-image-slider-container .main .main-inner .full-screen{background:url(data:image/png;base64,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) 0 0/40px 40px no-repeat;position:absolute;z-index:8;display:block;height:40px;width:40px;top:4px;right:8px;opacity:.4;transition:.5s ease-in-out;cursor:pointer}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:205px;height:100%;margin-right:3px;margin-left:3px;position:relative;border-radius:5px;display:inline-block;box-shadow:inset 0 0 1px rgba(0,0,0,.24),0 0 2px rgba(0,0,0,.12)}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div.image-popup{cursor:pointer}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div img,.ng-image-slider .ng-image-slider-container .main .main-inner .img-div video{position:absolute;top:0;bottom:0;margin:auto;height:100%;width:100%;left:0;right:0;border-radius:5px}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div img.ratio,.ng-image-slider .ng-image-slider-container .main .main-inner .img-div video.ratio{width:auto;height:auto;max-width:100%;max-height:100%}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div .youtube-icon{background:url(data:image/png;base64,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) center center/140px 80px no-repeat;position:absolute;z-index:6;display:block;height:100%;width:100%;top:0;left:0}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div .caption{position:absolute;bottom:0;padding:5px;color:#fff;background-image:linear-gradient(to right,rgba(0,0,0,.1),rgba(0,0,0,.25),rgba(0,0,0,.5),rgba(0,0,0,.25),rgba(0,0,0,.1));width:100%;text-align:center;box-sizing:border-box;border-radius:0 0 5px 5px}.ng-image-slider .ng-image-slider-container .main .main-inner:hover .full-screen{transition:.5s ease-in-out;opacity:1}.ng-image-slider .ng-image-slider-container .main .next,.ng-image-slider .ng-image-slider-container .main .prev{position:absolute;right:10px;top:50%;background-color:#fff;border-radius:50%;cursor:pointer;margin-top:-16px;outline:0;width:35px;height:35px;font-size:35px;line-height:30px;z-index:8;transition:.5s ease-in-out;text-align:center}.ng-image-slider .ng-image-slider-container .main .next:hover,.ng-image-slider .ng-image-slider-container .main .prev:hover{background-color:#d4cdcd;background-position:-192px -415px}.ng-image-slider .ng-image-slider-container .main .next.disable,.ng-image-slider .ng-image-slider-container .main .prev.disable{color:#bbb;background-color:#fff;opacity:.5;cursor:default}.ng-image-slider .ng-image-slider-container .main .prev{left:10px}.ng-image-slider .ng-image-slider-container .main .prev:hover{background-position:-194px -450px}.ng-image-slider .ng-image-slider-container .ng-main-pagination{background-color:inherit;color:inherit;position:absolute;height:30px;width:calc(100% - 6px);text-align:center;bottom:0;font-size:16px;line-height:30px;border-radius:0 0 5px 5px;margin:0 3px}.ng-image-slider .ng-image-slider-error{height:100%;position:relative;display:flex;justify-content:center;align-items:center}.ng-image-slider .ng-image-slider-error .ng-image-slider-loader{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;background-size:25px 25px;width:25px;height:25px}@media (max-width:1199px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:170px;max-width:100%}}@media (max-width:991px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:297px;max-width:100%}}@media (max-width:768px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:247px;max-width:100%}}@media (max-width:576px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:350px;max-width:100%}}.ng-image-fullscreen-view{position:fixed;z-index:1031;background-color:rgba(0,0,0,.6);width:100%;height:100%;top:0;overflow:hidden;transition:.5s ease-in-out;left:0;text-align:center}.ng-image-fullscreen-view.image-fullview-hide{display:none!important}.ng-image-fullscreen-view .lightbox-wrapper{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#1f1f1f;transition:.5s;display:flex;justify-content:center;align-items:center}.ng-image-fullscreen-view .lightbox-wrapper.ng-ligthbox-pagination{height:calc(100% - 30px)}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div{width:100%;height:100%;border:1px solid rgba(0,0,0,.35);position:relative;overflow:hidden}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .pre-loader{background-color:inherit;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .pre-loader .mnml-spinner{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main{display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:100%;grid-column-gap:0;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image{width:1299px;height:100%;position:relative}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image.ng-image-slider-show{opacity:1;display:block}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image.ng-image-slider-hide{opacity:0;display:none}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main img{transition:.5s ease-in-out;width:auto;height:auto;max-height:100%;max-width:100%;position:absolute;z-index:11;top:0;bottom:0;margin:auto;left:0;right:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main iframe,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main video{top:0;left:0;right:0;bottom:0;margin:auto;width:100%;height:100%;border:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption{position:absolute;z-index:11;top:0;margin:auto;padding:5px;color:#fff;background-color:rgba(0,0,0,.35);max-width:100%;left:0;right:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption.show{display:block}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption.hide{display:none}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev{position:absolute;right:10px;top:50%;background-color:#fff;border-radius:50%;cursor:pointer;margin-top:-16px;width:38px;height:38px;font-size:35px;z-index:12;line-height:30px;outline:0;color:#000;transition:.3s ease-in-out}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next:hover,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev:hover{background-color:#d4cdcd}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next.disable,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev.disable{color:#bbb;background-color:#fff}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev{left:10px}.ng-image-fullscreen-view .lightbox-wrapper .close{background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-position:center center;background-size:32px;position:absolute;top:10px;right:10px;color:#000;background-color:#fff;padding:0;opacity:1;border-radius:50%;height:36px;width:36px;z-index:12;cursor:pointer;transition:.2s}.ng-image-fullscreen-view .lightbox-wrapper.error-msg{background-image:none}.ng-image-fullscreen-view .invalid-msg{color:#fff;font-size:18px;position:absolute;top:45%;left:45%}.ng-image-fullscreen-view .popup-pagination{background-color:#1f1f1f;color:#fff;position:absolute;height:30px;width:100%;text-align:center;bottom:0;font-size:16px;line-height:30px}@media (max-width:768px){.ng-image-fullscreen-view .lightbox-wrapper{width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper.error-msg{background-image:none}}"]
                }] }
    ];
    /** @nocollapse */
    NgImageSliderComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgImageSliderService },
        { type: ElementRef }
    ]; };
    NgImageSliderComponent.propDecorators = {
        sliderMain: [{ type: ViewChild, args: ['sliderMain', { static: false },] }],
        imageDiv: [{ type: ViewChild, args: ['imageDiv', { static: false },] }],
        imageSize: [{ type: Input }],
        infinite: [{ type: Input }],
        imagePopup: [{ type: Input }],
        direction: [{ type: Input }],
        animationSpeed: [{ type: Input }],
        images: [{ type: Input }],
        slideImage: [{ type: Input }],
        autoSlide: [{ type: Input }],
        showArrow: [{ type: Input }],
        videoAutoPlay: [{ type: Input }],
        paginationShow: [{ type: Input }],
        arrowKeyMove: [{ type: Input }],
        manageImageRatio: [{ type: Input }],
        showVideoControls: [{ type: Input }],
        imageClick: [{ type: Output }],
        arrowClick: [{ type: Output }],
        lightboxArrowClick: [{ type: Output }],
        lightboxClose: [{ type: Output }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keyup', ['$event'],] }]
    };
    return NgImageSliderComponent;
}());
export { NgImageSliderComponent };
if (false) {
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderMainDivWidth;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageParentDivWidth;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageObj;
    /** @type {?} */
    NgImageSliderComponent.prototype.ligthboxImageObj;
    /** @type {?} */
    NgImageSliderComponent.prototype.totalImages;
    /** @type {?} */
    NgImageSliderComponent.prototype.leftPos;
    /** @type {?} */
    NgImageSliderComponent.prototype.effectStyle;
    /** @type {?} */
    NgImageSliderComponent.prototype.speed;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderPrevDisable;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderNextDisable;
    /** @type {?} */
    NgImageSliderComponent.prototype.slideImageCount;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderImageWidth;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderImageReceivedWidth;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderImageHeight;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderImageReceivedHeight;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderImageSizeWithPadding;
    /** @type {?} */
    NgImageSliderComponent.prototype.autoSlideCount;
    /** @type {?} */
    NgImageSliderComponent.prototype.stopSlideOnHover;
    /** @type {?} */
    NgImageSliderComponent.prototype.autoSlideInterval;
    /** @type {?} */
    NgImageSliderComponent.prototype.showArrowButton;
    /** @type {?} */
    NgImageSliderComponent.prototype.textDirection;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageMargin;
    /**
     * @type {?}
     * @private
     */
    NgImageSliderComponent.prototype.swipeCoord;
    /**
     * @type {?}
     * @private
     */
    NgImageSliderComponent.prototype.swipeTime;
    /** @type {?} */
    NgImageSliderComponent.prototype.sliderMain;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageDiv;
    /** @type {?} */
    NgImageSliderComponent.prototype.infinite;
    /** @type {?} */
    NgImageSliderComponent.prototype.imagePopup;
    /** @type {?} */
    NgImageSliderComponent.prototype.images;
    /** @type {?} */
    NgImageSliderComponent.prototype.videoAutoPlay;
    /** @type {?} */
    NgImageSliderComponent.prototype.paginationShow;
    /** @type {?} */
    NgImageSliderComponent.prototype.arrowKeyMove;
    /** @type {?} */
    NgImageSliderComponent.prototype.manageImageRatio;
    /** @type {?} */
    NgImageSliderComponent.prototype.showVideoControls;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageClick;
    /** @type {?} */
    NgImageSliderComponent.prototype.arrowClick;
    /** @type {?} */
    NgImageSliderComponent.prototype.lightboxArrowClick;
    /** @type {?} */
    NgImageSliderComponent.prototype.lightboxClose;
    /** @type {?} */
    NgImageSliderComponent.prototype.ligthboxShow;
    /** @type {?} */
    NgImageSliderComponent.prototype.activeImageIndex;
    /** @type {?} */
    NgImageSliderComponent.prototype.visiableImageIndex;
    /**
     * @type {?}
     * @private
     */
    NgImageSliderComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    NgImageSliderComponent.prototype.platformId;
    /** @type {?} */
    NgImageSliderComponent.prototype.imageSliderService;
    /**
     * @type {?}
     * @private
     */
    NgImageSliderComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWltYWdlLXNsaWRlci8iLCJzb3VyY2VzIjpbImxpYi9uZy1pbWFnZS1zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQVFULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sVUFBVSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFFM0Qsd0JBQXdCLEdBQUcsTUFBTTs7SUFDbkMsd0JBQXdCLEdBQUcsVUFBVTtBQUV6QztJQTZJSSxnQ0FDWSxLQUF3QixFQUNILFVBQWtCLEVBQ3hDLGtCQUF3QyxFQUN2QyxLQUFpQjtJQUN6QixzREFBc0Q7O1FBSjlDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ0gsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXNCO1FBQ3ZDLFVBQUssR0FBTCxLQUFLLENBQVk7O1FBekk3Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0Isd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLHFCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixnQkFBVyxHQUFXLG9CQUFvQixDQUFDO1FBQzNDLFVBQUssR0FBVyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7O1FBQzdDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNu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QW1DOztJQUNuQyw0Q0FBb0M7O0lBaUJwQyx3Q0FBb0M7O0lBOEJwQywrQ0FBd0M7O0lBQ3hDLGdEQUF5Qzs7SUFDekMsOENBQXNDOztJQUN0QyxrREFBMkM7O0lBQzNDLG1EQUEyQzs7SUFHM0MsNENBQWtEOztJQUNsRCw0Q0FBa0Q7O0lBQ2xELG9EQUEwRDs7SUFDMUQsK0NBQXFEOztJQUdyRCw4Q0FBOEI7O0lBQzlCLGtEQUE4Qjs7SUFDOUIsb0RBQStCOzs7OztJQXdCM0IsdUNBQWdDOzs7OztJQUNoQyw0Q0FBK0M7O0lBQy9DLG9EQUErQzs7Ozs7SUFDL0MsdUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBEb0NoZWNrLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgU2ltcGxlQ2hhbmdlLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgT25EZXN0cm95LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld0NoaWxkLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBQTEFURk9STV9JRCxcbiAgICBJbmplY3QsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdJbWFnZVNsaWRlclNlcnZpY2UgfSBmcm9tICcuL25nLWltYWdlLXNsaWRlci5zZXJ2aWNlJztcblxuY29uc3QgTkVYVF9BUlJPV19DTElDS19NRVNTQUdFID0gJ25leHQnLFxuICAgIFBSRVZfQVJST1dfQ0xJQ0tfTUVTU0FHRSA9ICdwcmV2aW91cyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmctaW1hZ2Utc2xpZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctaW1hZ2Utc2xpZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZy1pbWFnZS1zbGlkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE5nSW1hZ2VTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICAvLyBmb3Igc2xpZGVyXG4gICAgc2xpZGVyTWFpbkRpdldpZHRoOiBudW1iZXIgPSAwO1xuICAgIGltYWdlUGFyZW50RGl2V2lkdGg6IG51bWJlciA9IDA7XG4gICAgaW1hZ2VPYmo6IEFycmF5PG9iamVjdD4gPSBbXTtcbiAgICBsaWd0aGJveEltYWdlT2JqOiBBcnJheTxvYmplY3Q+ID0gW107XG4gICAgdG90YWxJbWFnZXM6IG51bWJlciA9IDA7XG4gICAgbGVmdFBvczogbnVtYmVyID0gMDtcbiAgICBlZmZlY3RTdHlsZTogc3RyaW5nID0gJ2FsbCAxcyBlYXNlLWluLW91dCc7XG4gICAgc3BlZWQ6IG51bWJlciA9IDE7IC8vIGRlZmF1bHQgc3BlZWQgaW4gc2Vjb25kXG4gICAgc2xpZGVyUHJldkRpc2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzbGlkZXJOZXh0RGlzYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNsaWRlSW1hZ2VDb3VudDogbnVtYmVyID0gMTtcbiAgICBzbGlkZXJJbWFnZVdpZHRoOiBudW1iZXIgPSAyMDU7XG4gICAgc2xpZGVySW1hZ2VSZWNlaXZlZFdpZHRoOiBudW1iZXIgfCBzdHJpbmcgPSAyMDU7XG4gICAgc2xpZGVySW1hZ2VIZWlnaHQ6IG51bWJlciA9IDIwMDtcbiAgICBzbGlkZXJJbWFnZVJlY2VpdmVkSGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyMDU7XG4gICAgc2xpZGVySW1hZ2VTaXplV2l0aFBhZGRpbmcgPSAyMTE7XG4gICAgYXV0b1NsaWRlQ291bnQ6IG51bWJlciA9IDA7XG4gICAgc3RvcFNsaWRlT25Ib3ZlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgYXV0b1NsaWRlSW50ZXJ2YWw7XG4gICAgc2hvd0Fycm93QnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICB0ZXh0RGlyZWN0aW9uOiBzdHJpbmcgPSAnbHRyJztcbiAgICBpbWFnZU1hcmdpbjogbnVtYmVyID0gMztcblxuICAgIC8vIGZvciBzd2lwZSBldmVudFxuICAgIHByaXZhdGUgc3dpcGVDb29yZD86IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBzd2lwZVRpbWU/OiBudW1iZXI7XG5cbiAgICBAVmlld0NoaWxkKCdzbGlkZXJNYWluJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNsaWRlck1haW47XG4gICAgQFZpZXdDaGlsZCgnaW1hZ2VEaXYnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW1hZ2VEaXY7XG5cbiAgICAvLyBAaW5wdXRzXG4gICAgQElucHV0KClcbiAgICBzZXQgaW1hZ2VTaXplKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGFcbiAgICAgICAgICAgICYmIHR5cGVvZiAoZGF0YSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc3BhY2UnKSAmJiB0eXBlb2YgKGRhdGFbJ3NwYWNlJ10pID09PSAnbnVtYmVyJyAmJiBkYXRhWydzcGFjZSddID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTWFyZ2luID0gZGF0YVsnc3BhY2UnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmICh0eXBlb2YgKGRhdGFbJ3dpZHRoJ10pID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgKGRhdGFbJ3dpZHRoJ10pID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aCA9IGRhdGFbJ3dpZHRoJ107XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zbGlkZXJJbWFnZVNpemVXaXRoUGFkZGluZyA9IGRhdGFbJ3dpZHRoJ10gKyAodGhpcy5pbWFnZU1hcmdpbiAqIDIpOyAvLyBhZGRlaW5nIHBhZGRpbmcgd2l0aCBpbWFnZSB3aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpICYmICh0eXBlb2YgKGRhdGFbJ2hlaWdodCddKSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIChkYXRhWydoZWlnaHQnXSkgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVySW1hZ2VSZWNlaXZlZEhlaWdodCA9IGRhdGFbJ2hlaWdodCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIGluZmluaXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaW1hZ2VQb3B1cDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KClcbiAgICBzZXQgZGlyZWN0aW9uKGRpcjogc3RyaW5nKSB7XG4gICAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dERpcmVjdGlvbiA9IGRpcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKVxuICAgIHNldCBhbmltYXRpb25TcGVlZChkYXRhOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGRhdGFcbiAgICAgICAgICAgICYmIHR5cGVvZiAoZGF0YSkgPT09ICdudW1iZXInXG4gICAgICAgICAgICAmJiBkYXRhID49IDAuMVxuICAgICAgICAgICAgJiYgZGF0YSA8PSA1KSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U3R5bGUgPSBgYWxsICR7dGhpcy5zcGVlZH1zIGVhc2UtaW4tb3V0YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBpbWFnZXM6IEFycmF5PG9iamVjdD4gPSBbXTtcbiAgICBASW5wdXQoKSBzZXQgc2xpZGVJbWFnZShjb3VudCkge1xuICAgICAgICBpZiAoY291bnQgJiYgdHlwZW9mIGNvdW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUltYWdlQ291bnQgPSBNYXRoLnJvdW5kKGNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgYXV0b1NsaWRlKGNvdW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGNvdW50ICYmICh0eXBlb2YgY291bnQgPT09ICdudW1iZXInXG4gICAgICAgICAgICB8fCB0eXBlb2YgY291bnQgPT09ICdib29sZWFuJ1xuICAgICAgICAgICAgfHwgdHlwZW9mIGNvdW50ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY291bnQgPT09ICdudW1iZXInICYmIGNvdW50ID49IDEgJiYgY291bnQgPD0gNSkge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gTWF0aC5yb3VuZChjb3VudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb3VudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY291bnQgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgJiYgY291bnQuaGFzT3duUHJvcGVydHkoJ2ludGVydmFsJylcbiAgICAgICAgICAgICAgICAmJiBNYXRoLnJvdW5kKGNvdW50WydpbnRlcnZhbCddKVxuICAgICAgICAgICAgICAgICYmIE1hdGgucm91bmQoY291bnRbJ2ludGVydmFsJ10pID49IDFcbiAgICAgICAgICAgICAgICAmJiBNYXRoLnJvdW5kKGNvdW50WydpbnRlcnZhbCddKSA8PSA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVPbkhvdmVyID0gY291bnQuaGFzT3duUHJvcGVydHkoJ3N0b3BPbkhvdmVyJykgPyBjb3VudFsnc3RvcE9uSG92ZXInXSA6IHRydWU7XG4gICAgICAgICAgICAgICAgY291bnQgPSBNYXRoLnJvdW5kKGNvdW50WydpbnRlcnZhbCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXV0b1NsaWRlQ291bnQgPSBjb3VudCAqIDEwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgc2V0IHNob3dBcnJvdyhmbGFnKSB7XG4gICAgICAgIGlmIChmbGFnICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZsYWcgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy5zaG93QXJyb3dCdXR0b24gPSBmbGFnO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHZpZGVvQXV0b1BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwYWdpbmF0aW9uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGFycm93S2V5TW92ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgbWFuYWdlSW1hZ2VSYXRpbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dWaWRlb0NvbnRyb2xzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8vIEBPdXRwdXRzXG4gICAgQE91dHB1dCgpIGltYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgYXJyb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBsaWdodGJveEFycm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcbiAgICBAT3V0cHV0KCkgbGlnaHRib3hDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gICAgLy8gZm9yIGxpZ2h0Ym94XG4gICAgbGlndGhib3hTaG93OiBib29sZWFuID0gZmFsc2U7XG4gICAgYWN0aXZlSW1hZ2VJbmRleDogbnVtYmVyID0gLTE7XG4gICAgdmlzaWFibGVJbWFnZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gICAgb25SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTbGlkZXJXaWR0aCgpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXl1cCcsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdhcnJvd3JpZ2h0JyAmJiAhdGhpcy5saWd0aGJveFNob3cgJiYgdGhpcy5hcnJvd0tleU1vdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpID09PSAnYXJyb3dsZWZ0JyAmJiAhdGhpcy5saWd0aGJveFNob3cgJiYgdGhpcy5hcnJvd0tleU1vdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpID09PSAnZXNjYXBlJyAmJiB0aGlzLmxpZ3RoYm94U2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgICAgIHB1YmxpYyBpbWFnZVNsaWRlclNlcnZpY2U6IE5nSW1hZ2VTbGlkZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmXG4gICAgICAgIC8vIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBAVE9ETzogZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fZWxlbWVudFJlZilcblxuICAgICAgICAvLyBmb3Igc2xpZGVyXG4gICAgICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVmZmVjdFN0eWxlID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5sZWZ0UG9zID0gLTEgKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnNsaWRlSW1hZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZU9iai51bnNoaWZ0KHRoaXMuaW1hZ2VPYmpbdGhpcy5pbWFnZU9iai5sZW5ndGggLSBpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3Igc2xpZGVyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNldFNsaWRlcldpZHRoKCk7XG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUF1dG9TbGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9TbGlkZUludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1NsaWRlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxpZ3RoYm94U2hvdyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5pbWFnZXNcbiAgICAgICAgICAgICYmIGNoYW5nZXMuaW1hZ2VzLmhhc093blByb3BlcnR5KCdwcmV2aW91c1ZhbHVlJylcbiAgICAgICAgICAgICYmIGNoYW5nZXMuaW1hZ2VzLmhhc093blByb3BlcnR5KCdjdXJyZW50VmFsdWUnKVxuICAgICAgICAgICAgJiYgY2hhbmdlcy5pbWFnZXMucHJldmlvdXNWYWx1ZSAhPSBjaGFuZ2VzLmltYWdlcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVySW1hZ2VzKGNoYW5nZXMuaW1hZ2VzLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5pbWFnZVNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpemU6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuaW1hZ2VTaXplO1xuICAgICAgICAgICAgaWYgKHNpemVcbiAgICAgICAgICAgICAgICAmJiBzaXplLnByZXZpb3VzVmFsdWVcbiAgICAgICAgICAgICAgICAmJiBzaXplLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgICAgICYmIHNpemUucHJldmlvdXNWYWx1ZS53aWR0aCAmJiBzaXplLnByZXZpb3VzVmFsdWUuaGVpZ2h0XG4gICAgICAgICAgICAgICAgJiYgc2l6ZS5jdXJyZW50VmFsdWUud2lkdGggJiYgc2l6ZS5jdXJyZW50VmFsdWUuaGVpZ2h0XG4gICAgICAgICAgICAgICAgJiYgKHNpemUucHJldmlvdXNWYWx1ZS53aWR0aCAhPT0gc2l6ZS5jdXJyZW50VmFsdWUud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgfHwgc2l6ZS5wcmV2aW91c1ZhbHVlLmhlaWdodCAhPT0gc2l6ZS5jdXJyZW50VmFsdWUuaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyV2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VzXG4gICAgICAgICAgICAmJiB0aGlzLmxpZ3RoYm94SW1hZ2VPYmpcbiAgICAgICAgICAgICYmIHRoaXMuaW1hZ2VzLmxlbmd0aCAhPT0gdGhpcy5saWd0aGJveEltYWdlT2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJJbWFnZXModGhpcy5pbWFnZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2xpZGVySW1hZ2VzKGltZ09iaikge1xuICAgICAgICBpZiAoaW1nT2JqICYmIGltZ09iaiBpbnN0YW5jZW9mIEFycmF5ICYmIGltZ09iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmogPSBpbWdPYmoubWFwKChpbWcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaW1nWydpbmRleCddID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5saWd0aGJveEltYWdlT2JqID0gWy4uLnRoaXMuaW1hZ2VPYmpdO1xuICAgICAgICAgICAgdGhpcy50b3RhbEltYWdlcyA9IHRoaXMuaW1hZ2VPYmoubGVuZ3RoO1xuICAgICAgICAgICAgLy8gdGhpcy5pbWFnZVBhcmVudERpdldpZHRoID0gaW1nT2JqLmxlbmd0aCAqIHRoaXMuc2xpZGVySW1hZ2VTaXplV2l0aFBhZGRpbmc7XG4gICAgICAgICAgICB0aGlzLnNldFNsaWRlcldpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTbGlkZXJXaWR0aCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyTWFpblxuICAgICAgICAgICAgJiYgdGhpcy5zbGlkZXJNYWluLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICYmIHRoaXMuc2xpZGVyTWFpbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlck1haW5EaXZXaWR0aCA9IHRoaXMuc2xpZGVyTWFpbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyTWFpbkRpdldpZHRoXG4gICAgICAgICAgICAmJiB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckltYWdlV2lkdGggPSB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuc2xpZGVySW1hZ2VSZWNlaXZlZFdpZHRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aC5pbmRleE9mKCdweCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJJbWFnZVdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRXaWR0aC5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckltYWdlV2lkdGggPSArKCh0aGlzLnNsaWRlck1haW5EaXZXaWR0aCAqIHBhcnNlRmxvYXQodGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkV2lkdGgpKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlRmxvYXQodGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkV2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVySW1hZ2VXaWR0aCA9IHBhcnNlRmxvYXQodGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkV2lkdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAmJiB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkSGVpZ2h0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVySW1hZ2VIZWlnaHQgPSB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRIZWlnaHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVySW1hZ2VSZWNlaXZlZEhlaWdodC5pbmRleE9mKCdweCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJJbWFnZUhlaWdodCA9IHBhcnNlRmxvYXQodGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2xpZGVySW1hZ2VSZWNlaXZlZEhlaWdodC5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckltYWdlSGVpZ2h0ID0gKygod2luZG93LmlubmVySGVpZ2h0ICogcGFyc2VGbG9hdCh0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRIZWlnaHQpKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlRmxvYXQodGhpcy5zbGlkZXJJbWFnZVJlY2VpdmVkSGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckltYWdlSGVpZ2h0ID0gcGFyc2VGbG9hdCh0aGlzLnNsaWRlckltYWdlUmVjZWl2ZWRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nID0gdGhpcy5zbGlkZXJJbWFnZVdpZHRoICsgKHRoaXMuaW1hZ2VNYXJnaW4gKiAyKTtcbiAgICAgICAgdGhpcy5pbWFnZVBhcmVudERpdldpZHRoID0gdGhpcy5pbWFnZU9iai5sZW5ndGggKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nO1xuICAgICAgICBpZiAodGhpcy5pbWFnZURpdiAmJiB0aGlzLmltYWdlRGl2Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5pbWFnZURpdi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRQb3MgPSB0aGlzLmluZmluaXRlID8gLTEgKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQgOiAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV4dFByZXZTbGlkZXJCdXR0b25EaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgaW1hZ2VPbkNsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSW1hZ2VJbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAodGhpcy5pbWFnZVBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMaWdodGJveCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1hZ2VDbGljay5lbWl0KGluZGV4KTtcbiAgICB9XG5cbiAgICBpbWFnZUF1dG9TbGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUgJiYgdGhpcy5hdXRvU2xpZGVDb3VudCAmJiAhdGhpcy5saWd0aGJveFNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1NsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICB9LCB0aGlzLmF1dG9TbGlkZUNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltYWdlTW91c2VFbnRlckhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZmluaXRlICYmIHRoaXMuYXV0b1NsaWRlQ291bnQgJiYgdGhpcy5hdXRvU2xpZGVJbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9TbGlkZUludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXYoKSB7XG4gICAgICAgIGlmICghdGhpcy5zbGlkZXJQcmV2RGlzYWJsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZmluaXRlUHJldkltZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZJbWcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hcnJvd0NsaWNrLmVtaXQoUFJFVl9BUlJPV19DTElDS19NRVNTQUdFKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQXJyb3dEaXNhYmxlVGVhbSgpO1xuICAgICAgICAgICAgdGhpcy5nZXRWaXNpYWJsZUluZGV4KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2xpZGVyTmV4dERpc2FibGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZpbml0ZU5leHRJbWcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXJyb3dDbGljay5lbWl0KE5FWFRfQVJST1dfQ0xJQ0tfTUVTU0FHRSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlckFycm93RGlzYWJsZVRlYW0oKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VmlzaWFibGVJbmRleCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldkltZygpIHtcbiAgICAgICAgaWYgKDAgPj0gdGhpcy5sZWZ0UG9zICsgKHRoaXMuc2xpZGVySW1hZ2VTaXplV2l0aFBhZGRpbmcgKiB0aGlzLnNsaWRlSW1hZ2VDb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFBvcyArPSB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRQb3MgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dEltZygpIHtcbiAgICAgICAgaWYgKCh0aGlzLmltYWdlUGFyZW50RGl2V2lkdGggKyB0aGlzLmxlZnRQb3MpIC0gdGhpcy5zbGlkZXJNYWluRGl2V2lkdGggPiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFBvcyAtPSB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMuaW1hZ2VQYXJlbnREaXZXaWR0aCArIHRoaXMubGVmdFBvcykgLSB0aGlzLnNsaWRlck1haW5EaXZXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFBvcyAtPSAodGhpcy5pbWFnZVBhcmVudERpdldpZHRoICsgdGhpcy5sZWZ0UG9zKSAtIHRoaXMuc2xpZGVyTWFpbkRpdldpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5maW5pdGVQcmV2SW1nKCkge1xuICAgICAgICB0aGlzLmVmZmVjdFN0eWxlID0gYGFsbCAke3RoaXMuc3BlZWR9cyBlYXNlLWluLW91dGA7XG4gICAgICAgIHRoaXMubGVmdFBvcyA9IDA7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVmZmVjdFN0eWxlID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5sZWZ0UG9zID0gLTEgKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVJbWFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlT2JqLnVuc2hpZnQodGhpcy5pbWFnZU9ialt0aGlzLmltYWdlT2JqLmxlbmd0aCAtIHRoaXMuc2xpZGVJbWFnZUNvdW50IC0gMV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmoucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuc3BlZWQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBpbmZpbml0ZU5leHRJbWcoKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0U3R5bGUgPSBgYWxsICR7dGhpcy5zcGVlZH1zIGVhc2UtaW4tb3V0YDtcbiAgICAgICAgdGhpcy5sZWZ0UG9zID0gLTIgKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RTdHlsZSA9ICdub25lJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUltYWdlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VPYmoucHVzaCh0aGlzLmltYWdlT2JqW3RoaXMuc2xpZGVJbWFnZUNvdW50XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZU9iai5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sZWZ0UG9zID0gLTEgKiB0aGlzLnNsaWRlckltYWdlU2l6ZVdpdGhQYWRkaW5nICogdGhpcy5zbGlkZUltYWdlQ291bnQ7XG4gICAgICAgIH0sIHRoaXMuc3BlZWQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYWJsZUluZGV4KCkge1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBNYXRoLnJvdW5kKChNYXRoLmFicyh0aGlzLmxlZnRQb3MpICsgdGhpcy5zbGlkZXJJbWFnZVdpZHRoKSAvIHRoaXMuc2xpZGVySW1hZ2VXaWR0aCk7XG4gICAgICAgIGlmICh0aGlzLmltYWdlT2JqW2N1cnJlbnRJbmRleCAtIDFdICYmIHRoaXMuaW1hZ2VPYmpbY3VycmVudEluZGV4IC0gMV1bJ2luZGV4J10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52aXNpYWJsZUltYWdlSW5kZXggPSB0aGlzLmltYWdlT2JqW2N1cnJlbnRJbmRleCAtIDFdWydpbmRleCddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBzbGlkZXIgbGVmdC9yaWdodCBhcnJvdyB3aGVuIGltYWdlIG1vdmluZ1xuICAgICAqL1xuICAgIHNsaWRlckFycm93RGlzYWJsZVRlYW0oKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyTmV4dERpc2FibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNsaWRlclByZXZEaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5leHRQcmV2U2xpZGVyQnV0dG9uRGlzYWJsZSgpO1xuICAgICAgICB9LCB0aGlzLnNwZWVkICogMTAwMCk7XG4gICAgfVxuXG4gICAgbmV4dFByZXZTbGlkZXJCdXR0b25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnNsaWRlck5leHREaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2xpZGVyUHJldkRpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZVBhcmVudERpdldpZHRoICsgdGhpcy5sZWZ0UG9zIDw9IHRoaXMuc2xpZGVyTWFpbkRpdldpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJOZXh0RGlzYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRQb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyUHJldkRpc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9yIGxpZ2h0Ym94XG4gICAgc2hvd0xpZ2h0Ym94KCkge1xuICAgICAgICBpZiAodGhpcy5pbWFnZU9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VNb3VzZUVudGVySGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5saWd0aGJveFNob3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMubGlndGhib3hTaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgdGhpcy5saWdodGJveENsb3NlLmVtaXQoKVxuICAgICAgICB0aGlzLmltYWdlQXV0b1NsaWRlKCk7XG4gICAgfVxuXG4gICAgbGlnaHRib3hBcnJvd0NsaWNrSGFuZGxlcihldmVudCkge1xuICAgICAgICB0aGlzLmxpZ2h0Ym94QXJyb3dDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2lwZSBldmVudCBoYW5kbGVyXG4gICAgICogUmVmZXJlbmNlIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ0NTExMDA3LzIwNjc2NDZcbiAgICAgKi9cbiAgICBzd2lwZShlOiBUb3VjaEV2ZW50LCB3aGVuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29vcmQ6IFtudW1iZXIsIG51bWJlcl0gPSBbZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCwgZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWV07XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICBpZiAod2hlbiA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5zd2lwZUNvb3JkID0gY29vcmQ7XG4gICAgICAgICAgICB0aGlzLnN3aXBlVGltZSA9IHRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2hlbiA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFtjb29yZFswXSAtIHRoaXMuc3dpcGVDb29yZFswXSwgY29vcmRbMV0gLSB0aGlzLnN3aXBlQ29vcmRbMV1dO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aW1lIC0gdGhpcy5zd2lwZVRpbWU7XG5cbiAgICAgICAgICAgIGlmIChkdXJhdGlvbiA8IDEwMDAgLy9cbiAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyhkaXJlY3Rpb25bMF0pID4gMzAgLy8gTG9uZyBlbm91Z2hcbiAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyhkaXJlY3Rpb25bMF0pID4gTWF0aC5hYnMoZGlyZWN0aW9uWzFdICogMykpIHsgLy8gSG9yaXpvbnRhbCBlbm91Z2hcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uWzBdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=