(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ng-image-slider', ['exports', '@angular/core', '@angular/common', '@angular/platform-browser'], factory) :
    (global = global || self, factory(global['ng-image-slider'] = {}, global.ng.core, global.ng.common, global.ng.platformBrowser));
}(this, (function (exports, core, common, platformBrowser) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ng-image-slider.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgImageSliderService = /** @class */ (function () {
        function NgImageSliderService() {
        }
        /**
         * @param {?} str
         * @return {?}
         */
        NgImageSliderService.prototype.isBase64 = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            return base64regex.test(str);
        };
        /**
         * @param {?} str
         * @return {?}
         */
        NgImageSliderService.prototype.base64FileExtension = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return str.substring("data:image/".length, str.indexOf(";base64"));
        };
        NgImageSliderService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgImageSliderService.ctorParameters = function () { return []; };
        return NgImageSliderService;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ng-image-slider.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.imageClick = new core.EventEmitter();
            this.arrowClick = new core.EventEmitter();
            this.lightboxArrowClick = new core.EventEmitter();
            this.lightboxClose = new core.EventEmitter();
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
            if (common.isPlatformBrowser(this.platformId)) {
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
            { type: core.Component, args: [{
                        selector: 'ng-image-slider',
                        template: "<div class=\"ng-image-slider\" [ngStyle]=\"{'height':sliderImageHeight+'px'}\">\n    <div class=\"ng-image-slider-container\">\n        <div class=\"main\"\n            [ngStyle]=\"{'height':sliderImageHeight+'px'}\"\n            #sliderMain>\n            <div class=\"main-inner\"\n                *ngIf=\"imageObj.length\"\n                [ngClass]=\"{'with-ng-main-pagination': paginationShow}\"\n                [ngStyle]=\"{'margin-left':leftPos+'px', 'width':imageParentDivWidth+'px', 'transition': effectStyle}\"\n                (touchstart)=\"swipe($event, 'start')\"\n                (touchend)=\"swipe($event, 'end')\">\n                <div *ngFor=\"let img of imageObj; let i = index\"\n                    [ngClass]=\"{'image-popup': imagePopup, 'selected-image': activeImageIndex == i}\"\n                    [ngStyle]=\"{'width':sliderImageWidth+'px', 'margin-left':imageMargin+'px', 'margin-right':imageMargin+'px'}\"\n                    class=\"img-div\"\n                    (click)=\"imageOnClick(img.index)\"\n                    (mouseenter)=\"stopSlideOnHover && imageMouseEnterHandler()\"\n                    (mouseleave)=\"stopSlideOnHover && imageAutoSlide()\"\n                    #imageDiv>\n                    <custom-img [imageUrl]=\"img?.thumbImage || img?.posterImage || img?.video\"\n                        [isVideo]=\"!!(img?.posterImage || img?.video)\"\n                        [alt]=\"img?.alt || img?.title || ''\"\n                        [title]=\"img?.title || img?.alt || ''\"\n                        [direction]=\"textDirection\"\n                        [ratio]=\"manageImageRatio\">\n                    </custom-img>\n                    <div [dir]=\"textDirection\" class=\"caption\" *ngIf=\"img?.title\">{{ img?.title }}</div>\n                </div>\n            </div>\n            <div class=\"ng-image-slider-error\"\n                *ngIf=\"!imageObj.length\">\n                <span class=\"ng-image-slider-loader\"></span>\n            </div>\n            <a *ngIf=\"showArrowButton && imageObj.length > 1\"\n                [ngClass]=\"{'disable': sliderPrevDisable}\"\n                class=\"prev icons prev-icon\"\n                (click)=\"prev()\"\n                (mouseenter)=\"stopSlideOnHover && imageMouseEnterHandler()\"\n                (mouseleave)=\"stopSlideOnHover && imageAutoSlide()\">&lsaquo;</a>\n            <a *ngIf=\"showArrowButton && imageObj.length > 1\"\n                [ngClass]=\"{'disable': sliderNextDisable}\"\n                class=\"next icons next-icon\"\n                (click)=\"next()\"\n                (mouseenter)=\"imageMouseEnterHandler()\"\n                (mouseleave)=\"imageAutoSlide()\">&rsaquo;</a>\n        </div>\n        <div *ngIf=\"imageObj.length && paginationShow\" class=\"ng-main-pagination\">{{visiableImageIndex + 1}} of {{totalImages}}</div>\n    </div>\n</div>\n<div *ngIf=\"ligthboxShow\">\n    <slider-lightbox\n        [paginationShow]=\"paginationShow\"\n        [showVideoControls]=\"showVideoControls\"\n        [arrowKeyMove]=\"arrowKeyMove\"\n        [images]=\"ligthboxImageObj\"\n        [infinite]=\"infinite\"\n        [animationSpeed]=\"speed\"\n        [imageIndex]=\"activeImageIndex\"\n        [show]=\"ligthboxShow\"\n        [direction]=\"textDirection\"\n        [videoAutoPlay]=\"videoAutoPlay\"\n        (prevImage)=\"lightboxArrowClickHandler($event)\"\n        (nextImage)=\"lightboxArrowClickHandler($event)\"\n        (close)=\"close()\">\n    </slider-lightbox>\n</div>",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".ng-image-slider{display:inline-block;position:relative;width:100%}.ng-image-slider .ng-image-slider-container .main{overflow:hidden;position:absolute;height:200px;width:100%}.ng-image-slider .ng-image-slider-container .main .main-inner{width:1760px;padding:0;height:100%}.ng-image-slider .ng-image-slider-container .main .main-inner.with-ng-main-pagination{height:calc(100% - 30px)}.ng-image-slider .ng-image-slider-container .main .main-inner .full-screen{background:url(data:image/png;base64,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) 0 0/40px 40px no-repeat;position:absolute;z-index:8;display:block;height:40px;width:40px;top:4px;right:8px;opacity:.4;transition:.5s ease-in-out;cursor:pointer}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:205px;height:100%;margin-right:3px;margin-left:3px;position:relative;border-radius:5px;display:inline-block;box-shadow:inset 0 0 1px rgba(0,0,0,.24),0 0 2px rgba(0,0,0,.12)}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div.image-popup{cursor:pointer}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div img,.ng-image-slider .ng-image-slider-container .main .main-inner .img-div video{position:absolute;top:0;bottom:0;margin:auto;height:100%;width:100%;left:0;right:0;border-radius:5px}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div img.ratio,.ng-image-slider .ng-image-slider-container .main .main-inner .img-div video.ratio{width:auto;height:auto;max-width:100%;max-height:100%}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div .youtube-icon{background:url(data:image/png;base64,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) center center/140px 80px no-repeat;position:absolute;z-index:6;display:block;height:100%;width:100%;top:0;left:0}.ng-image-slider .ng-image-slider-container .main .main-inner .img-div .caption{position:absolute;bottom:0;padding:5px;color:#fff;background-image:linear-gradient(to right,rgba(0,0,0,.1),rgba(0,0,0,.25),rgba(0,0,0,.5),rgba(0,0,0,.25),rgba(0,0,0,.1));width:100%;text-align:center;box-sizing:border-box;border-radius:0 0 5px 5px}.ng-image-slider .ng-image-slider-container .main .main-inner:hover .full-screen{transition:.5s ease-in-out;opacity:1}.ng-image-slider .ng-image-slider-container .main .next,.ng-image-slider .ng-image-slider-container .main .prev{position:absolute;right:10px;top:50%;background-color:#fff;border-radius:50%;cursor:pointer;margin-top:-16px;outline:0;width:35px;height:35px;font-size:35px;line-height:30px;z-index:8;transition:.5s ease-in-out;text-align:center}.ng-image-slider .ng-image-slider-container .main .next:hover,.ng-image-slider .ng-image-slider-container .main .prev:hover{background-color:#d4cdcd;background-position:-192px -415px}.ng-image-slider .ng-image-slider-container .main .next.disable,.ng-image-slider .ng-image-slider-container .main .prev.disable{color:#bbb;background-color:#fff;opacity:.5;cursor:default}.ng-image-slider .ng-image-slider-container .main .prev{left:10px}.ng-image-slider .ng-image-slider-container .main .prev:hover{background-position:-194px -450px}.ng-image-slider .ng-image-slider-container .ng-main-pagination{background-color:inherit;color:inherit;position:absolute;height:30px;width:calc(100% - 6px);text-align:center;bottom:0;font-size:16px;line-height:30px;border-radius:0 0 5px 5px;margin:0 3px}.ng-image-slider .ng-image-slider-error{height:100%;position:relative;display:flex;justify-content:center;align-items:center}.ng-image-slider .ng-image-slider-error .ng-image-slider-loader{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;background-size:25px 25px;width:25px;height:25px}@media (max-width:1199px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:170px;max-width:100%}}@media (max-width:991px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:297px;max-width:100%}}@media (max-width:768px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:247px;max-width:100%}}@media (max-width:576px){.ng-image-slider .ng-image-slider-container .main .main-inner .img-div{width:350px;max-width:100%}}.ng-image-fullscreen-view{position:fixed;z-index:1031;background-color:rgba(0,0,0,.6);width:100%;height:100%;top:0;overflow:hidden;transition:.5s ease-in-out;left:0;text-align:center}.ng-image-fullscreen-view.image-fullview-hide{display:none!important}.ng-image-fullscreen-view .lightbox-wrapper{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#1f1f1f;transition:.5s;display:flex;justify-content:center;align-items:center}.ng-image-fullscreen-view .lightbox-wrapper.ng-ligthbox-pagination{height:calc(100% - 30px)}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div{width:100%;height:100%;border:1px solid rgba(0,0,0,.35);position:relative;overflow:hidden}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .pre-loader{background-color:inherit;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .pre-loader .mnml-spinner{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main{display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:100%;grid-column-gap:0;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image{width:1299px;height:100%;position:relative}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main{background-image:url(data:image/gif;base64,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);background-repeat:no-repeat;background-position:center center;width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image.ng-image-slider-show{opacity:1;display:block}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image.ng-image-slider-hide{opacity:0;display:none}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main img{transition:.5s ease-in-out;width:auto;height:auto;max-height:100%;max-width:100%;position:absolute;z-index:11;top:0;bottom:0;margin:auto;left:0;right:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main iframe,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .lightbox-image-main .lightbox-image .custom-image-main video{top:0;left:0;right:0;bottom:0;margin:auto;width:100%;height:100%;border:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption{position:absolute;z-index:11;top:0;margin:auto;padding:5px;color:#fff;background-color:rgba(0,0,0,.35);max-width:100%;left:0;right:0}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption.show{display:block}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .caption.hide{display:none}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev{position:absolute;right:10px;top:50%;background-color:#fff;border-radius:50%;cursor:pointer;margin-top:-16px;width:38px;height:38px;font-size:35px;z-index:12;line-height:30px;outline:0;color:#000;transition:.3s ease-in-out}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next:hover,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev:hover{background-color:#d4cdcd}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .next.disable,.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev.disable{color:#bbb;background-color:#fff}.ng-image-fullscreen-view .lightbox-wrapper .lightbox-div .prev{left:10px}.ng-image-fullscreen-view .lightbox-wrapper .close{background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-position:center center;background-size:32px;position:absolute;top:10px;right:10px;color:#000;background-color:#fff;padding:0;opacity:1;border-radius:50%;height:36px;width:36px;z-index:12;cursor:pointer;transition:.2s}.ng-image-fullscreen-view .lightbox-wrapper.error-msg{background-image:none}.ng-image-fullscreen-view .invalid-msg{color:#fff;font-size:18px;position:absolute;top:45%;left:45%}.ng-image-fullscreen-view .popup-pagination{background-color:#1f1f1f;color:#fff;position:absolute;height:30px;width:100%;text-align:center;bottom:0;font-size:16px;line-height:30px}@media (max-width:768px){.ng-image-fullscreen-view .lightbox-wrapper{width:100%;height:100%}.ng-image-fullscreen-view .lightbox-wrapper.error-msg{background-image:none}}"]
                    }] }
        ];
        /** @nocollapse */
        NgImageSliderComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: NgImageSliderService },
            { type: core.ElementRef }
        ]; };
        NgImageSliderComponent.propDecorators = {
            sliderMain: [{ type: core.ViewChild, args: ['sliderMain', { static: false },] }],
            imageDiv: [{ type: core.ViewChild, args: ['imageDiv', { static: false },] }],
            imageSize: [{ type: core.Input }],
            infinite: [{ type: core.Input }],
            imagePopup: [{ type: core.Input }],
            direction: [{ type: core.Input }],
            animationSpeed: [{ type: core.Input }],
            images: [{ type: core.Input }],
            slideImage: [{ type: core.Input }],
            autoSlide: [{ type: core.Input }],
            showArrow: [{ type: core.Input }],
            videoAutoPlay: [{ type: core.Input }],
            paginationShow: [{ type: core.Input }],
            arrowKeyMove: [{ type: core.Input }],
            manageImageRatio: [{ type: core.Input }],
            showVideoControls: [{ type: core.Input }],
            imageClick: [{ type: core.Output }],
            arrowClick: [{ type: core.Output }],
            lightboxArrowClick: [{ type: core.Output }],
            lightboxClose: [{ type: core.Output }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }],
            handleKeyboardEvent: [{ type: core.HostListener, args: ['document:keyup', ['$event'],] }]
        };
        return NgImageSliderComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/slider-custom-image/slider-custom-image.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    /** @type {?} */
    var validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'];
    /** @type {?} */
    var validVideoExtensions = ['mp4'];
    var SliderCustomImageComponent = /** @class */ (function () {
        function SliderCustomImageComponent(imageSliderService, sanitizer, document) {
            this.imageSliderService = imageSliderService;
            this.sanitizer = sanitizer;
            this.YOUTUBE = 'youtube';
            this.IMAGE = 'image';
            this.VIDEO = 'video';
            this.fileUrl = '';
            this.fileExtension = '';
            this.type = this.IMAGE;
            // @inputs
            this.showVideo = false;
            this.videoAutoPlay = false;
            this.showVideoControls = 1;
            this.speed = 1;
            this.isVideo = false;
            this.alt = '';
            this.title = '';
            this.direction = 'ltr';
            this.ratio = false;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        SliderCustomImageComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (this.imageUrl
                && this.imageUrl
                && this.imageUrl
                && typeof (this.imageUrl) === 'string'
                && ((changes.imageUrl && changes.imageUrl.firstChange)
                    ||
                        (this.videoAutoPlay))) {
                this.setUrl();
            }
        };
        /**
         * @return {?}
         */
        SliderCustomImageComponent.prototype.setUrl = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this.imageUrl;
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            this.fileExtension = url.split('.').pop().split(/\#|\?/)[0];
            if (this.imageSliderService.base64FileExtension(url)
                && (validFileExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1
                    || validVideoExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1)) {
                this.fileExtension = this.imageSliderService.base64FileExtension(url);
            }
            // verify for youtube url
            /** @type {?} */
            var match = url.match(youtubeRegExp);
            if (match && match[2].length === 11) {
                if (this.showVideo) {
                    this.type = this.YOUTUBE;
                    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl("" + 'https://www.youtube.com/embed/' + match[2] + (this.videoAutoPlay ? '?autoplay=1&enablejsapi=1' : '?autoplay=0&enablejsapi=1') + '&controls=' + this.showVideoControls);
                }
                else {
                    this.type = this.IMAGE;
                    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://img.youtube.com/vi/" + match[2] + "/0.jpg");
                }
            }
            else if (this.fileExtension && validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.IMAGE;
            }
            else if (this.fileExtension && validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.VIDEO;
                if (this.videoAutoPlay && document.getElementById("video_" + this.imageIndex)) {
                    /** @type {?} */
                    var videoObj_1 = document.getElementById("video_" + this.imageIndex);
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        videoObj_1.play();
                    }), this.speed * 1000);
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderCustomImageComponent.prototype.videoClickHandler = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event && event.srcElement && !this.showVideoControls) {
                if (event.srcElement.paused) {
                    event.srcElement.play();
                }
                else {
                    event.srcElement.pause();
                }
            }
        };
        SliderCustomImageComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'custom-img',
                        template: "<div *ngIf=\"fileUrl\" class=\"custom-image-main\">\n    <img class=\"image\"\n        [ngClass]=\"{'ratio': ratio}\"\n        *ngIf=\"type === IMAGE && fileUrl\"\n        [src]=\"fileUrl\"\n        [alt]=\"alt\"\n        [title]=\"title\">\n    <iframe class=\"youtube\"\n        *ngIf=\"type === YOUTUBE && fileUrl\"\n        [src]=\"fileUrl\"\n        frameborder=\"0\"\n        allow=\"autoplay\"\n        allowfullscreen></iframe>\n    <video class=\"video\"\n        [id]=\"'video_' + imageIndex\"\n        [ngClass]=\"{'ratio': ratio}\"\n        (click)=\"videoClickHandler($event)\"\n        [autoplay]=\"videoAutoPlay\"\n        *ngIf=\"type === VIDEO\"\n        type=\"video/mp4\"\n        [attr.controls]=\"showVideoControls ? showVideoControls : null\"\n        controlsList=\"nodownload\">\n        <source [src]=\"fileUrl\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n    <div [dir]=\"direction\" *ngIf=\"!fileUrl\" class=\"invalid-msg\">Invalid file format</div>\n    <span *ngIf=\"type === YOUTUBE || type === VIDEO || isVideo\" class=\"youtube-icon\"></span>\n</div>"
                    }] }
        ];
        /** @nocollapse */
        SliderCustomImageComponent.ctorParameters = function () { return [
            { type: NgImageSliderService },
            { type: platformBrowser.DomSanitizer },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        SliderCustomImageComponent.propDecorators = {
            showVideo: [{ type: core.Input }],
            videoAutoPlay: [{ type: core.Input }],
            showVideoControls: [{ type: core.Input }],
            currentImageIndex: [{ type: core.Input }],
            imageIndex: [{ type: core.Input }],
            speed: [{ type: core.Input }],
            imageUrl: [{ type: core.Input }],
            isVideo: [{ type: core.Input }],
            alt: [{ type: core.Input }],
            title: [{ type: core.Input }],
            direction: [{ type: core.Input }],
            ratio: [{ type: core.Input }]
        };
        return SliderCustomImageComponent;
    }());
    if (false) {
        /** @type {?} */
        SliderCustomImageComponent.prototype.YOUTUBE;
        /** @type {?} */
        SliderCustomImageComponent.prototype.IMAGE;
        /** @type {?} */
        SliderCustomImageComponent.prototype.VIDEO;
        /** @type {?} */
        SliderCustomImageComponent.prototype.fileUrl;
        /** @type {?} */
        SliderCustomImageComponent.prototype.fileExtension;
        /** @type {?} */
        SliderCustomImageComponent.prototype.type;
        /** @type {?} */
        SliderCustomImageComponent.prototype.showVideo;
        /** @type {?} */
        SliderCustomImageComponent.prototype.videoAutoPlay;
        /** @type {?} */
        SliderCustomImageComponent.prototype.showVideoControls;
        /** @type {?} */
        SliderCustomImageComponent.prototype.currentImageIndex;
        /** @type {?} */
        SliderCustomImageComponent.prototype.imageIndex;
        /** @type {?} */
        SliderCustomImageComponent.prototype.speed;
        /** @type {?} */
        SliderCustomImageComponent.prototype.imageUrl;
        /** @type {?} */
        SliderCustomImageComponent.prototype.isVideo;
        /** @type {?} */
        SliderCustomImageComponent.prototype.alt;
        /** @type {?} */
        SliderCustomImageComponent.prototype.title;
        /** @type {?} */
        SliderCustomImageComponent.prototype.direction;
        /** @type {?} */
        SliderCustomImageComponent.prototype.ratio;
        /** @type {?} */
        SliderCustomImageComponent.prototype.imageSliderService;
        /**
         * @type {?}
         * @private
         */
        SliderCustomImageComponent.prototype.sanitizer;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/slider-lightbox/slider-lightbox.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE = 'lightbox next';
    /** @type {?} */
    var LIGHTBOX_PREV_ARROW_CLICK_MESSAGE = 'lightbox previous';
    var SliderLightboxComponent = /** @class */ (function () {
        function SliderLightboxComponent(cdRef, sanitizer, elRef, document) {
            this.cdRef = cdRef;
            this.sanitizer = sanitizer;
            this.elRef = elRef;
            this.document = document;
            this.totalImages = 0;
            this.nextImageIndex = -1;
            this.popupWidth = 1200;
            this.marginLeft = 0;
            this.imageFullscreenView = false;
            this.lightboxPrevDisable = false;
            this.lightboxNextDisable = false;
            this.showLoading = true;
            this.effectStyle = 'none';
            this.speed = 1; // default speed in second
            // default speed in second
            this.title = '';
            this.currentImageIndex = 0;
            // @Inputs
            this.images = [];
            this.videoAutoPlay = false;
            this.direction = 'ltr';
            this.paginationShow = false;
            this.infinite = false;
            this.arrowKeyMove = true;
            this.showVideoControls = true;
            // @Output
            this.close = new core.EventEmitter();
            this.prevImage = new core.EventEmitter();
            this.nextImage = new core.EventEmitter();
        }
        Object.defineProperty(SliderLightboxComponent.prototype, "imageIndex", {
            set: /**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (index !== undefined && index > -1 && index < this.images.length) {
                    this.currentImageIndex = index;
                }
                this.nextPrevDisable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderLightboxComponent.prototype, "show", {
            set: /**
             * @param {?} visiableFlag
             * @return {?}
             */
            function (visiableFlag) {
                this.imageFullscreenView = visiableFlag;
                this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
                if (visiableFlag === true) {
                    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
                    // this.getImageData();
                    this.setPopupSliderWidth();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderLightboxComponent.prototype, "animationSpeed", {
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
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        SliderLightboxComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.effectStyle = 'none';
            this.setPopupSliderWidth();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderLightboxComponent.prototype.handleKeyboardEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event && event.key && this.arrowKeyMove) {
                if (event.key.toLowerCase() === 'arrowright') {
                    this.nextImageLightbox();
                }
                if (event.key.toLowerCase() === 'arrowleft') {
                    this.prevImageLightbox();
                }
                if (event.key.toLowerCase() === 'escape') {
                    this.closeLightbox();
                }
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.resetState();
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.setPopupSliderWidth = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (window && window.innerWidth) {
                this.popupWidth = window.innerWidth;
                this.totalImages = this.images.length;
                if (typeof (this.currentImageIndex) === 'number' && this.currentImageIndex !== undefined) {
                    this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
                    this.getImageData();
                    this.nextPrevDisable();
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.showLoading = false;
                    }), 500);
                }
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.closeLightbox = /**
         * @return {?}
         */
        function () {
            this.close.emit();
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.prevImageLightbox = /**
         * @return {?}
         */
        function () {
            this.effectStyle = "all " + this.speed + "s ease-in-out";
            if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
                this.currentImageIndex--;
                this.prevImage.emit(LIGHTBOX_PREV_ARROW_CLICK_MESSAGE);
                this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
                this.getImageData();
                this.nextPrevDisable();
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.nextImageLightbox = /**
         * @return {?}
         */
        function () {
            this.effectStyle = "all " + this.speed + "s ease-in-out";
            if (this.currentImageIndex < this.images.length - 1 && !this.lightboxNextDisable) {
                this.currentImageIndex++;
                this.nextImage.emit(LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE);
                this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
                this.getImageData();
                this.nextPrevDisable();
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.nextPrevDisable = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.lightboxNextDisable = true;
            this.lightboxPrevDisable = true;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.applyButtonDisableCondition();
            }), this.speed * 1000);
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.applyButtonDisableCondition = /**
         * @return {?}
         */
        function () {
            this.lightboxNextDisable = false;
            this.lightboxPrevDisable = false;
            if (!this.infinite && this.currentImageIndex >= this.images.length - 1) {
                this.lightboxNextDisable = true;
            }
            if (!this.infinite && this.currentImageIndex <= 0) {
                this.lightboxPrevDisable = true;
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.getImageData = /**
         * @return {?}
         */
        function () {
            if (this.images
                && this.images.length
                && typeof (this.currentImageIndex) === 'number'
                && this.currentImageIndex !== undefined
                && this.images[this.currentImageIndex]
                && (this.images[this.currentImageIndex]['image'] || this.images[this.currentImageIndex]['video'])) {
                this.title = this.images[this.currentImageIndex]['title'] || '';
                this.totalImages = this.images.length;
                for (var iframeI in this.document.getElementsByTagName('iframe')) {
                    if (this.document.getElementsByTagName('iframe')[iframeI]
                        && this.document.getElementsByTagName('iframe')[iframeI].contentWindow
                        && this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage) {
                        this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    }
                }
                for (var videoI in this.document.getElementsByTagName('video')) {
                    if (this.document.getElementsByTagName('video')[videoI] && this.document.getElementsByTagName('video')[videoI].pause) {
                        this.document.getElementsByTagName('video')[videoI].pause();
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        SliderLightboxComponent.prototype.resetState = /**
         * @return {?}
         */
        function () {
            this.images = [];
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
        SliderLightboxComponent.prototype.swipeLightboxImg = /**
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
                this.swipeLightboxImgCoord = coord;
                this.swipeLightboxImgTime = time;
            }
            else if (when === 'end') {
                /** @type {?} */
                var direction = [coord[0] - this.swipeLightboxImgCoord[0], coord[1] - this.swipeLightboxImgCoord[1]];
                /** @type {?} */
                var duration = time - this.swipeLightboxImgTime;
                if (duration < 1000 //
                    && Math.abs(direction[0]) > 30 // Long enough
                    && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                    if (direction[0] < 0) {
                        this.nextImageLightbox();
                    }
                    else {
                        this.prevImageLightbox();
                    }
                }
            }
        };
        SliderLightboxComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'slider-lightbox',
                        template: "<div *ngIf=\"imageFullscreenView\" class=\"ng-image-fullscreen-view\">\n    <div class=\"lightbox-wrapper\">\n        <a class=\"close\" (click)=\"closeLightbox()\"></a>\n        <div class=\"lightbox-div\" #lightboxDiv>\n            <div *ngIf=\"showLoading\" class=\"pre-loader\">\n                <div class=\"mnml-spinner\"></div>\n            </div>\n            <div class=\"lightbox-image-main\"\n                [ngStyle]=\"{'margin-left': marginLeft + 'px', 'grid-template-columns': 'repeat('+images.length+',1fr)', 'transition': effectStyle}\">\n                <div class=\"lightbox-image\"\n                    [ngStyle]=\"{'width': popupWidth + 'px'}\"\n                    *ngFor=\"let img of images; let i = index\"\n                    [attr.id]=\"'ng-lightbox-image-' + i\"\n                    (touchstart)=\"swipeLightboxImg($event, 'start')\"\n                    (touchend)=\"swipeLightboxImg($event, 'end')\"\n                    #lightboxImageDiv>\n                    <custom-img\n                        [imageUrl]=\"img?.image || img?.video\"\n                        [isVideo]=\"!!(img?.posterImage || img?.video)\"\n                        [currentImageIndex]=\"currentImageIndex\"\n                        [imageIndex]=\"i\"\n                        [speed]=\"speed\"\n                        [videoAutoPlay]=\"videoAutoPlay && i == currentImageIndex\"\n                        [showVideoControls]=\"showVideoControls ? 1 : 0\"\n                        [alt]=\"img?.alt || img?.title || ''\"\n                        [title]=\"img?.title || img?.alt || ''\"\n                        [showVideo]=\"true\"\n                        [direction]=\"direction\">\n                    </custom-img>\n                </div>\n            </div>\n            <div [dir]=\"direction\" [ngClass]=\"{'show': title, 'hide': !title}\" class=\"caption\">{{ title }}</div>\n            <a *ngIf=\"images.length > 1\" [ngClass]=\"{'disable': lightboxPrevDisable}\" class=\"prev icons prev-icon\" (click)=\"prevImageLightbox()\">&lsaquo;</a>\n            <a *ngIf=\"images.length > 1\" [ngClass]=\"{'disable': lightboxNextDisable}\" class=\"next icons next-icon\" (click)=\"nextImageLightbox()\">&rsaquo;</a>\n        </div>\n    </div>\n    <div *ngIf=\"paginationShow\" class=\"popup-pagination\">{{currentImageIndex + 1}} of {{totalImages}}</div>\n</div>"
                    }] }
        ];
        /** @nocollapse */
        SliderLightboxComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: platformBrowser.DomSanitizer },
            { type: core.ElementRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        SliderLightboxComponent.propDecorators = {
            lightboxDiv: [{ type: core.ViewChild, args: ['lightboxDiv', { static: false },] }],
            lightboxImageDiv: [{ type: core.ViewChild, args: ['lightboxImageDiv', { static: false },] }],
            images: [{ type: core.Input }],
            imageIndex: [{ type: core.Input }],
            show: [{ type: core.Input }],
            videoAutoPlay: [{ type: core.Input }],
            direction: [{ type: core.Input }],
            paginationShow: [{ type: core.Input }],
            animationSpeed: [{ type: core.Input }],
            infinite: [{ type: core.Input }],
            arrowKeyMove: [{ type: core.Input }],
            showVideoControls: [{ type: core.Input }],
            close: [{ type: core.Output }],
            prevImage: [{ type: core.Output }],
            nextImage: [{ type: core.Output }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }],
            handleKeyboardEvent: [{ type: core.HostListener, args: ['document:keyup', ['$event'],] }]
        };
        return SliderLightboxComponent;
    }());
    if (false) {
        /** @type {?} */
        SliderLightboxComponent.prototype.totalImages;
        /** @type {?} */
        SliderLightboxComponent.prototype.nextImageIndex;
        /** @type {?} */
        SliderLightboxComponent.prototype.popupWidth;
        /** @type {?} */
        SliderLightboxComponent.prototype.marginLeft;
        /** @type {?} */
        SliderLightboxComponent.prototype.imageFullscreenView;
        /** @type {?} */
        SliderLightboxComponent.prototype.lightboxPrevDisable;
        /** @type {?} */
        SliderLightboxComponent.prototype.lightboxNextDisable;
        /** @type {?} */
        SliderLightboxComponent.prototype.showLoading;
        /** @type {?} */
        SliderLightboxComponent.prototype.effectStyle;
        /** @type {?} */
        SliderLightboxComponent.prototype.speed;
        /** @type {?} */
        SliderLightboxComponent.prototype.title;
        /** @type {?} */
        SliderLightboxComponent.prototype.currentImageIndex;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.swipeLightboxImgCoord;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.swipeLightboxImgTime;
        /** @type {?} */
        SliderLightboxComponent.prototype.lightboxDiv;
        /** @type {?} */
        SliderLightboxComponent.prototype.lightboxImageDiv;
        /** @type {?} */
        SliderLightboxComponent.prototype.images;
        /** @type {?} */
        SliderLightboxComponent.prototype.videoAutoPlay;
        /** @type {?} */
        SliderLightboxComponent.prototype.direction;
        /** @type {?} */
        SliderLightboxComponent.prototype.paginationShow;
        /** @type {?} */
        SliderLightboxComponent.prototype.infinite;
        /** @type {?} */
        SliderLightboxComponent.prototype.arrowKeyMove;
        /** @type {?} */
        SliderLightboxComponent.prototype.showVideoControls;
        /** @type {?} */
        SliderLightboxComponent.prototype.close;
        /** @type {?} */
        SliderLightboxComponent.prototype.prevImage;
        /** @type {?} */
        SliderLightboxComponent.prototype.nextImage;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.cdRef;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.sanitizer;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.elRef;
        /**
         * @type {?}
         * @private
         */
        SliderLightboxComponent.prototype.document;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ng-image-slider.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgImageSliderModule = /** @class */ (function () {
        function NgImageSliderModule() {
        }
        NgImageSliderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            NgImageSliderComponent,
                            SliderCustomImageComponent,
                            SliderLightboxComponent
                        ],
                        providers: [
                            NgImageSliderService
                        ],
                        exports: [NgImageSliderComponent]
                    },] }
        ];
        return NgImageSliderModule;
    }());

    exports.NgImageSliderComponent = NgImageSliderComponent;
    exports.NgImageSliderModule = NgImageSliderModule;
    exports.NgImageSliderService = NgImageSliderService;
    exports.ɵa = SliderCustomImageComponent;
    exports.ɵb = SliderLightboxComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-image-slider.umd.js.map
