import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { InjectionToken, Inject, Injectable, Optional, Component, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter, NgZone, ElementRef, PLATFORM_ID, Directive, NgModule, ViewChild, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, of, EMPTY, Subscription, fromEvent, zip } from 'rxjs';
import { delay, filter, switchMap, tap, map, debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/platform-browser';

const _c0 = ["*"];
const _c1 = ["iframe"];
function GalleryImageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 4);
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("background-image", ctx_r0.imageUrl);
    ɵngcc0.ɵɵproperty("@fadeIn", undefined);
} }
function GalleryImageComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 8);
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r3.errorTemplate, ɵngcc0.ɵɵsanitizeHtml);
} }
function GalleryImageComponent_div_3_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "h4");
    ɵngcc0.ɵɵtext(2, "\u26A0");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} }
function GalleryImageComponent_div_3_ng_template_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "h2");
    ɵngcc0.ɵɵtext(1, "\u26A0");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "p");
    ɵngcc0.ɵɵtext(3, "Unable to load the image!");
    ɵngcc0.ɵɵelementEnd();
} }
function GalleryImageComponent_div_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, GalleryImageComponent_div_3_ng_template_2_ng_container_0_Template, 3, 0, "ng-container", 9);
    ɵngcc0.ɵɵtemplate(1, GalleryImageComponent_div_3_ng_template_2_ng_template_1_Template, 4, 0, "ng-template", null, 10, ɵngcc0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r7 = ɵngcc0.ɵɵreference(2);
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r5.isThumbnail)("ngIfElse", _r7);
} }
function GalleryImageComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 5);
    ɵngcc0.ɵɵtemplate(1, GalleryImageComponent_div_3_div_1_Template, 1, 1, "div", 6);
    ɵngcc0.ɵɵtemplate(2, GalleryImageComponent_div_3_ng_template_2_Template, 3, 2, "ng-template", null, 7, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const _r4 = ɵngcc0.ɵɵreference(3);
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.errorTemplate)("ngIfElse", _r4);
} }
function GalleryImageComponent_ng_container_4_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 13);
} if (rf & 2) {
    const ctx_r9 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r9.loaderTemplate, ɵngcc0.ɵɵsanitizeHtml);
} }
function GalleryImageComponent_ng_container_4_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 15);
} }
function GalleryImageComponent_ng_container_4_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, GalleryImageComponent_ng_container_4_ng_template_2_div_0_Template, 1, 0, "div", 14);
} if (rf & 2) {
    const ctx_r11 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r11.isThumbnail);
} }
function GalleryImageComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, GalleryImageComponent_ng_container_4_div_1_Template, 1, 1, "div", 11);
    ɵngcc0.ɵɵtemplate(2, GalleryImageComponent_ng_container_4_ng_template_2_Template, 1, 1, "ng-template", null, 12, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r10 = ɵngcc0.ɵɵreference(3);
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r2.loaderTemplate)("ngIfElse", _r10);
} }
const _c2 = ["video"];
function GalleryVideoComponent_source_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "source", 3);
} if (rf & 2) {
    const src_r2 = ctx.$implicit;
    ɵngcc0.ɵɵpropertyInterpolate("src", src_r2 == null ? null : src_r2.url, ɵngcc0.ɵɵsanitizeUrl);
    ɵngcc0.ɵɵpropertyInterpolate("type", src_r2 == null ? null : src_r2.type);
} }
function GalleryNavComponent_i_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "i", 2);
    ɵngcc0.ɵɵlistener("tapClick", function GalleryNavComponent_i_0_Template_i_tapClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.action.emit("prev"); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHtml", ctx_r0.navIcon, ɵngcc0.ɵɵsanitizeHtml);
} }
function GalleryNavComponent_i_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "i", 3);
    ɵngcc0.ɵɵlistener("tapClick", function GalleryNavComponent_i_1_Template_i_tapClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.action.emit("next"); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHtml", ctx_r1.navIcon, ɵngcc0.ɵɵsanitizeHtml);
} }
function GalleryCoreComponent_gallery_thumbs_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-thumbs", 5);
    ɵngcc0.ɵɵlistener("action", function GalleryCoreComponent_gallery_thumbs_0_Template_gallery_thumbs_action_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.action.emit($event); })("thumbClick", function GalleryCoreComponent_gallery_thumbs_0_Template_gallery_thumbs_thumbClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.thumbClick.emit($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("state", ctx_r0.state)("config", ctx_r0.config);
} }
function GalleryCoreComponent_gallery_nav_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-nav", 6);
    ɵngcc0.ɵɵlistener("action", function GalleryCoreComponent_gallery_nav_3_Template_gallery_nav_action_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.action.emit($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("state", ctx_r1.state)("config", ctx_r1.config);
} }
function GalleryCoreComponent_gallery_dots_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-dots", 6);
    ɵngcc0.ɵɵlistener("action", function GalleryCoreComponent_gallery_dots_4_Template_gallery_dots_action_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.action.emit($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("state", ctx_r2.state)("config", ctx_r2.config);
} }
function GalleryCoreComponent_gallery_counter_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "gallery-counter", 7);
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("state", ctx_r3.state);
} }
function GalleryDotsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵlistener("tapClick", function GalleryDotsComponent_div_0_Template_div_tapClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); const i_r2 = ctx.index; const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.action.emit(i_r2); });
    ɵngcc0.ɵɵelement(1, "div", 2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r2 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("width", ctx_r0.config == null ? null : ctx_r0.config.dotsSize, "px")("height", ctx_r0.config == null ? null : ctx_r0.config.dotsSize, "px");
    ɵngcc0.ɵɵclassProp("g-dot-active", i_r2 === ctx_r0.state.currIndex);
} }
function GalleryThumbsComponent_div_0_gallery_thumb_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-thumb", 4);
    ɵngcc0.ɵɵlistener("tapClick", function GalleryThumbsComponent_div_0_gallery_thumb_2_Template_gallery_thumb_tapClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = ɵngcc0.ɵɵnextContext(2); return ctx_r5.thumbClick.emit(i_r4); })("error", function GalleryThumbsComponent_div_0_gallery_thumb_2_Template_gallery_thumb_error_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.error.emit({ itemIndex: i_r4, error: $event }); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("type", item_r3.type)("config", ctx_r2.config)("data", item_r3.data)("currIndex", ctx_r2.state.currIndex)("index", i_r4)("tapClickDisabled", ctx_r2.config.disableThumb);
} }
function GalleryThumbsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵtemplate(2, GalleryThumbsComponent_div_0_gallery_thumb_2_Template, 1, 6, "gallery-thumb", 3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const sliderState_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("g-no-transition", sliderState_r1.active);
    ɵngcc0.ɵɵproperty("ngStyle", sliderState_r1.style);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.state.items);
} }
function GallerySliderComponent_div_0_gallery_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-item", 4);
    ɵngcc0.ɵɵlistener("tapClick", function GallerySliderComponent_div_0_gallery_item_2_Template_gallery_item_tapClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = ɵngcc0.ɵɵnextContext(2); return ctx_r5.itemClick.emit(i_r4); })("error", function GallerySliderComponent_div_0_gallery_item_2_Template_gallery_item_error_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.error.emit({ itemIndex: i_r4, error: $event }); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("type", item_r3.type)("config", ctx_r2.config)("data", item_r3.data)("currIndex", ctx_r2.state.currIndex)("index", i_r4);
} }
function GallerySliderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵtemplate(2, GallerySliderComponent_div_0_gallery_item_2_Template, 1, 5, "gallery-item", 3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const sliderState_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r0.zoom);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("g-no-transition", sliderState_r1.active);
    ɵngcc0.ɵɵproperty("ngStyle", sliderState_r1.style);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.state.items);
} }
function GalleryItemComponent_ng_container_0_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c3 = function (a0, a1, a2, a3) { return { index: a0, currIndex: a1, type: a2, data: a3 }; };
function GalleryItemComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "gallery-image", 7);
    ɵngcc0.ɵɵlistener("error", function GalleryItemComponent_ng_container_0_ng_container_1_Template_gallery_image_error_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.error.emit($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "div", 8);
    ɵngcc0.ɵɵtemplate(3, GalleryItemComponent_ng_container_0_ng_container_1_ng_container_3_Template, 1, 0, "ng-container", 9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("src", ctx_r1.data.src)("loadingIcon", ctx_r1.config.loadingIcon)("loadingError", ctx_r1.config.loadingError);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.config.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction4(5, _c3, ctx_r1.index, ctx_r1.currIndex, ctx_r1.type, ctx_r1.data));
} }
function GalleryItemComponent_ng_container_0_gallery_video_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "gallery-video", 10);
    ɵngcc0.ɵɵlistener("error", function GalleryItemComponent_ng_container_0_gallery_video_2_Template_gallery_video_error_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); const ctx_r9 = ɵngcc0.ɵɵnextContext(2); return ctx_r9.error.emit($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("src", ctx_r2.data.src)("poster", ctx_r2.data.poster)("pause", ctx_r2.currIndex !== ctx_r2.index);
} }
function GalleryItemComponent_ng_container_0_gallery_iframe_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "gallery-iframe", 11);
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("src", ctx_r3.data.src)("pause", ctx_r3.currIndex !== ctx_r3.index);
} }
function GalleryItemComponent_ng_container_0_gallery_iframe_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "gallery-iframe", 12);
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("src", ctx_r4.data.src);
} }
function GalleryItemComponent_ng_container_0_ng_container_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function GalleryItemComponent_ng_container_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "div", 8);
    ɵngcc0.ɵɵtemplate(2, GalleryItemComponent_ng_container_0_ng_container_5_ng_container_2_Template, 1, 0, "ng-container", 9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r5.config.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction4(2, _c3, ctx_r5.index, ctx_r5.currIndex, ctx_r5.type, ctx_r5.data));
} }
function GalleryItemComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0, 1);
    ɵngcc0.ɵɵtemplate(1, GalleryItemComponent_ng_container_0_ng_container_1_Template, 4, 10, "ng-container", 2);
    ɵngcc0.ɵɵtemplate(2, GalleryItemComponent_ng_container_0_gallery_video_2_Template, 1, 3, "gallery-video", 3);
    ɵngcc0.ɵɵtemplate(3, GalleryItemComponent_ng_container_0_gallery_iframe_3_Template, 1, 2, "gallery-iframe", 4);
    ɵngcc0.ɵɵtemplate(4, GalleryItemComponent_ng_container_0_gallery_iframe_4_Template, 1, 1, "gallery-iframe", 5);
    ɵngcc0.ɵɵtemplate(5, GalleryItemComponent_ng_container_0_ng_container_5_Template, 3, 7, "ng-container", 6);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngSwitch", ctx_r0.type);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", ctx_r0.Types.Image);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", ctx_r0.Types.Video);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", ctx_r0.Types.Youtube);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", ctx_r0.Types.Iframe);
} }
function GalleryThumbComponent_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c4 = function (a0, a1, a2) { return { index: a0, type: a1, data: a2 }; };
function GalleryThumbComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 2);
    ɵngcc0.ɵɵtemplate(1, GalleryThumbComponent_div_1_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.config.thumbTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction3(2, _c4, ctx_r0.index, ctx_r0.type, ctx_r0.data));
} }
const GalleryAction = {
    INITIALIZED: 'initialized',
    ITEMS_CHANGED: 'itemsChanged',
    INDEX_CHANGED: 'indexChanged',
    PLAY: 'play',
    STOP: 'stop',
};
/** @enum {string} */
const ImageSize = {
    Cover: 'cover',
    Contain: 'contain',
};
/** @enum {string} */
const LoadingStrategy = {
    Preload: 'preload',
    Lazy: 'lazy',
    Default: 'default',
};
/** @enum {string} */
const ThumbnailsPosition = {
    Top: 'top',
    Left: 'left',
    Right: 'right',
    Bottom: 'bottom',
};
/** @enum {string} */
const ImageLoaderMode = {
    Determinate: 'determinate',
    Indeterminate: 'indeterminate',
};
/** @enum {string} */
const DotsPosition = {
    Top: 'top',
    Bottom: 'bottom',
};
/** @enum {string} */
const CounterPosition = {
    Top: 'top',
    Bottom: 'bottom',
};
/** @enum {string} */
const ThumbnailsMode = {
    Free: 'free',
    Strict: 'strict',
};
/** @enum {string} */
const SlidingDirection = {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
};
/** @enum {string} */
const GalleryItemType = {
    Image: 'image',
    Video: 'video',
    Youtube: 'youtube',
    Iframe: 'iframe',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Initial state
 * @type {?}
 */
const defaultState = {
    action: GalleryAction.INITIALIZED,
    isPlaying: false,
    hasNext: false,
    hasPrev: false,
    currIndex: 0,
    items: []
};
/** @type {?} */
const defaultConfig = {
    nav: true,
    loop: true,
    zoomOut: 0,
    dots: false,
    thumb: true,
    dotsSize: 30,
    counter: true,
    gestures: true,
    autoPlay: false,
    thumbWidth: 120,
    thumbHeight: 90,
    panSensitivity: 25,
    disableThumb: false,
    playerInterval: 3000,
    imageSize: ImageSize.Contain,
    thumbMode: ThumbnailsMode.Strict,
    dotsPosition: DotsPosition.Bottom,
    counterPosition: CounterPosition.Top,
    thumbPosition: ThumbnailsPosition.Bottom,
    loadingStrategy: LoadingStrategy.Default,
    slidingDirection: SlidingDirection.Horizontal,
    navIcon: `<?xml version="1.0" encoding="UTF-8"?><svg width="512px" height="512px" enable-background="new 0 0 240.823 240.823" version="1.1" viewBox="0 0 240.823 240.823" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z" fill="#fff"/></svg>`,
    loadingIcon: `<?xml version="1.0" encoding="UTF-8"?><svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>`
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageItem {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Image;
    }
}
class VideoItem {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Video;
    }
}
class IframeItem {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Iframe;
    }
}
class YoutubeItem {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = {
            src: `//youtube.com/embed/${data.src}?wmode=transparent`,
            thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${data.src}/default.jpg`
        };
        this.type = GalleryItemType.Youtube;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const filterActions = (actions) => {
    return filter((state) => actions.indexOf(state.action) > -1);
};
class GalleryRef {
    /**
     * @param {?} config
     * @param {?} deleteInstance
     */
    constructor(config, deleteInstance) {
        this.deleteInstance = deleteInstance;
        /**
         * Stream that emits on item click
         */
        this.itemClick = new Subject();
        /**
         * Stream that emits on thumbnail click
         */
        this.thumbClick = new Subject();
        /**
         * Stream that emits on an error occurs
         */
        this.error = new Subject();
        this._state = new BehaviorSubject(defaultState);
        this._config = new BehaviorSubject(config);
        this.state = this._state.asObservable();
        this.config = this._config.asObservable();
    }
    /**
     * Stream that emits when gallery is initialized/reset
     * @return {?}
     */
    get initialized() {
        return this.state.pipe(filterActions([GalleryAction.INITIALIZED]));
    }
    /**
     * Stream that emits when items is changed (items loaded, item added, item removed)
     * @return {?}
     */
    get itemsChanged() {
        return this.state.pipe(filterActions([GalleryAction.ITEMS_CHANGED]));
    }
    /**
     * Stream that emits when current item is changed
     * @return {?}
     */
    get indexChanged() {
        return this.state.pipe(filterActions([GalleryAction.INDEX_CHANGED]));
    }
    /**
     * Stream that emits when the player should start or stop
     * @return {?}
     */
    get playingChanged() {
        return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP]));
    }
    /**
     * Stream that emits when the player should start or stop
     * @private
     * @return {?}
     */
    get playerActions() {
        return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP, GalleryAction.INDEX_CHANGED]));
    }
    /**
     * Activate player actions listener
     * @return {?}
     */
    activatePlayer() {
        return this.playerActions.pipe(switchMap((e) => e.isPlaying ? of({}).pipe(delay(this._config.value.playerInterval), tap(() => this.next())) : EMPTY));
    }
    /**
     * Set gallery state
     * @private
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this._state.next(Object.assign({}, this._state.value, state));
    }
    /**
     * Set gallery config
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        this._config.next(Object.assign({}, this._config.value, config));
    }
    /**
     * Add gallery item
     * @param {?} item - Gallery item object
     * @param {?=} active - Set the new item as current slide
     * @return {?}
     */
    add(item, active) {
        /** @type {?} */
        const items = [...this._state.value.items, item];
        this.setState({
            action: GalleryAction.ITEMS_CHANGED,
            items: items,
            hasNext: items.length > 1,
            currIndex: active ? items.length - 1 : this._state.value.currIndex
        });
    }
    /**
     * Add image item
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addImage(data, active) {
        this.add(new ImageItem(data), active);
    }
    /**
     * Add video item
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addVideo(data, active) {
        this.add(new VideoItem(data), active);
    }
    /**
     * Add iframe item
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addIframe(data, active) {
        this.add(new IframeItem(data), active);
    }
    /**
     * Add youtube item
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addYoutube(data, active) {
        this.add(new YoutubeItem(data), active);
    }
    /**
     * Remove gallery item
     * @param {?} i - Item index
     * @return {?}
     */
    remove(i) {
        /** @type {?} */
        const items = [
            ...this._state.value.items.slice(0, i),
            ...this._state.value.items.slice(i + 1, this._state.value.items.length)
        ];
        this.setState({
            action: GalleryAction.ITEMS_CHANGED,
            items: items,
            hasNext: items.length > 1,
            hasPrev: i > 0
        });
    }
    /**
     * Load items and reset the state
     * @param {?} items - Gallery images data
     * @return {?}
     */
    load(items) {
        if (items) {
            this.setState({
                action: GalleryAction.ITEMS_CHANGED,
                items: items,
                hasNext: items.length > 1,
                hasPrev: false
            });
        }
    }
    /**
     * Set active item
     * @param {?} i - Active Index
     * @return {?}
     */
    set(i) {
        if (i !== this._state.value.currIndex) {
            this.setState({
                action: GalleryAction.INDEX_CHANGED,
                currIndex: i,
                hasNext: i < this._state.value.items.length - 1,
                hasPrev: i > 0
            });
        }
    }
    /**
     * Next item
     * @return {?}
     */
    next() {
        if (this._state.value.hasNext) {
            this.set(this._state.value.currIndex + 1);
        }
        else if (this._config.value.loop) {
            this.set(0);
        }
    }
    /**
     * Prev item
     * @return {?}
     */
    prev() {
        if (this._state.value.hasPrev) {
            this.set(this._state.value.currIndex - 1);
        }
        else if (this._config.value.loop) {
            this.set(this._state.value.items.length - 1);
        }
    }
    /**
     * Start gallery player
     * @param {?=} interval
     * @return {?}
     */
    play(interval) {
        if (interval) {
            this.setConfig({ playerInterval: interval });
        }
        this.setState({ action: GalleryAction.PLAY, isPlaying: true });
    }
    /**
     * Stop gallery player
     * @return {?}
     */
    stop() {
        this.setState({ action: GalleryAction.STOP, isPlaying: false });
    }
    /**
     * Reset gallery to initial state
     * @return {?}
     */
    reset() {
        this.setState(defaultState);
    }
    /**
     * Destroy gallery
     * @return {?}
     */
    destroy() {
        this._state.complete();
        this._config.complete();
        this.itemClick.complete();
        this.thumbClick.complete();
        this.deleteInstance();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const GALLERY_CONFIG = new InjectionToken('galleryConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Gallery {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Store gallery instances
         */
        this._instances = new Map();
        this.config = config ? Object.assign({}, defaultConfig, config) : defaultConfig;
    }
    /**
     * Get or create gallery by ID
     * @param {?=} id
     * @param {?=} config
     * @return {?}
     */
    ref(id = 'root', config) {
        if (this._instances.has(id)) {
            /** @type {?} */
            const galleryRef = this._instances.get(id);
            if (config) {
                galleryRef.setConfig(Object.assign({}, this.config, config));
            }
            return galleryRef;
        }
        else {
            return this._instances.set(id, new GalleryRef(Object.assign({}, this.config, config), this.deleteInstance(id))).get(id);
        }
    }
    /**
     * Destroy all gallery instances
     * @return {?}
     */
    destroyAll() {
        this._instances.forEach((ref) => ref.destroy());
    }
    /**
     * Reset all gallery instances
     * @return {?}
     */
    resetAll() {
        this._instances.forEach((ref) => ref.reset());
    }
    /**
     * A destroyer function for each gallery instance
     * @private
     * @param {?} id
     * @return {?}
     */
    deleteInstance(id) {
        return () => {
            if (this._instances.has(id)) {
                this._instances.delete(id);
            }
        };
    }
}
Gallery.ɵfac = function Gallery_Factory(t) { return new (t || Gallery)(ɵngcc0.ɵɵinject(GALLERY_CONFIG, 8)); };
Gallery.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Gallery, factory: Gallery.ɵfac, providedIn: 'root' });
/** @nocollapse */
Gallery.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GALLERY_CONFIG,] }] }
];
/** @nocollapse */ Gallery.ngInjectableDef = defineInjectable({ factory: function Gallery_Factory() { return new Gallery(inject(GALLERY_CONFIG, 8)); }, token: Gallery, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(Gallery, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [GALLERY_CONFIG]
            }] }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryComponent {
    /**
     * @param {?} _gallery
     */
    constructor(_gallery) {
        this._gallery = _gallery;
        this.nav = this._gallery.config.nav;
        this.dots = this._gallery.config.dots;
        this.loop = this._gallery.config.loop;
        this.thumb = this._gallery.config.thumb;
        this.zoomOut = this._gallery.config.zoomOut;
        this.counter = this._gallery.config.counter;
        this.dotsSize = this._gallery.config.dotsSize;
        this.autoPlay = this._gallery.config.autoPlay;
        this.gestures = this._gallery.config.gestures;
        this.thumbWidth = this._gallery.config.thumbWidth;
        this.thumbHeight = this._gallery.config.thumbHeight;
        this.disableThumb = this._gallery.config.disableThumb;
        this.panSensitivity = this._gallery.config.panSensitivity;
        this.playerInterval = this._gallery.config.playerInterval;
        this.itemTemplate = this._gallery.config.itemTemplate;
        this.thumbTemplate = this._gallery.config.thumbTemplate;
        this.thumbMode = this._gallery.config.thumbMode;
        this.imageSize = this._gallery.config.imageSize;
        this.dotsPosition = this._gallery.config.dotsPosition;
        this.counterPosition = this._gallery.config.counterPosition;
        this.slidingDirection = this._gallery.config.slidingDirection;
        this.loadingStrategy = this._gallery.config.loadingStrategy;
        this.thumbPosition = this._gallery.config.thumbPosition;
        // Inputs used by the lightbox
        /**
         * Destroy gallery ref on component destroy event
         */
        this.destroyRef = true;
        /**
         * Skip initializing the config with components inputs (Lightbox mode)
         */
        this.skipInitConfig = false;
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.playingChange = new EventEmitter();
        this.indexChange = new EventEmitter();
        this.itemsChange = new EventEmitter();
        this.error = new EventEmitter();
        this._itemClick$ = Subscription.EMPTY;
        this._thumbClick$ = Subscription.EMPTY;
        this._itemChange$ = Subscription.EMPTY;
        this._indexChange$ = Subscription.EMPTY;
        this._playingChange$ = Subscription.EMPTY;
        this._playerListener$ = Subscription.EMPTY;
    }
    /**
     * @private
     * @return {?}
     */
    getConfig() {
        return {
            nav: this.nav,
            dots: this.dots,
            loop: this.loop,
            thumb: this.thumb,
            zoomOut: this.zoomOut,
            counter: this.counter,
            autoPlay: this.autoPlay,
            gestures: this.gestures,
            dotsSize: this.dotsSize,
            imageSize: this.imageSize,
            thumbMode: this.thumbMode,
            thumbWidth: this.thumbWidth,
            thumbHeight: this.thumbHeight,
            disableThumb: this.disableThumb,
            dotsPosition: this.dotsPosition,
            itemTemplate: this.itemTemplate,
            thumbTemplate: this.thumbTemplate,
            thumbPosition: this.thumbPosition,
            panSensitivity: this.panSensitivity,
            playerInterval: this.playerInterval,
            counterPosition: this.counterPosition,
            loadingStrategy: this.loadingStrategy,
            slidingDirection: this.slidingDirection
        };
    }
    /**
     * @param {?} i
     * @return {?}
     */
    onAction(i) {
        switch (i) {
            case 'next':
                this.galleryRef.next();
                break;
            case 'prev':
                this.galleryRef.prev();
                break;
            default:
                this.galleryRef.set((/** @type {?} */ (i)));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.galleryRef) {
            this.galleryRef.setConfig(this.getConfig());
            if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
                this.load(this.items);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Get gallery instance by id
        if (this.skipInitConfig) {
            this.galleryRef = this._gallery.ref(this.id);
        }
        else {
            this.galleryRef = this._gallery.ref(this.id, this.getConfig());
        }
        // Load gallery items
        this.load(this.items);
        // Activate player listener
        this._playerListener$ = this.galleryRef.activatePlayer().subscribe();
        // Subscribes to events on demand
        if (this.indexChange.observers.length) {
            this._indexChange$ = this.galleryRef.indexChanged.subscribe((state) => this.indexChange.emit(state));
        }
        if (this.itemsChange.observers.length) {
            this._itemChange$ = this.galleryRef.itemsChanged.subscribe((state) => this.itemsChange.emit(state));
        }
        if (this.playingChange.observers.length) {
            this._playingChange$ = this.galleryRef.playingChanged.subscribe((state) => this.playingChange.emit(state));
        }
        // Start playing if auto-play is set to true
        if (this.autoPlay) {
            this.play();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._itemClick$.unsubscribe();
        this._thumbClick$.unsubscribe();
        this._itemChange$.unsubscribe();
        this._indexChange$.unsubscribe();
        this._playingChange$.unsubscribe();
        this._playerListener$.unsubscribe();
        if (this.destroyRef) {
            this.galleryRef.destroy();
        }
    }
    /**
     * @param {?} i
     * @return {?}
     */
    onItemClick(i) {
        this.itemClick.emit(i);
        this.galleryRef.itemClick.next(i);
    }
    /**
     * @param {?} i
     * @return {?}
     */
    onThumbClick(i) {
        this.galleryRef.set(i);
        this.thumbClick.emit(i);
        this.galleryRef.thumbClick.next(i);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    onError(err) {
        this.error.emit(err);
        this.galleryRef.error.next(err);
    }
    /**
     * @param {?} items
     * @return {?}
     */
    load(items) {
        this.galleryRef.load(items);
    }
    /**
     * @param {?} item
     * @param {?=} active
     * @return {?}
     */
    add(item, active) {
        this.galleryRef.add(item, active);
    }
    /**
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addImage(data, active) {
        this.add(new ImageItem(data), active);
    }
    /**
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addVideo(data, active) {
        this.add(new VideoItem(data), active);
    }
    /**
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addIframe(data, active) {
        this.add(new IframeItem(data), active);
    }
    /**
     * @param {?} data
     * @param {?=} active
     * @return {?}
     */
    addYoutube(data, active) {
        this.add(new YoutubeItem(data), active);
    }
    /**
     * @param {?} i
     * @return {?}
     */
    remove(i) {
        this.galleryRef.remove(i);
    }
    /**
     * @return {?}
     */
    next() {
        this.galleryRef.next();
    }
    /**
     * @return {?}
     */
    prev() {
        this.galleryRef.prev();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    set(i) {
        this.galleryRef.set(i);
    }
    /**
     * @return {?}
     */
    reset() {
        this.galleryRef.reset();
    }
    /**
     * @param {?=} interval
     * @return {?}
     */
    play(interval) {
        this.galleryRef.play(interval);
    }
    /**
     * @return {?}
     */
    stop() {
        this.galleryRef.stop();
    }
}
GalleryComponent.ɵfac = function GalleryComponent_Factory(t) { return new (t || GalleryComponent)(ɵngcc0.ɵɵdirectiveInject(Gallery)); };
GalleryComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryComponent, selectors: [["gallery"]], inputs: { nav: "nav", dots: "dots", loop: "loop", thumb: "thumb", zoomOut: "zoomOut", counter: "counter", dotsSize: "dotsSize", autoPlay: "autoPlay", gestures: "gestures", thumbWidth: "thumbWidth", thumbHeight: "thumbHeight", disableThumb: "disableThumb", panSensitivity: "panSensitivity", playerInterval: "playerInterval", itemTemplate: "itemTemplate", thumbTemplate: "thumbTemplate", thumbMode: "thumbMode", imageSize: "imageSize", dotsPosition: "dotsPosition", counterPosition: "counterPosition", slidingDirection: "slidingDirection", loadingStrategy: "loadingStrategy", thumbPosition: "thumbPosition", destroyRef: "destroyRef", skipInitConfig: "skipInitConfig", id: "id", items: "items" }, outputs: { itemClick: "itemClick", thumbClick: "thumbClick", playingChange: "playingChange", indexChange: "indexChange", itemsChange: "itemsChange", error: "error" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 4, vars: 6, consts: [[3, "state", "config", "action", "itemClick", "thumbClick", "error"]], template: function GalleryComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "gallery-core", 0);
        ɵngcc0.ɵɵlistener("action", function GalleryComponent_Template_gallery_core_action_0_listener($event) { return ctx.onAction($event); })("itemClick", function GalleryComponent_Template_gallery_core_itemClick_0_listener($event) { return ctx.onItemClick($event); })("thumbClick", function GalleryComponent_Template_gallery_core_thumbClick_0_listener($event) { return ctx.onThumbClick($event); })("error", function GalleryComponent_Template_gallery_core_error_0_listener($event) { return ctx.onError($event); });
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵpipe(2, "async");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵprojection(3);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("state", ɵngcc0.ɵɵpipeBind1(1, 2, ctx.galleryRef.state))("config", ɵngcc0.ɵɵpipeBind1(2, 4, ctx.galleryRef.config));
    } }, directives: function () { return [GalleryCoreComponent]; }, pipes: function () { return [ɵngcc1.AsyncPipe]; }, styles: ["gallery-core[dotsPosition=top] gallery-dots{top:0}  gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}  gallery-dots{margin:7px;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}  .g-dot{cursor:pointer;z-index:20}  .g-dot:hover .g-dot-inner{opacity:1}  .g-dot-active .g-dot-inner{opacity:1;-webkit-transform:scale(1.5)!important;transform:scale(1.5)!important}  .g-dot-inner{background-color:#fff;opacity:.6;width:30%;height:30%;border-radius:50%;box-shadow:0 0 1px #000;transition:.2s}  .g-dot,   .g-dot-inner,   gallery-dots{display:flex;justify-content:center;align-items:center}  .g-nav-next,   .g-nav-prev{position:absolute;top:50%;width:30px;height:40px;cursor:pointer;z-index:999}  .g-nav-next{right:.5em;-webkit-transform:translateY(-50%) perspective(1px);transform:translateY(-50%) perspective(1px)}  .g-nav-prev{left:.5em;-webkit-transform:translateY(-50%) perspective(1px) scale(-1,-1);transform:translateY(-50%) perspective(1px) scale(-1,-1)}@media only screen and (max-width:480px){  .g-nav-next{right:.2em}  .g-nav-prev{left:.2em}}  .g-items-container{height:100%}  .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1);transition:transform .4s cubic-bezier(.5,0,.5,1),-webkit-transform .4s cubic-bezier(.5,0,.5,1)}  gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}  gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}  gallery-thumbs{display:block;z-index:1;overflow:unset}  .g-thumbs-container{position:relative;z-index:206;width:100%;height:100%;left:0;top:0;display:flex;overflow:unset}  gallery-core[disableThumb=true] gallery-thumb{cursor:default}  gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,   gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;top:0;left:50%}  gallery-core[thumbPosition=bottom] gallery-thumb,   gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}  gallery-core[thumbPosition=left] gallery-thumbs .g-slider,   gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;top:50%;left:0}  gallery-core[thumbPosition=left] gallery-thumb,   gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}  gallery-core[thumbPosition=top]{flex-direction:column}  gallery-core[thumbPosition=left]{flex-direction:row}  gallery-core[thumbPosition=right]{flex-direction:row-reverse}  gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}  gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}  .g-thumb-loading{position:relative;overflow:hidden;height:100%;background-color:#262626}  .g-thumb-loading::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:50%;z-index:1;width:500%;margin-left:-250%;-webkit-animation:.8s linear infinite phAnimation;animation:.8s linear infinite phAnimation;background:linear-gradient(to right,rgba(255,255,255,0) 46%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 54%) 50% 50%}@-webkit-keyframes phAnimation{0%{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}100%{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}100%{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}}  gallery-core[counterPosition=top] .g-counter{top:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px}  gallery-core[counterPosition=bottom] .g-counter{bottom:0;border-top-left-radius:4px;border-top-right-radius:4px}  .g-counter{z-index:50;position:absolute;left:50%;-webkit-transform:translateX(-50%) perspective(1px);transform:translateX(-50%) perspective(1px);font-size:12px;padding:4px 10px;color:#fff;background-color:rgba(0,0,0,.5)}  gallery[gallerize] gallery-item{cursor:pointer}  gallery-item,   gallery-thumb{position:relative;height:100%;width:100%;display:block;overflow:hidden}  gallery-item h2,   gallery-item h4,   gallery-thumb h2,   gallery-thumb h4{color:coral;margin:0}  gallery-item h2,   gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}  gallery-item h4,   gallery-thumb h4{font-size:1.6em}  gallery-item{z-index:10}  gallery-item iframe,   gallery-item video{position:absolute;width:100%;height:100%}  gallery-thumb{opacity:.5;cursor:pointer;transition:opacity .3s cubic-bezier(.5,0,.5,1)}  gallery-thumb.g-active-thumb{opacity:1}  .g-image-item{background-position:center center;background-repeat:no-repeat;background-size:cover;width:100%;height:100%}  .g-image-error-message,   .g-template{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column}  .g-loading{position:absolute;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);left:50%;top:50%;width:80px;height:80px}  gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}  gallery-image{display:flex;justify-content:center;align-items:center;height:100%}  gallery{position:relative;z-index:1;overflow:hidden;display:block;height:500px;background-color:#000}  gallery *{box-sizing:border-box}  gallery,   gallery-core{position:relative;overflow:hidden}  .g-box,   .g-slider,   gallery-core{display:flex;height:100%;width:100%}  gallery[fluid]{-webkit-transform:translateX(-50vw);transform:translateX(-50vw);width:100vw;left:50%}  gallery[fluid][fluid=false]{-webkit-transform:none;transform:none;width:initial;left:initial}  .g-no-transition{transition:unset!important}  .g-box,   gallery-slider{overflow:hidden;position:relative;display:flex;flex-direction:column;flex:1;order:1;height:100%}  .g-btn-close svg,   gallery-nav svg{width:100%;height:100%;-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px #000);transition:opacity .2s linear;opacity:.6}  .g-btn-close svg:hover,   gallery-nav svg:hover{opacity:1}"], changeDetection: 0 });
/** @nocollapse */
GalleryComponent.ctorParameters = () => [
    { type: Gallery }
];
GalleryComponent.propDecorators = {
    id: [{ type: Input }],
    items: [{ type: Input }],
    nav: [{ type: Input }],
    dots: [{ type: Input }],
    loop: [{ type: Input }],
    thumb: [{ type: Input }],
    zoomOut: [{ type: Input }],
    counter: [{ type: Input }],
    dotsSize: [{ type: Input }],
    autoPlay: [{ type: Input }],
    gestures: [{ type: Input }],
    thumbWidth: [{ type: Input }],
    thumbHeight: [{ type: Input }],
    disableThumb: [{ type: Input }],
    panSensitivity: [{ type: Input }],
    playerInterval: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    thumbTemplate: [{ type: Input }],
    thumbMode: [{ type: Input }],
    imageSize: [{ type: Input }],
    dotsPosition: [{ type: Input }],
    counterPosition: [{ type: Input }],
    slidingDirection: [{ type: Input }],
    loadingStrategy: [{ type: Input }],
    thumbPosition: [{ type: Input }],
    destroyRef: [{ type: Input }],
    skipInitConfig: [{ type: Input }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    playingChange: [{ type: Output }],
    indexChange: [{ type: Output }],
    itemsChange: [{ type: Output }],
    error: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryComponent, [{
        type: Component,
        args: [{
                selector: 'gallery',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-core [state]="galleryRef.state | async"
                  [config]="galleryRef.config | async"
                  (action)="onAction($event)"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"
                  (error)="onError($event)"></gallery-core>
    <ng-content></ng-content>
  `,
                styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{margin:7px;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;-webkit-transform:scale(1.5)!important;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;opacity:.6;width:30%;height:30%;border-radius:50%;box-shadow:0 0 1px #000;transition:.2s}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{display:flex;justify-content:center;align-items:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{position:absolute;top:50%;width:30px;height:40px;cursor:pointer;z-index:999}::ng-deep .g-nav-next{right:.5em;-webkit-transform:translateY(-50%) perspective(1px);transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;-webkit-transform:translateY(-50%) perspective(1px) scale(-1,-1);transform:translateY(-50%) perspective(1px) scale(-1,-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1);transition:transform .4s cubic-bezier(.5,0,.5,1),-webkit-transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;z-index:1;overflow:unset}::ng-deep .g-thumbs-container{position:relative;z-index:206;width:100%;height:100%;left:0;top:0;display:flex;overflow:unset}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;top:0;left:50%}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;top:50%;left:0}::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{position:relative;overflow:hidden;height:100%;background-color:#262626}::ng-deep .g-thumb-loading::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:50%;z-index:1;width:500%;margin-left:-250%;-webkit-animation:.8s linear infinite phAnimation;animation:.8s linear infinite phAnimation;background:linear-gradient(to right,rgba(255,255,255,0) 46%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 54%) 50% 50%}@-webkit-keyframes phAnimation{0%{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}100%{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}100%{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{top:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px}::ng-deep gallery-core[counterPosition=bottom] .g-counter{bottom:0;border-top-left-radius:4px;border-top-right-radius:4px}::ng-deep .g-counter{z-index:50;position:absolute;left:50%;-webkit-transform:translateX(-50%) perspective(1px);transform:translateX(-50%) perspective(1px);font-size:12px;padding:4px 10px;color:#fff;background-color:rgba(0,0,0,.5)}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{position:relative;height:100%;width:100%;display:block;overflow:hidden}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{position:absolute;width:100%;height:100%}::ng-deep gallery-thumb{opacity:.5;cursor:pointer;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:center center;background-repeat:no-repeat;background-size:cover;width:100%;height:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column}::ng-deep .g-loading{position:absolute;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);left:50%;top:50%;width:80px;height:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{display:flex;justify-content:center;align-items:center;height:100%}::ng-deep gallery{position:relative;z-index:1;overflow:hidden;display:block;height:500px;background-color:#000}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{position:relative;overflow:hidden}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{-webkit-transform:translateX(-50vw);transform:translateX(-50vw);width:100vw;left:50%}::ng-deep gallery[fluid][fluid=false]{-webkit-transform:none;transform:none;width:initial;left:initial}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{overflow:hidden;position:relative;display:flex;flex-direction:column;flex:1;order:1;height:100%}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{width:100%;height:100%;-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px #000);transition:opacity .2s linear;opacity:.6}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
            }]
    }], function () { return [{ type: Gallery }]; }, { nav: [{
            type: Input
        }], dots: [{
            type: Input
        }], loop: [{
            type: Input
        }], thumb: [{
            type: Input
        }], zoomOut: [{
            type: Input
        }], counter: [{
            type: Input
        }], dotsSize: [{
            type: Input
        }], autoPlay: [{
            type: Input
        }], gestures: [{
            type: Input
        }], thumbWidth: [{
            type: Input
        }], thumbHeight: [{
            type: Input
        }], disableThumb: [{
            type: Input
        }], panSensitivity: [{
            type: Input
        }], playerInterval: [{
            type: Input
        }], itemTemplate: [{
            type: Input
        }], thumbTemplate: [{
            type: Input
        }], thumbMode: [{
            type: Input
        }], imageSize: [{
            type: Input
        }], dotsPosition: [{
            type: Input
        }], counterPosition: [{
            type: Input
        }], slidingDirection: [{
            type: Input
        }], loadingStrategy: [{
            type: Input
        }], thumbPosition: [{
            type: Input
        }], destroyRef: [{
            type: Input
        }], skipInitConfig: [{
            type: Input
        }], itemClick: [{
            type: Output
        }], thumbClick: [{
            type: Output
        }], playingChange: [{
            type: Output
        }], indexChange: [{
            type: Output
        }], itemsChange: [{
            type: Output
        }], error: [{
            type: Output
        }], id: [{
            type: Input
        }], items: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryIframeComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const iframe = this.iframe.nativeElement;
        if (shouldPause) {
            /** @type {?} */
            const src = iframe.src;
            iframe.src = src;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
GalleryIframeComponent.ɵfac = function GalleryIframeComponent_Factory(t) { return new (t || GalleryIframeComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.DomSanitizer)); };
GalleryIframeComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryIframeComponent, selectors: [["gallery-iframe"]], viewQuery: function GalleryIframeComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c1, 1);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.iframe = _t.first);
    } }, inputs: { pauseVideo: ["pause", "pauseVideo"], src: "src" }, decls: 2, vars: 1, consts: [["frameborder", "0", "allowfullscreen", "", 3, "src"], ["iframe", ""]], template: function GalleryIframeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "iframe", 0, 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("src", ctx.iframeSrc, ɵngcc0.ɵɵsanitizeResourceUrl);
    } }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
GalleryIframeComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryIframeComponent.propDecorators = {
    src: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryIframeComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-iframe',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            [src]="iframeSrc">
    </iframe>
  `
            }]
    }], function () { return [{ type: ɵngcc2.DomSanitizer }]; }, { pauseVideo: [{
            type: Input,
            args: ['pause']
        }], src: [{
            type: Input
        }], iframe: [{
            type: ViewChild,
            args: ['iframe']
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryImageComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        /**
         * Stream that emits the state
         */
        this._state = new BehaviorSubject('loading');
        this.state = this._state.asObservable();
        /**
         * Progress value
         */
        this.progress = 0;
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get imageLoadSuccess() {
        return !!this.imageUrl;
    }
    /**
     * @return {?}
     */
    get imageLoadFailed() {
        return !!this.loadError;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.loadingIcon) {
            this.loaderTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
        }
        if (this.loadingError) {
            this.errorTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingError);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._state.complete();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onProgress({ loaded, total }) {
        this.progress = loaded * 100 / total;
    }
    /**
     * @param {?} blobUrl
     * @return {?}
     */
    onLoaded(blobUrl) {
        this.imageUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${blobUrl})`);
        this._state.next('success');
    }
    /**
     * @param {?} err
     * @return {?}
     */
    onError(err) {
        this.loadError = err;
        this._state.next('failed');
        this.error.emit(err);
    }
}
GalleryImageComponent.ɵfac = function GalleryImageComponent_Factory(t) { return new (t || GalleryImageComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.DomSanitizer)); };
GalleryImageComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryImageComponent, selectors: [["gallery-image"]], hostVars: 4, hostBindings: function GalleryImageComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("g-image-loaded", ctx.imageLoadSuccess)("g-image-error", ctx.imageLoadFailed);
    } }, inputs: { isThumbnail: "isThumbnail", src: "src", loadingIcon: "loadingIcon", loadingError: "loadingError" }, outputs: { error: "error" }, decls: 5, vars: 7, consts: [[3, "lazyImage", "ngSwitch", "progress", "loaded", "error"], ["class", "g-image-item", 3, "backgroundImage", 4, "ngSwitchCase"], ["class", "g-image-error-message", 4, "ngSwitchCase"], [4, "ngSwitchCase"], [1, "g-image-item"], [1, "g-image-error-message"], [3, "innerHTML", 4, "ngIf", "ngIfElse"], ["defaultError", ""], [3, "innerHTML"], [4, "ngIf", "ngIfElse"], ["isLarge", ""], ["class", "g-loading", 3, "innerHTML", 4, "ngIf", "ngIfElse"], ["defaultLoader", ""], [1, "g-loading", 3, "innerHTML"], ["class", "g-thumb-loading", 4, "ngIf"], [1, "g-thumb-loading"]], template: function GalleryImageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementContainerStart(0, 0);
        ɵngcc0.ɵɵlistener("progress", function GalleryImageComponent_Template_ng_container_progress_0_listener($event) { return ctx.onProgress($event); })("loaded", function GalleryImageComponent_Template_ng_container_loaded_0_listener($event) { return ctx.onLoaded($event); })("error", function GalleryImageComponent_Template_ng_container_error_0_listener($event) { return ctx.onError($event); });
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵtemplate(2, GalleryImageComponent_div_2_Template, 1, 3, "div", 1);
        ɵngcc0.ɵɵtemplate(3, GalleryImageComponent_div_3_Template, 4, 2, "div", 2);
        ɵngcc0.ɵɵtemplate(4, GalleryImageComponent_ng_container_4_Template, 4, 2, "ng-container", 3);
        ɵngcc0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("lazyImage", ctx.src)("ngSwitch", ɵngcc0.ɵɵpipeBind1(1, 5, ctx.state));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngSwitchCase", "success");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngSwitchCase", "failed");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngSwitchCase", "loading");
    } }, directives: function () { return [LazyImage, ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgIf]; }, pipes: function () { return [ɵngcc1.AsyncPipe]; }, encapsulation: 2, data: { animation: [
            trigger('fadeIn', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('300ms ease-in', style({ opacity: 1 }))
                ])
            ])
        ] }, changeDetection: 0 });
