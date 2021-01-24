import{__awaiter,__generator}from"tslib";import{c as writeTask,r as registerInstance,e as createEvent,f as readTask,h,i as getElement,H as Host}from"./index-e806d1f6.js";import{i as isPlatform,b as getIonMode,c as config}from"./ionic-global-9d5c8ee3.js";import{h as clamp,g as getElementRoot,r as raf}from"./helpers-90f46169.js";import{c as createAnimation}from"./animation-54fe0237.js";import{g as getTimeGivenProgression}from"./cubic-bezier-eea9a7a9.js";import{s as sanitizeDOMString}from"./index-9e3fe806.js";import{d as hapticImpact}from"./haptic-27b3f981.js";import{S as SPINNERS}from"./spinner-configs-cd7845af.js";var getRefresherAnimationType=function(e){var r=e.previousElementSibling;var t=r!==null&&r.tagName==="ION-HEADER";return t?"translate":"scale"};var createPullingAnimation=function(e,r){return e==="scale"?createScaleAnimation(r):createTranslateAnimation(r)};var createBaseAnimation=function(e){var r=e.querySelector("ion-spinner");var t=r.shadowRoot.querySelector("circle");var n=e.querySelector(".spinner-arrow-container");var i=e.querySelector(".arrow-container");var s=i?i.querySelector("ion-icon"):null;var o=createAnimation().duration(1e3).easing("ease-out");var a=createAnimation().addElement(n).keyframes([{offset:0,opacity:"0.3"},{offset:.45,opacity:"0.3"},{offset:.55,opacity:"1"},{offset:1,opacity:"1"}]);var f=createAnimation().addElement(t).keyframes([{offset:0,strokeDasharray:"1px, 200px"},{offset:.2,strokeDasharray:"1px, 200px"},{offset:.55,strokeDasharray:"100px, 200px"},{offset:1,strokeDasharray:"100px, 200px"}]);var l=createAnimation().addElement(r).keyframes([{offset:0,transform:"rotate(-90deg)"},{offset:1,transform:"rotate(210deg)"}]);if(i&&s){var h=createAnimation().addElement(i).keyframes([{offset:0,transform:"rotate(0deg)"},{offset:.3,transform:"rotate(0deg)"},{offset:.55,transform:"rotate(280deg)"},{offset:1,transform:"rotate(400deg)"}]);var c=createAnimation().addElement(s).keyframes([{offset:0,transform:"translateX(2px) scale(0)"},{offset:.3,transform:"translateX(2px) scale(0)"},{offset:.55,transform:"translateX(-1.5px) scale(1)"},{offset:1,transform:"translateX(-1.5px) scale(1)"}]);o.addAnimation([h,c])}return o.addAnimation([a,f,l])};var createScaleAnimation=function(e){var r=e.clientHeight;var t=createAnimation().addElement(e).keyframes([{offset:0,transform:"scale(0) translateY(-"+(r+20)+"px)"},{offset:1,transform:"scale(1) translateY(100px)"}]);return createBaseAnimation(e).addAnimation([t])};var createTranslateAnimation=function(e){var r=e.clientHeight;var t=createAnimation().addElement(e).keyframes([{offset:0,transform:"translateY(-"+(r+20)+"px)"},{offset:1,transform:"translateY(100px)"}]);return createBaseAnimation(e).addAnimation([t])};var createSnapBackAnimation=function(e){return createAnimation().duration(125).addElement(e).fromTo("transform","translateY(var(--ion-pulling-refresher-translate, 100px))","translateY(0px)")};var setSpinnerOpacity=function(e,r){e.style.setProperty("opacity",r.toString())};var handleScrollWhilePulling=function(e,r,t,n){writeTask((function(){setSpinnerOpacity(e,t);r.forEach((function(e,r){return e.style.setProperty("opacity",r<=n?"0.99":"0")}))}))};var handleScrollWhileRefreshing=function(e,r){writeTask((function(){e.style.setProperty("--refreshing-rotation-duration",r>=1?"0.5s":"2s");e.style.setProperty("opacity","1")}))};var translateElement=function(e,r){if(!e){return Promise.resolve()}var t=transitionEndAsync(e,200);writeTask((function(){e.style.setProperty("transition","0.2s all ease-out");if(r===undefined){e.style.removeProperty("transform")}else{e.style.setProperty("transform","translate3d(0px, "+r+", 0px)")}}));return t};var shouldUseNativeRefresher=function(e,r){return __awaiter(void 0,void 0,void 0,(function(){var t,n,i;return __generator(this,(function(s){switch(s.label){case 0:t=e.querySelector("ion-refresher-content");if(!t){return[2,Promise.resolve(false)]}return[4,t.componentOnReady()];case 1:s.sent();n=t.querySelector(".refresher-pulling ion-spinner");i=t.querySelector(".refresher-refreshing ion-spinner");return[2,n!==null&&i!==null&&(r==="ios"&&isPlatform("mobile")&&e.style.webkitOverflowScrolling!==undefined||r==="md")]}}))}))};var transitionEndAsync=function(e,r){if(r===void 0){r=0}return new Promise((function(t){transitionEnd(e,r,t)}))};var transitionEnd=function(e,r,t){if(r===void 0){r=0}var n;var i;var s={passive:true};var o=500;var a=function(){if(n){n()}};var f=function(r){if(r===undefined||e===r.target){a();t(r)}};if(e){e.addEventListener("webkitTransitionEnd",f,s);e.addEventListener("transitionend",f,s);i=setTimeout(f,r+o);n=function(){if(i){clearTimeout(i);i=undefined}e.removeEventListener("webkitTransitionEnd",f,s);e.removeEventListener("transitionend",f,s)}}return a};var refresherIosCss="ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line,.refresher-ios .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.refresher-native .refresher-refreshing ion-spinner{--refreshing-rotation-duration:2s;display:none;-webkit-animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards;animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards}.refresher-native .refresher-refreshing{display:none;-webkit-animation:250ms linear refresher-pop forwards;animation:250ms linear refresher-pop forwards}.refresher-native.refresher-refreshing .refresher-pulling ion-spinner,.refresher-native.refresher-completing .refresher-pulling ion-spinner{display:none}.refresher-native.refresher-refreshing .refresher-refreshing ion-spinner,.refresher-native.refresher-completing .refresher-refreshing ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-pulling ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-refreshing ion-spinner{display:none}@-webkit-keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}";var refresherMdCss="ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line,.refresher-md .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;width:24px;height:24px;color:var(--ion-color-primary, #3880ff)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native .spinner-arrow-container{display:inherit}ion-refresher.refresher-native .arrow-container{display:block;position:absolute;width:24px;height:24px}ion-refresher.refresher-native .arrow-container ion-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;left:0;right:0;bottom:-4px;position:absolute;color:var(--ion-color-primary, #3880ff);font-size:12px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .arrow-container ion-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native.refresher-pulling ion-refresher-content .refresher-pulling,ion-refresher.refresher-native.refresher-ready ion-refresher-content .refresher-pulling{display:-ms-flexbox;display:flex}ion-refresher.refresher-native.refresher-refreshing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-cancelling ion-refresher-content .refresher-refreshing{display:-ms-flexbox;display:flex}ion-refresher.refresher-native .refresher-pulling-icon{-webkit-transform:translateY(calc(-100% - 10px));transform:translateY(calc(-100% - 10px))}ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;border-radius:100%;padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;display:-ms-flexbox;display:flex;border:1px solid #ececec;background:white;-webkit-box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1);box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}";var Refresher=function(){function e(e){registerInstance(this,e);this.ionRefresh=createEvent(this,"ionRefresh",7);this.ionPull=createEvent(this,"ionPull",7);this.ionStart=createEvent(this,"ionStart",7);this.appliedStyles=false;this.didStart=false;this.progress=0;this.pointerDown=false;this.needsCompletion=false;this.didRefresh=false;this.lastVelocityY=0;this.animations=[];this.nativeRefresher=false;this.state=1;this.pullMin=60;this.pullMax=this.pullMin+60;this.closeDuration="280ms";this.snapbackDuration="280ms";this.pullFactor=1;this.disabled=false}e.prototype.disabledChanged=function(){if(this.gesture){this.gesture.enable(!this.disabled)}};e.prototype.checkNativeRefresher=function(){return __awaiter(this,void 0,void 0,(function(){var e,r;return __generator(this,(function(t){switch(t.label){case 0:return[4,shouldUseNativeRefresher(this.el,getIonMode(this))];case 1:e=t.sent();if(e&&!this.nativeRefresher){r=this.el.closest("ion-content");this.setupNativeRefresher(r)}else if(!e){this.destroyNativeRefresher()}return[2]}}))}))};e.prototype.destroyNativeRefresher=function(){if(this.scrollEl&&this.scrollListenerCallback){this.scrollEl.removeEventListener("scroll",this.scrollListenerCallback);this.scrollListenerCallback=undefined}this.nativeRefresher=false};e.prototype.resetNativeRefresher=function(e,r){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:this.state=r;if(!(getIonMode(this)==="ios"))return[3,2];return[4,translateElement(e,undefined)];case 1:t.sent();return[3,4];case 2:return[4,transitionEndAsync(this.el.querySelector(".refresher-refreshing-icon"),200)];case 3:t.sent();t.label=4;case 4:this.didRefresh=false;this.needsCompletion=false;this.pointerDown=false;this.animations.forEach((function(e){return e.destroy()}));this.animations=[];this.progress=0;this.state=1;return[2]}}))}))};e.prototype.setupiOSNativeRefresher=function(e,r){return __awaiter(this,void 0,void 0,(function(){var t,n,i,s;var o=this;return __generator(this,(function(a){switch(a.label){case 0:this.elementToTransform=this.scrollEl;t=e.shadowRoot.querySelectorAll("svg");n=this.scrollEl.clientHeight*.16;i=t.length;writeTask((function(){return t.forEach((function(e){return e.style.setProperty("animation","none")}))}));this.scrollListenerCallback=function(){if(!o.pointerDown&&o.state===1){return}readTask((function(){var s=o.scrollEl.scrollTop;var a=o.el.clientHeight;if(s>0){if(o.state===8){var f=clamp(0,s/(a*.5),1);writeTask((function(){return setSpinnerOpacity(r,1-f)}));return}writeTask((function(){return setSpinnerOpacity(e,0)}));return}if(o.pointerDown){if(!o.didStart){o.didStart=true;o.ionStart.emit()}if(o.pointerDown){o.ionPull.emit()}}var l=clamp(0,Math.abs(s)/a,.99);var h=o.progress=clamp(0,(Math.abs(s)-30)/n,1);var c=clamp(0,Math.floor(h*i),i-1);var u=o.state===8||c===i-1;if(u){if(o.pointerDown){handleScrollWhileRefreshing(r,o.lastVelocityY)}if(!o.didRefresh){o.beginRefresh();o.didRefresh=true;hapticImpact({style:"light"});if(!o.pointerDown){translateElement(o.elementToTransform,a+"px")}}}else{o.state=2;handleScrollWhilePulling(e,t,l,c)}}))};this.scrollEl.addEventListener("scroll",this.scrollListenerCallback);s=this;return[4,import("./index-f49d994d.js")];case 1:s.gesture=a.sent().createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,onStart:function(){o.pointerDown=true;if(!o.didRefresh){translateElement(o.elementToTransform,"0px")}if(n===0){n=o.scrollEl.clientHeight*.16}},onMove:function(e){o.lastVelocityY=e.velocityY},onEnd:function(){o.pointerDown=false;o.didStart=false;if(o.needsCompletion){o.resetNativeRefresher(o.elementToTransform,32);o.needsCompletion=false}else if(o.didRefresh){readTask((function(){return translateElement(o.elementToTransform,o.el.clientHeight+"px")}))}}});this.disabledChanged();return[2]}}))}))};e.prototype.setupMDNativeRefresher=function(e,r,t){return __awaiter(this,void 0,void 0,(function(){var n,i,s,o;var a=this;return __generator(this,(function(f){switch(f.label){case 0:n=getElementRoot(r).querySelector("circle");i=this.el.querySelector("ion-refresher-content .refresher-pulling-icon");s=getElementRoot(t).querySelector("circle");if(n!==null&&s!==null){writeTask((function(){n.style.setProperty("animation","none");t.style.setProperty("animation-delay","-655ms");s.style.setProperty("animation-delay","-655ms")}))}o=this;return[4,import("./index-f49d994d.js")];case 1:o.gesture=f.sent().createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,canStart:function(){return a.state!==8&&a.state!==32&&a.scrollEl.scrollTop===0},onStart:function(e){e.data={animation:undefined,didStart:false,cancelled:false}},onMove:function(r){if(r.velocityY<0&&a.progress===0&&!r.data.didStart||r.data.cancelled){r.data.cancelled=true;return}if(!r.data.didStart){r.data.didStart=true;a.state=2;writeTask((function(){var t=getRefresherAnimationType(e);var n=createPullingAnimation(t,i);r.data.animation=n;a.scrollEl.style.setProperty("--overflow","hidden");n.progressStart(false,0);a.ionStart.emit();a.animations.push(n)}));return}a.progress=clamp(0,r.deltaY/180*.5,1);r.data.animation.progressStep(a.progress);a.ionPull.emit()},onEnd:function(e){if(!e.data.didStart){return}writeTask((function(){return a.scrollEl.style.removeProperty("--overflow")}));if(a.progress<=.4){a.gesture.enable(false);e.data.animation.progressEnd(0,a.progress,500).onFinish((function(){a.animations.forEach((function(e){return e.destroy()}));a.animations=[];a.gesture.enable(true);a.state=1}));return}var r=getTimeGivenProgression([0,0],[0,0],[1,1],[1,1],a.progress)[0];var t=createSnapBackAnimation(i);a.animations.push(t);writeTask((function(){return __awaiter(a,void 0,void 0,(function(){return __generator(this,(function(n){switch(n.label){case 0:i.style.setProperty("--ion-pulling-refresher-translate",r*100+"px");e.data.animation.progressEnd();return[4,t.play()];case 1:n.sent();this.beginRefresh();e.data.animation.destroy();return[2]}}))}))}))}});this.disabledChanged();return[2]}}))}))};e.prototype.setupNativeRefresher=function(e){return __awaiter(this,void 0,void 0,(function(){var r,t;return __generator(this,(function(n){if(this.scrollListenerCallback||!e||this.nativeRefresher||!this.scrollEl){return[2]}this.setCss(0,"",false,"");this.nativeRefresher=true;r=this.el.querySelector("ion-refresher-content .refresher-pulling ion-spinner");t=this.el.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");if(getIonMode(this)==="ios"){this.setupiOSNativeRefresher(r,t)}else{this.setupMDNativeRefresher(e,r,t)}return[2]}))}))};e.prototype.componentDidUpdate=function(){this.checkNativeRefresher()};e.prototype.connectedCallback=function(){return __awaiter(this,void 0,void 0,(function(){var e,r,t;var n=this;return __generator(this,(function(i){switch(i.label){case 0:if(this.el.getAttribute("slot")!=="fixed"){console.error('Make sure you use: <ion-refresher slot="fixed">');return[2]}e=this.el.closest("ion-content");if(!e){console.error("<ion-refresher> must be used inside an <ion-content>");return[2]}return[4,e.componentOnReady()];case 1:i.sent();r=this;return[4,e.getScrollElement()];case 2:r.scrollEl=i.sent();this.backgroundContentEl=getElementRoot(e).querySelector("#background-content");return[4,shouldUseNativeRefresher(this.el,getIonMode(this))];case 3:if(!i.sent())return[3,4];this.setupNativeRefresher(e);return[3,6];case 4:t=this;return[4,import("./index-f49d994d.js")];case 5:t.gesture=i.sent().createGesture({el:e,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:20,passive:false,canStart:function(){return n.canStart()},onStart:function(){return n.onStart()},onMove:function(e){return n.onMove(e)},onEnd:function(){return n.onEnd()}});this.disabledChanged();i.label=6;case 6:return[2]}}))}))};e.prototype.disconnectedCallback=function(){this.destroyNativeRefresher();this.scrollEl=undefined;if(this.gesture){this.gesture.destroy();this.gesture=undefined}};e.prototype.complete=function(){return __awaiter(this,void 0,void 0,(function(){var e=this;return __generator(this,(function(r){if(this.nativeRefresher){this.needsCompletion=true;if(!this.pointerDown){raf((function(){return raf((function(){return e.resetNativeRefresher(e.elementToTransform,32)}))}))}}else{this.close(32,"120ms")}return[2]}))}))};e.prototype.cancel=function(){return __awaiter(this,void 0,void 0,(function(){var e=this;return __generator(this,(function(r){if(this.nativeRefresher){if(!this.pointerDown){raf((function(){return raf((function(){return e.resetNativeRefresher(e.elementToTransform,16)}))}))}}else{this.close(16,"")}return[2]}))}))};e.prototype.getProgress=function(){return Promise.resolve(this.progress)};e.prototype.canStart=function(){if(!this.scrollEl){return false}if(this.state!==1){return false}if(this.scrollEl.scrollTop>0){return false}return true};e.prototype.onStart=function(){this.progress=0;this.state=1};e.prototype.onMove=function(e){if(!this.scrollEl){return}var r=e.event;if(r.touches&&r.touches.length>1){return}if((this.state&56)!==0){return}var t=Number.isNaN(this.pullFactor)||this.pullFactor<0?1:this.pullFactor;var n=e.deltaY*t;if(n<=0){this.progress=0;this.state=1;if(this.appliedStyles){this.setCss(0,"",false,"");return}return}if(this.state===1){var i=this.scrollEl.scrollTop;if(i>0){this.progress=0;return}this.state=2}if(r.cancelable){r.preventDefault()}this.setCss(n,"0ms",true,"");if(n===0){this.progress=0;return}var s=this.pullMin;this.progress=n/s;if(!this.didStart){this.didStart=true;this.ionStart.emit()}this.ionPull.emit();if(n<s){this.state=2;return}if(n>this.pullMax){this.beginRefresh();return}this.state=4;return};e.prototype.onEnd=function(){if(this.state===4){this.beginRefresh()}else if(this.state===2){this.cancel()}};e.prototype.beginRefresh=function(){this.state=8;this.setCss(this.pullMin,this.snapbackDuration,true,"");this.ionRefresh.emit({complete:this.complete.bind(this)})};e.prototype.close=function(e,r){var t=this;setTimeout((function(){t.state=1;t.progress=0;t.didStart=false;t.setCss(0,"0ms",false,"")}),600);this.state=e;this.setCss(0,this.closeDuration,true,r)};e.prototype.setCss=function(e,r,t,n){var i=this;if(this.nativeRefresher){return}this.appliedStyles=e>0;writeTask((function(){if(i.scrollEl&&i.backgroundContentEl){var s=i.scrollEl.style;var o=i.backgroundContentEl.style;s.transform=o.transform=e>0?"translateY("+e+"px) translateZ(0px)":"";s.transitionDuration=o.transitionDuration=r;s.transitionDelay=o.transitionDelay=n;s.overflow=t?"hidden":""}}))};e.prototype.render=function(){var e;var r=getIonMode(this);return h(Host,{slot:"fixed",class:(e={},e[r]=true,e["refresher-"+r]=true,e["refresher-native"]=this.nativeRefresher,e["refresher-active"]=this.state!==1,e["refresher-pulling"]=this.state===2,e["refresher-ready"]=this.state===4,e["refresher-refreshing"]=this.state===8,e["refresher-cancelling"]=this.state===16,e["refresher-completing"]=this.state===32,e)})};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:false,configurable:true});return e}();Refresher.style={ios:refresherIosCss,md:refresherMdCss};var RefresherContent=function(){function e(e){registerInstance(this,e)}e.prototype.componentWillLoad=function(){if(this.pullingIcon===undefined){var e=getIonMode(this);var r=this.el.style.webkitOverflowScrolling!==undefined?"lines":"arrow-down";this.pullingIcon=config.get("refreshingIcon",e==="ios"&&isPlatform("mobile")?config.get("spinner",r):"circular")}if(this.refreshingSpinner===undefined){var e=getIonMode(this);this.refreshingSpinner=config.get("refreshingSpinner",config.get("spinner",e==="ios"?"lines":"circular"))}};e.prototype.render=function(){var e=this.pullingIcon;var r=e!=null&&SPINNERS[e]!==undefined;var t=getIonMode(this);return h(Host,{class:t},h("div",{class:"refresher-pulling"},this.pullingIcon&&r&&h("div",{class:"refresher-pulling-icon"},h("div",{class:"spinner-arrow-container"},h("ion-spinner",{name:this.pullingIcon,paused:true}),t==="md"&&this.pullingIcon==="circular"&&h("div",{class:"arrow-container"},h("ion-icon",{name:"caret-back-sharp"})))),this.pullingIcon&&!r&&h("div",{class:"refresher-pulling-icon"},h("ion-icon",{icon:this.pullingIcon,lazy:false})),this.pullingText&&h("div",{class:"refresher-pulling-text",innerHTML:sanitizeDOMString(this.pullingText)})),h("div",{class:"refresher-refreshing"},this.refreshingSpinner&&h("div",{class:"refresher-refreshing-icon"},h("ion-spinner",{name:this.refreshingSpinner})),this.refreshingText&&h("div",{class:"refresher-refreshing-text",innerHTML:sanitizeDOMString(this.refreshingText)})))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return e}();export{Refresher as ion_refresher,RefresherContent as ion_refresher_content};