/** @nocollapse */
GalleryImageComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryImageComponent.propDecorators = {
    isThumbnail: [{ type: Input }],
    src: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    loadingError: [{ type: Input }],
    error: [{ type: Output }],
    imageLoadSuccess: [{ type: HostBinding, args: ['class.g-image-loaded',] }],
    imageLoadFailed: [{ type: HostBinding, args: ['class.g-image-error',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryImageComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-image',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('fadeIn', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate('300ms ease-in', style({ opacity: 1 }))
                        ])
                    ])
                ],
                template: `
    <ng-container [lazyImage]="src"
                  (progress)="onProgress($event)"
                  (loaded)="onLoaded($event)"
                  (error)="onError($event)"
                  [ngSwitch]="state | async">

      <div *ngSwitchCase="'success'"
           @fadeIn
           class="g-image-item"
           [style.backgroundImage]="imageUrl">
      </div>

      <div *ngSwitchCase="'failed'"
           class="g-image-error-message">
        <div *ngIf="errorTemplate; else defaultError"
             [innerHTML]="errorTemplate"></div>
        <ng-template #defaultError>
          <ng-container *ngIf="isThumbnail; else isLarge">
            <h4>⚠</h4>
          </ng-container>
          <ng-template #isLarge>
            <h2>⚠</h2>
            <p>Unable to load the image!</p>
          </ng-template>
        </ng-template>
      </div>

      <ng-container *ngSwitchCase="'loading'">
        <div *ngIf="loaderTemplate; else defaultLoader"
             class="g-loading"
             [innerHTML]="loaderTemplate">
        </div>
        <ng-template #defaultLoader>
          <div *ngIf="isThumbnail" class="g-thumb-loading"></div>
        </ng-template>
      </ng-container>
    </ng-container>
  `
            }]
    }], function () { return [{ type: ɵngcc2.DomSanitizer }]; }, { error: [{
            type: Output
        }], imageLoadSuccess: [{
            type: HostBinding,
            args: ['class.g-image-loaded']
        }], imageLoadFailed: [{
            type: HostBinding,
            args: ['class.g-image-error']
        }], isThumbnail: [{
            type: Input
        }], src: [{
            type: Input
        }], loadingIcon: [{
            type: Input
        }], loadingError: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryVideoComponent {
    constructor() {
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    /**
     * @param {?} shouldPause
     * @return {?}
     */
    set pauseVideo(shouldPause) {
        /** @type {?} */
        const video = this.video.nativeElement;
        if (shouldPause && !video.paused) {
            video.pause();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.src instanceof Array) {
            // If video has multiple sources
            this.videoSources = [...this.src];
        }
        else {
            this.videoSources = [{ url: this.src }];
        }
    }
}
GalleryVideoComponent.ɵfac = function GalleryVideoComponent_Factory(t) { return new (t || GalleryVideoComponent)(); };
GalleryVideoComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryVideoComponent, selectors: [["gallery-video"]], viewQuery: function GalleryVideoComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c2, 1);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.video = _t.first);
    } }, inputs: { pauseVideo: ["pause", "pauseVideo"], src: "src", poster: "poster" }, outputs: { error: "error" }, decls: 3, vars: 2, consts: [["controls", "", 3, "poster", "error"], ["video", ""], [3, "src", "type", 4, "ngFor", "ngForOf"], [3, "src", "type"]], template: function GalleryVideoComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "video", 0, 1);
        ɵngcc0.ɵɵlistener("error", function GalleryVideoComponent_Template_video_error_0_listener($event) { return ctx.error.emit($event); });
        ɵngcc0.ɵɵtemplate(2, GalleryVideoComponent_source_2_Template, 1, 2, "source", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵpropertyInterpolate("poster", ctx.poster, ɵngcc0.ɵɵsanitizeUrl);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.videoSources);
    } }, directives: [ɵngcc1.NgForOf], encapsulation: 2, changeDetection: 0 });
GalleryVideoComponent.propDecorators = {
    src: [{ type: Input }],
    poster: [{ type: Input }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    error: [{ type: Output }],
    video: [{ type: ViewChild, args: ['video',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryVideoComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-video',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <video #video controls poster="{{poster}}" (error)="error.emit($event)">
      <source *ngFor="let src of videoSources" src="{{src?.url}}" type="{{src?.type}}"/>
    </video>
  `
            }]
    }], function () { return []; }, { error: [{
            type: Output
        }], pauseVideo: [{
            type: Input,
            args: ['pause']
        }], src: [{
            type: Input
        }], poster: [{
            type: Input
        }], video: [{
            type: ViewChild,
            args: ['video']
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryNavComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.action = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
    }
}
GalleryNavComponent.ɵfac = function GalleryNavComponent_Factory(t) { return new (t || GalleryNavComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.DomSanitizer)); };
GalleryNavComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryNavComponent, selectors: [["gallery-nav"]], inputs: { state: "state", config: "config" }, outputs: { action: "action" }, decls: 2, vars: 2, consts: [["class", "g-nav-prev", "aria-label", "Previous", 3, "innerHtml", "tapClick", 4, "ngIf"], ["class", "g-nav-next", "aria-label", "Next", 3, "innerHtml", "tapClick", 4, "ngIf"], ["aria-label", "Previous", 1, "g-nav-prev", 3, "innerHtml", "tapClick"], ["aria-label", "Next", 1, "g-nav-next", 3, "innerHtml", "tapClick"]], template: function GalleryNavComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, GalleryNavComponent_i_0_Template, 1, 1, "i", 0);
        ɵngcc0.ɵɵtemplate(1, GalleryNavComponent_i_1_Template, 1, 1, "i", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.loop || ctx.state.hasPrev);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.loop || ctx.state.hasNext);
    } }, directives: function () { return [ɵngcc1.NgIf, TapClick]; }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
GalleryNavComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryNavComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryNavComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-nav',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i *ngIf="config.loop || state.hasPrev"
       class="g-nav-prev"
       aria-label="Previous"
       (tapClick)="action.emit('prev')"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       (tapClick)="action.emit('next')"
       [innerHtml]="navIcon"></i>
  `
            }]
    }], function () { return [{ type: ɵngcc2.DomSanitizer }]; }, { action: [{
            type: Output
        }], state: [{
            type: Input
        }], config: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryCoreComponent {
    constructor() {
        this.action = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * Set thumbnails position
     * @return {?}
     */
    get thumbPosition() {
        return this.config.thumbPosition;
    }
    /**
     * Set sliding direction
     * @return {?}
     */
    get slidingDirection() {
        return this.config.slidingDirection;
    }
    /**
     * Disable thumbnails clicks
     * @return {?}
     */
    get disableThumb() {
        return this.config.disableThumb;
    }
    /**
     * Set gallery image size
     * @return {?}
     */
    get imageSize() {
        return this.config.imageSize;
    }
    /**
     * Set gallery dots position
     * @return {?}
     */
    get dotsPosition() {
        return this.config.dotsPosition;
    }
    /**
     * Set gallery counter position
     * @return {?}
     */
    get counterPosition() {
        return this.config.counterPosition;
    }
}
GalleryCoreComponent.ɵfac = function GalleryCoreComponent_Factory(t) { return new (t || GalleryCoreComponent)(); };
GalleryCoreComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryCoreComponent, selectors: [["gallery-core"]], hostVars: 6, hostBindings: function GalleryCoreComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("thumbPosition", ctx.thumbPosition)("slidingDirection", ctx.slidingDirection)("disableThumb", ctx.disableThumb)("imageSize", ctx.imageSize)("dotsPosition", ctx.dotsPosition)("counterPosition", ctx.counterPosition);
    } }, inputs: { state: "state", config: "config" }, outputs: { action: "action", itemClick: "itemClick", thumbClick: "thumbClick", error: "error" }, decls: 6, vars: 6, consts: [[3, "state", "config", "action", "thumbClick", 4, "ngIf"], [1, "g-box"], [3, "state", "config", "action", "itemClick", "error"], [3, "state", "config", "action", 4, "ngIf"], [3, "state", 4, "ngIf"], [3, "state", "config", "action", "thumbClick"], [3, "state", "config", "action"], [3, "state"]], template: function GalleryCoreComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, GalleryCoreComponent_gallery_thumbs_0_Template, 1, 2, "gallery-thumbs", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "gallery-slider", 2);
        ɵngcc0.ɵɵlistener("action", function GalleryCoreComponent_Template_gallery_slider_action_2_listener($event) { return ctx.action.emit($event); })("itemClick", function GalleryCoreComponent_Template_gallery_slider_itemClick_2_listener($event) { return ctx.itemClick.emit($event); })("error", function GalleryCoreComponent_Template_gallery_slider_error_2_listener($event) { return ctx.error.emit($event); });
        ɵngcc0.ɵɵtemplate(3, GalleryCoreComponent_gallery_nav_3_Template, 1, 2, "gallery-nav", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(4, GalleryCoreComponent_gallery_dots_4_Template, 1, 2, "gallery-dots", 3);
        ɵngcc0.ɵɵtemplate(5, GalleryCoreComponent_gallery_counter_5_Template, 1, 1, "gallery-counter", 4);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.thumb);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("state", ctx.state)("config", ctx.config);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.nav && ctx.state.items.length > 1);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.dots);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.counter);
    } }, directives: function () { return [ɵngcc1.NgIf, GallerySliderComponent, GalleryThumbsComponent, GalleryNavComponent, GalleryDotsComponent, GalleryCounterComponent]; }, encapsulation: 2, changeDetection: 0 });
GalleryCoreComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    thumbPosition: [{ type: HostBinding, args: ['attr.thumbPosition',] }],
    slidingDirection: [{ type: HostBinding, args: ['attr.slidingDirection',] }],
    disableThumb: [{ type: HostBinding, args: ['attr.disableThumb',] }],
    imageSize: [{ type: HostBinding, args: ['attr.imageSize',] }],
    dotsPosition: [{ type: HostBinding, args: ['attr.dotsPosition',] }],
    counterPosition: [{ type: HostBinding, args: ['attr.counterPosition',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryCoreComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-core',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-thumbs *ngIf="config.thumb"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)"
                    (thumbClick)="thumbClick.emit($event)">
    </gallery-thumbs>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (action)="action.emit($event)"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config"
                     (action)="action.emit($event)">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>
    </div>
  `
            }]
    }], function () { return []; }, { action: [{
            type: Output
        }], itemClick: [{
            type: Output
        }], thumbClick: [{
            type: Output
        }], error: [{
            type: Output
        }], thumbPosition: [{
            type: HostBinding,
            args: ['attr.thumbPosition']
        }], slidingDirection: [{
            type: HostBinding,
            args: ['attr.slidingDirection']
        }], disableThumb: [{
            type: HostBinding,
            args: ['attr.disableThumb']
        }], imageSize: [{
            type: HostBinding,
            args: ['attr.imageSize']
        }], dotsPosition: [{
            type: HostBinding,
            args: ['attr.dotsPosition']
        }], counterPosition: [{
            type: HostBinding,
            args: ['attr.counterPosition']
        }], state: [{
            type: Input
        }], config: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryDotsComponent {
    constructor() {
        this.action = new EventEmitter();
    }
}
GalleryDotsComponent.ɵfac = function GalleryDotsComponent_Factory(t) { return new (t || GalleryDotsComponent)(); };
GalleryDotsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryDotsComponent, selectors: [["gallery-dots"]], inputs: { state: "state", config: "config" }, outputs: { action: "action" }, decls: 1, vars: 1, consts: [["class", "g-dot", 3, "g-dot-active", "width", "height", "tapClick", 4, "ngFor", "ngForOf"], [1, "g-dot", 3, "tapClick"], [1, "g-dot-inner"]], template: function GalleryDotsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, GalleryDotsComponent_div_0_Template, 2, 6, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ctx.state.items);
    } }, directives: function () { return [ɵngcc1.NgForOf, TapClick]; }, encapsulation: 2, changeDetection: 0 });
GalleryDotsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryDotsComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-dots',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         [class.g-dot-active]="i === state.currIndex"
         [style.width.px]="config?.dotsSize"
         [style.height.px]="config?.dotsSize"
         (tapClick)="action.emit(i)">
      <div class="g-dot-inner"></div>
    </div>
  `
            }]
    }], function () { return []; }, { action: [{
            type: Output
        }], state: [{
            type: Input
        }], config: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryThumbsComponent {
    /**
     * @param {?} _el
     * @param {?} _zone
     */
    constructor(_el, _zone) {
        this._el = _el;
        this._zone = _zone;
        /**
         * Sliding worker
         */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /**
         * Current slider position in free sliding mode
         */
        this._freeModeCurrentOffset = 0;
        /**
         * Stream that emits when the active item should change
         */
        this.action = new EventEmitter();
        /**
         * Stream that emits when thumb is clicked
         */
        this.thumbClick = new EventEmitter();
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
        this._freeModeCurrentOffset = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {
            /** @type {?} */
            let direction;
            switch (this.config.thumbPosition) {
                case ThumbnailsPosition.Right:
                case ThumbnailsPosition.Left:
                    direction = Hammer.DIRECTION_VERTICAL;
                    break;
                case ThumbnailsPosition.Top:
                case ThumbnailsPosition.Bottom:
                    direction = Hammer.DIRECTION_HORIZONTAL;
                    break;
            }
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                switch (this.config.thumbMode) {
                    case ThumbnailsMode.Strict:
                        this._hammer.on('pan', (e) => this.strictMode(e));
                        break;
                    case ThumbnailsMode.Free:
                        this._hammer.on('pan', (e) => this.freeMode(e));
                }
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
    }
    /**
     * Sliding strict mode
     * @private
     * @param {?} e
     * @return {?}
     */
    strictMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
                this.updateSlider({ value: e.deltaY, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.verticalPan(e);
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.updateSlider({ value: e.deltaX, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.horizontalPan(e);
                }
        }
    }
    /**
     * Sliding free mode
     * @private
     * @param {?} e
     * @return {?}
     */
    freeMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaY, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaY;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaX, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaX;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
        }
    }
    /**
     * Check if the minimum free scroll is exceeded (used in Bottom, Left directions)
     * @private
     * @param {?} delta
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    minFreeScrollExceeded(delta, width, height) {
        return -(this._freeModeCurrentOffset + delta - width / 2) > (this.state.items.length - this.state.currIndex) * height;
    }
    /**
     * Check if the maximum free scroll is exceeded (used in Top, Right directions)
     * @private
     * @param {?} delta
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    maxFreeScrollExceeded(delta, width, height) {
        return this._freeModeCurrentOffset + delta > (this.state.currIndex * width) + (height / 2);
    }
    /**
     * Convert sliding state to styles
     * @private
     * @param {?} state
     * @return {?}
     */
    getSliderStyles(state) {
        /** @type {?} */
        let value;
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.width = '100%';
                this.height = this.config.thumbHeight + 'px';
                value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - state.value);
                return {
                    transform: `translate3d(${value}px, 0, 0)`,
                    width: this.state.items.length * this.config.thumbWidth + 'px',
                    height: '100%'
                };
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.Right:
                this.width = this.config.thumbWidth + 'px';
                this.height = '100%';
                value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - state.value);
                return {
                    transform: `translate3d(0, ${value}px, 0)`,
                    width: '100%',
                    height: this.state.items.length * this.config.thumbHeight + 'px'
                };
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    verticalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
            return;
        }
        if (e.velocityY > 0.3) {
            this.prev();
        }
        else if (e.velocityY < -0.3) {
            this.next();
        }
        else {
            if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    horizontalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
            return;
        }
        if (e.velocityX > 0.3) {
            this.prev();
        }
        else if (e.velocityX < -0.3) {
            this.next();
        }
        else {
            if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.action.emit('next');
    }
    /**
     * @private
     * @return {?}
     */
    prev() {
        this.action.emit('prev');
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    updateSlider(state) {
        /** @type {?} */
        const newState = Object.assign({}, this._slidingWorker$.value, state);
        this._slidingWorker$.next(newState);
    }
}
GalleryThumbsComponent.ɵfac = function GalleryThumbsComponent_Factory(t) { return new (t || GalleryThumbsComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
GalleryThumbsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryThumbsComponent, selectors: [["gallery-thumbs"]], hostVars: 4, hostBindings: function GalleryThumbsComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("width", ctx.width)("height", ctx.height);
    } }, inputs: { state: "state", config: "config" }, outputs: { action: "action", thumbClick: "thumbClick", error: "error" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 2, vars: 3, consts: [["class", "g-thumbs-container", 4, "ngIf"], [1, "g-thumbs-container"], [1, "g-slider", 3, "ngStyle"], [3, "type", "config", "data", "currIndex", "index", "tapClickDisabled", "tapClick", "error", 4, "ngFor", "ngForOf"], [3, "type", "config", "data", "currIndex", "index", "tapClickDisabled", "tapClick", "error"]], template: function GalleryThumbsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, GalleryThumbsComponent_div_0_Template, 3, 4, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.sliderState$));
    } }, directives: function () { return [ɵngcc1.NgIf, ɵngcc1.NgStyle, ɵngcc1.NgForOf, GalleryThumbComponent, TapClick]; }, pipes: function () { return [ɵngcc1.AsyncPipe]; }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
GalleryThumbsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
GalleryThumbsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    width: [{ type: HostBinding, args: ['style.width',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryThumbsComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-thumbs',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-thumbs-container">
      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       [tapClickDisabled]="config.disableThumb"
                       (tapClick)="thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
      </div>
    </div>
  `
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }]; }, { action: [{
            type: Output
        }], thumbClick: [{
            type: Output
        }], error: [{
            type: Output
        }], width: [{
            type: HostBinding,
            args: ['style.width']
        }], height: [{
            type: HostBinding,
            args: ['style.height']
        }], state: [{
            type: Input
        }], config: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GallerySliderComponent {
    /**
     * @param {?} _el
     * @param {?} _zone
     * @param {?} platform
     */
    constructor(_el, _zone, platform) {
        this._el = _el;
        this._zone = _zone;
        this.platform = platform;
        /**
         * Sliding worker
         */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /**
         * Stream that emits when the active item should change
         */
        this.action = new EventEmitter();
        /**
         * Stream that emits when item is clicked
         */
        this.itemClick = new EventEmitter();
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    /**
     * Item zoom
     * @return {?}
     */
    get zoom() {
        return { transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)` };
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.config.gestures && typeof Hammer !== 'undefined') {
            /** @type {?} */
            const direction = this.config.slidingDirection === SlidingDirection.Horizontal
                ? Hammer.DIRECTION_HORIZONTAL
                : Hammer.DIRECTION_VERTICAL;
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                this._hammer.on('pan', (e) => {
                    switch (this.config.slidingDirection) {
                        case SlidingDirection.Horizontal:
                            this.updateSlider({ value: e.deltaX, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.horizontalPan(e);
                            }
                            break;
                        case SlidingDirection.Vertical:
                            this.updateSlider({ value: e.deltaY, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.verticalPan(e);
                            }
                    }
                });
            });
        }
        // Rearrange slider on window resize
        if (isPlatformBrowser(this.platform)) {
            this._resizeSub$ = fromEvent(window, 'resize').pipe(debounceTime(200), tap(() => this.updateSlider(this._slidingWorker$.value))).subscribe();
        }
        setTimeout(() => this.updateSlider({ value: 0, active: false }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
        if (this._resizeSub$) {
            this._resizeSub$.unsubscribe();
        }
        this._slidingWorker$.complete();
    }
    /**
     * Convert sliding state to styles
     * @private
     * @param {?} state
     * @return {?}
     */
    getSliderStyles(state) {
        switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
                return {
                    transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value}px, 0, 0)`,
                    width: `calc(100% * ${this.state.items.length})`,
                    height: '100%'
                };
            case SlidingDirection.Vertical:
                return {
                    transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value}px, 0)`,
                    width: '100%',
                    height: `calc(100% * ${this.state.items.length})`,
                };
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    verticalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
            return;
        }
        if (e.velocityY > 0.3) {
            this.prev();
        }
        else if (e.velocityY < -0.3) {
            this.next();
        }
        else {
            if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    horizontalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
            return;
        }
        if (e.velocityX > 0.3) {
            this.prev();
        }
        else if (e.velocityX < -0.3) {
            this.next();
        }
        else {
            if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.action.emit('next');
    }
    /**
     * @private
     * @return {?}
     */
    prev() {
        this.action.emit('prev');
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    updateSlider(state) {
        /** @type {?} */
        const newState = Object.assign({}, this._slidingWorker$.value, state);
        this._slidingWorker$.next(newState);
    }
}
GallerySliderComponent.ɵfac = function GallerySliderComponent_Factory(t) { return new (t || GallerySliderComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone), ɵngcc0.ɵɵdirectiveInject(PLATFORM_ID)); };
GallerySliderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GallerySliderComponent, selectors: [["gallery-slider"]], inputs: { state: "state", config: "config" }, outputs: { action: "action", itemClick: "itemClick", error: "error" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 3, vars: 3, consts: [["class", "g-items-container", 3, "ngStyle", 4, "ngIf"], [1, "g-items-container", 3, "ngStyle"], [1, "g-slider", 3, "ngStyle"], [3, "type", "config", "data", "currIndex", "index", "tapClick", "error", 4, "ngFor", "ngForOf"], [3, "type", "config", "data", "currIndex", "index", "tapClick", "error"]], template: function GallerySliderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, GallerySliderComponent_div_0_Template, 3, 5, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵprojection(2);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.sliderState$));
    } }, directives: function () { return [ɵngcc1.NgIf, ɵngcc1.NgStyle, ɵngcc1.NgForOf, GalleryItemComponent, TapClick]; }, pipes: function () { return [ɵngcc1.AsyncPipe]; }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
GallerySliderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
GallerySliderComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    error: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GallerySliderComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-slider',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)"
                      (error)="error.emit({itemIndex: i, error: $event})">
        </gallery-item>

      </div>
    </div>
    <ng-content></ng-content>
  `
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }, { type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }]; }, { action: [{
            type: Output
        }], itemClick: [{
            type: Output
        }], error: [{
            type: Output
        }], state: [{
            type: Input
        }], config: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryCounterComponent {
}
GalleryCounterComponent.ɵfac = function GalleryCounterComponent_Factory(t) { return new (t || GalleryCounterComponent)(); };
GalleryCounterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryCounterComponent, selectors: [["gallery-counter"]], inputs: { state: "state" }, decls: 2, vars: 1, consts: [[1, "g-counter"]], template: function GalleryCounterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtext(1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate(ctx.state.currIndex + 1 + "/" + ctx.state.items.length);
    } }, encapsulation: 2, changeDetection: 0 });
GalleryCounterComponent.propDecorators = {
    state: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryCounterComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-counter',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="g-counter">{{(state.currIndex + 1) + '/' + state.items.length}}</div>
  `
            }]
    }], null, { state: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryItemComponent {
    constructor() {
        this.Types = GalleryItemType;
        /**
         * Stream that emits when an error occurs
         */
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get isActive() {
        return this.index === this.currIndex;
    }
    /**
     * @return {?}
     */
    get load() {
        switch (this.config.loadingStrategy) {
            case LoadingStrategy.Preload:
                return true;
            case LoadingStrategy.Lazy:
                return this.currIndex === this.index;
            default:
                return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
        }
    }
}
GalleryItemComponent.ɵfac = function GalleryItemComponent_Factory(t) { return new (t || GalleryItemComponent)(); };
GalleryItemComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryItemComponent, selectors: [["gallery-item"]], hostVars: 2, hostBindings: function GalleryItemComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("g-active-item", ctx.isActive);
    } }, inputs: { config: "config", index: "index", currIndex: "currIndex", type: "type", data: "data" }, outputs: { error: "error" }, decls: 1, vars: 1, consts: [[3, "ngSwitch", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "src", "poster", "pause", "error", 4, "ngSwitchCase"], [3, "src", "pause", 4, "ngSwitchCase"], [3, "src", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "src", "loadingIcon", "loadingError", "error"], [1, "g-template", "g-item-template"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "src", "poster", "pause", "error"], [3, "src", "pause"], [3, "src"]], template: function GalleryItemComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, GalleryItemComponent_ng_container_0_Template, 6, 5, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.load);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgSwitchDefault, GalleryImageComponent, ɵngcc1.NgTemplateOutlet, GalleryVideoComponent, GalleryIframeComponent], encapsulation: 2, changeDetection: 0 });
GalleryItemComponent.propDecorators = {
    config: [{ type: Input }],
    index: [{ type: Input }],
    currIndex: [{ type: Input }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    error: [{ type: Output }],
    isActive: [{ type: HostBinding, args: ['class.g-active-item',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryItemComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-item',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="load" [ngSwitch]="type">

      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="data.src"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (error)="error.emit($event)"></gallery-image>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="data.src"
                     [poster]="data.poster"
                     [pause]="currIndex !== index"
                     (error)="error.emit($event)"></gallery-video>

      <gallery-iframe *ngSwitchCase="Types.Youtube"
                      [src]="data.src"
                      [pause]="currIndex !== index"></gallery-iframe>

      <gallery-iframe *ngSwitchCase="Types.Iframe"
                      [src]="data.src"></gallery-iframe>

      <ng-container *ngSwitchDefault>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

    </ng-container>
  `
            }]
    }], function () { return []; }, { error: [{
            type: Output
        }], isActive: [{
            type: HostBinding,
            args: ['class.g-active-item']
        }], config: [{
            type: Input
        }], index: [{
            type: Input
        }], currIndex: [{
            type: Input
        }], type: [{
            type: Input
        }], data: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryThumbComponent {
    constructor() {
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get isActive() {
        return this.index === this.currIndex;
    }
}
GalleryThumbComponent.ɵfac = function GalleryThumbComponent_Factory(t) { return new (t || GalleryThumbComponent)(); };
GalleryThumbComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GalleryThumbComponent, selectors: [["gallery-thumb"]], hostVars: 2, hostBindings: function GalleryThumbComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("g-active-thumb", ctx.isActive);
    } }, inputs: { config: "config", index: "index", currIndex: "currIndex", type: "type", data: "data" }, outputs: { error: "error" }, decls: 2, vars: 5, consts: [["mode", "indeterminate", 3, "src", "isThumbnail", "loadingIcon", "loadingError", "error"], ["class", "g-template g-thumb-template", 4, "ngIf"], [1, "g-template", "g-thumb-template"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function GalleryThumbComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "gallery-image", 0);
        ɵngcc0.ɵɵlistener("error", function GalleryThumbComponent_Template_gallery_image_error_0_listener($event) { return ctx.error.emit($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(1, GalleryThumbComponent_div_1_Template, 2, 6, "div", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("src", ctx.data.thumb)("isThumbnail", true)("loadingIcon", ctx.config.thumbLoadingIcon)("loadingError", ctx.config.thumbLoadingError);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.config.thumbTemplate);
    } }, directives: [GalleryImageComponent, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
GalleryThumbComponent.propDecorators = {
    config: [{ type: Input }],
    index: [{ type: Input }],
    currIndex: [{ type: Input }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    error: [{ type: Output }],
    isActive: [{ type: HostBinding, args: ['class.g-active-thumb',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryThumbComponent, [{
        type: Component,
        args: [{
                selector: 'gallery-thumb',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-image [src]="data.thumb" 
                   mode="indeterminate"
                   [isThumbnail]="true" 
                   [loadingIcon]="config.thumbLoadingIcon"
                   [loadingError]="config.thumbLoadingError "
                   (error)="error.emit($event)"></gallery-image>

    <div *ngIf="config.thumbTemplate" class="g-template g-thumb-template">
      <ng-container
        *ngTemplateOutlet="config.thumbTemplate; context: { index: this.index, type: this.type, data: this.data }">
      </ng-container>
    </div>
  `
            }]
    }], function () { return []; }, { error: [{
            type: Output
        }], isActive: [{
            type: HostBinding,
            args: ['class.g-active-thumb']
        }], config: [{
            type: Input
        }], index: [{
            type: Input
        }], currIndex: [{
            type: Input
        }], type: [{
            type: Input
        }], data: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LazyImage {
    /**
     * @param {?} document
     */
    constructor(document) {
        this.document = document;
        this._imageLoader$ = new Subject();
        this._loaderSub$ = Subscription.EMPTY;
        this.loaded = new EventEmitter();
        this.error = new EventEmitter();
        this._loaderSub$ = this._imageLoader$.pipe(switchMap((imageSrc) => this.nativeLoader(imageSrc))).subscribe();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['src'] && changes['src'].previousValue !== changes['src'].currentValue) {
            this.loadImage(this.src);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._loaderSub$.unsubscribe();
        this._imageLoader$.complete();
    }
    /**
     * @param {?} imagePath
     * @return {?}
     */
    loadImage(imagePath) {
        this._imageLoader$.next(imagePath);
    }
    /**
     * Native image loader, does not emit progress
     * @param {?} url
     * @return {?}
     */
    nativeLoader(url) {
        /** @type {?} */
        const img = this.document.createElement('img');
        // Stop previously loading
        img.src = url;
        // Image load success
        /** @type {?} */
        const loadSuccess = fromEvent(img, 'load').pipe(tap(() => this.loaded.emit(url)));
        // Image load failed
        /** @type {?} */
        const loadError = fromEvent(img, 'error').pipe(tap(() => this.error.emit(new Error(`[lazyImage]: The image ${url} did not load`))));
        return zip(loadSuccess, loadError);
    }
}
LazyImage.ɵfac = function LazyImage_Factory(t) { return new (t || LazyImage)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT)); };
LazyImage.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: LazyImage, selectors: [["", "lazyImage", ""]], inputs: { src: ["lazyImage", "src"] }, outputs: { loaded: "loaded", error: "error" }, features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/** @nocollapse */
LazyImage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
LazyImage.propDecorators = {
    src: [{ type: Input, args: ['lazyImage',] }],
    loaded: [{ type: Output }],
    error: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LazyImage, [{
        type: Directive,
        args: [{
                selector: '[lazyImage]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, { loaded: [{
            type: Output
        }], error: [{
            type: Output
        }], src: [{
            type: Input,
            args: ['lazyImage']
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
 */
class TapClick {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.clickListener = Subscription.EMPTY;
        this.tapClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.activateClickEvent();
    }
    /**
     * @return {?}
     */
    activateClickEvent() {
        if (typeof Hammer !== 'undefined') {
            // Use Hammer.js tap event
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.on('tap', () => {
                if (!this.tapClickDisabled) {
                    this.tapClick.emit(null);
                }
            });
        }
        else {
            // Use normal click event
            this.clickListener = fromEvent(this._el.nativeElement, 'click').pipe(filter(() => !this.tapClickDisabled), tap(() => this.tapClick.emit(null))).subscribe();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
        this.clickListener.unsubscribe();
    }
}
TapClick.ɵfac = function TapClick_Factory(t) { return new (t || TapClick)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
TapClick.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: TapClick, selectors: [["", "tapClick", ""]], inputs: { tapClickDisabled: "tapClickDisabled" }, outputs: { tapClick: "tapClick" } });
/** @nocollapse */
TapClick.ctorParameters = () => [
    { type: ElementRef }
];
TapClick.propDecorators = {
    tapClickDisabled: [{ type: Input }],
    tapClick: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(TapClick, [{
        type: Directive,
        args: [{
                selector: '[tapClick]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { tapClick: [{
            type: Output
        }], tapClickDisabled: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GalleryModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static withConfig(config) {
        return {
            ngModule: GalleryModule,
            providers: [
                {
                    provide: GALLERY_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
GalleryModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GalleryModule });
GalleryModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GalleryModule_Factory(t) { return new (t || GalleryModule)(); }, imports: [[
            CommonModule,
            HttpClientModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GalleryModule, { declarations: function () { return [GalleryComponent, GalleryNavComponent, GalleryDotsComponent, GalleryCoreComponent, GallerySliderComponent, GalleryCounterComponent, GalleryThumbsComponent, GalleryThumbComponent, GalleryItemComponent, GalleryImageComponent, GalleryVideoComponent, GalleryIframeComponent, LazyImage, TapClick]; }, imports: function () { return [CommonModule,
        HttpClientModule]; }, exports: function () { return [GalleryComponent, LazyImage, TapClick]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(GalleryModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    HttpClientModule
                ],
                declarations: [
                    GalleryComponent,
                    GalleryNavComponent,
                    GalleryDotsComponent,
                    GalleryCoreComponent,
                    GallerySliderComponent,
                    GalleryCounterComponent,
                    GalleryThumbsComponent,
                    GalleryThumbComponent,
                    GalleryItemComponent,
                    GalleryImageComponent,
                    GalleryVideoComponent,
                    GalleryIframeComponent,
                    LazyImage,
                    TapClick
                ],
                exports: [
                    GalleryComponent,
                    LazyImage,
                    TapClick,
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Gallery, GalleryRef, GalleryComponent, ImageItem, VideoItem, IframeItem, YoutubeItem, GalleryIframeComponent, GalleryImageComponent, GalleryVideoComponent, GALLERY_CONFIG, GalleryAction, ImageSize, LoadingStrategy, ThumbnailsPosition, ImageLoaderMode, DotsPosition, CounterPosition, ThumbnailsMode, SlidingDirection, GalleryItemType, GalleryModule, GalleryCoreComponent as ɵc, GalleryCounterComponent as ɵe, GalleryDotsComponent as ɵb, GalleryItemComponent as ɵh, GalleryNavComponent as ɵa, GallerySliderComponent as ɵd, GalleryThumbComponent as ɵg, GalleryThumbsComponent as ɵf, LazyImage as ɵi, TapClick as ɵj };

//# sourceMappingURL=ngx-gallery-core.js.map