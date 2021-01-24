/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import * as keyCodes from '@angular/cdk/keycodes';
import { _getTextWithExcludedElements, TestKey, } from '@angular/cdk/testing';
import { clearElement, createFakeEvent, dispatchFakeEvent, dispatchMouseEvent, dispatchPointerEvent, isTextInput, triggerBlur, triggerFocus, typeInElement, dispatchEvent, } from './fake-events';
/** Maps `TestKey` constants to the `keyCode` and `key` values used by native browser events. */
const keyMap = {
    [TestKey.BACKSPACE]: { keyCode: keyCodes.BACKSPACE, key: 'Backspace' },
    [TestKey.TAB]: { keyCode: keyCodes.TAB, key: 'Tab' },
    [TestKey.ENTER]: { keyCode: keyCodes.ENTER, key: 'Enter' },
    [TestKey.SHIFT]: { keyCode: keyCodes.SHIFT, key: 'Shift' },
    [TestKey.CONTROL]: { keyCode: keyCodes.CONTROL, key: 'Control' },
    [TestKey.ALT]: { keyCode: keyCodes.ALT, key: 'Alt' },
    [TestKey.ESCAPE]: { keyCode: keyCodes.ESCAPE, key: 'Escape' },
    [TestKey.PAGE_UP]: { keyCode: keyCodes.PAGE_UP, key: 'PageUp' },
    [TestKey.PAGE_DOWN]: { keyCode: keyCodes.PAGE_DOWN, key: 'PageDown' },
    [TestKey.END]: { keyCode: keyCodes.END, key: 'End' },
    [TestKey.HOME]: { keyCode: keyCodes.HOME, key: 'Home' },
    [TestKey.LEFT_ARROW]: { keyCode: keyCodes.LEFT_ARROW, key: 'ArrowLeft' },
    [TestKey.UP_ARROW]: { keyCode: keyCodes.UP_ARROW, key: 'ArrowUp' },
    [TestKey.RIGHT_ARROW]: { keyCode: keyCodes.RIGHT_ARROW, key: 'ArrowRight' },
    [TestKey.DOWN_ARROW]: { keyCode: keyCodes.DOWN_ARROW, key: 'ArrowDown' },
    [TestKey.INSERT]: { keyCode: keyCodes.INSERT, key: 'Insert' },
    [TestKey.DELETE]: { keyCode: keyCodes.DELETE, key: 'Delete' },
    [TestKey.F1]: { keyCode: keyCodes.F1, key: 'F1' },
    [TestKey.F2]: { keyCode: keyCodes.F2, key: 'F2' },
    [TestKey.F3]: { keyCode: keyCodes.F3, key: 'F3' },
    [TestKey.F4]: { keyCode: keyCodes.F4, key: 'F4' },
    [TestKey.F5]: { keyCode: keyCodes.F5, key: 'F5' },
    [TestKey.F6]: { keyCode: keyCodes.F6, key: 'F6' },
    [TestKey.F7]: { keyCode: keyCodes.F7, key: 'F7' },
    [TestKey.F8]: { keyCode: keyCodes.F8, key: 'F8' },
    [TestKey.F9]: { keyCode: keyCodes.F9, key: 'F9' },
    [TestKey.F10]: { keyCode: keyCodes.F10, key: 'F10' },
    [TestKey.F11]: { keyCode: keyCodes.F11, key: 'F11' },
    [TestKey.F12]: { keyCode: keyCodes.F12, key: 'F12' },
    [TestKey.META]: { keyCode: keyCodes.META, key: 'Meta' }
};
/** A `TestElement` implementation for unit tests. */
export class UnitTestElement {
    constructor(element, _stabilize) {
        this.element = element;
        this._stabilize = _stabilize;
    }
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            triggerBlur(this.element);
            yield this._stabilize();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isTextInput(this.element)) {
                throw Error('Attempting to clear an invalid element');
            }
            clearElement(this.element);
            yield this._stabilize();
        });
    }
    click(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dispatchMouseEventSequence('click', args, 0);
            yield this._stabilize();
        });
    }
    rightClick(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dispatchMouseEventSequence('contextmenu', args, 2);
            yield this._stabilize();
        });
    }
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            triggerFocus(this.element);
            yield this._stabilize();
        });
    }
    getCssValue(property) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            // TODO(mmalerba): Consider adding value normalization if we run into common cases where its
            //  needed.
            return getComputedStyle(this.element).getPropertyValue(property);
        });
    }
    hover() {
        return __awaiter(this, void 0, void 0, function* () {
            this._dispatchPointerEventIfSupported('pointerenter');
            dispatchMouseEvent(this.element, 'mouseenter');
            yield this._stabilize();
        });
    }
    mouseAway() {
        return __awaiter(this, void 0, void 0, function* () {
            this._dispatchPointerEventIfSupported('pointerleave');
            dispatchMouseEvent(this.element, 'mouseleave');
            yield this._stabilize();
        });
    }
    sendKeys(...modifiersAndKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = modifiersAndKeys.map(k => typeof k === 'number' ? keyMap[k] : k);
            typeInElement(this.element, ...args);
            yield this._stabilize();
        });
    }
    text(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            if (options === null || options === void 0 ? void 0 : options.exclude) {
                return _getTextWithExcludedElements(this.element, options.exclude);
            }
            return (this.element.textContent || '').trim();
        });
    }
    getAttribute(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.getAttribute(name);
        });
    }
    hasClass(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.classList.contains(name);
        });
    }
    getDimensions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.getBoundingClientRect();
        });
    }
    getProperty(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element[name];
        });
    }
    setInputValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.value = value;
            yield this._stabilize();
        });
    }
    selectOptions(...optionIndexes) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasChanged = false;
            const options = this.element.querySelectorAll('option');
            const indexes = new Set(optionIndexes); // Convert to a set to remove duplicates.
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                const wasSelected = option.selected;
                // We have to go through `option.selected`, because `HTMLSelectElement.value` doesn't
                // allow for multiple options to be selected, even in `multiple` mode.
                option.selected = indexes.has(i);
                if (option.selected !== wasSelected) {
                    hasChanged = true;
                    dispatchFakeEvent(this.element, 'change');
                }
            }
            if (hasChanged) {
                yield this._stabilize();
            }
        });
    }
    matchesSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            const elementPrototype = Element.prototype;
            return (elementPrototype['matches'] || elementPrototype['msMatchesSelector'])
                .call(this.element, selector);
        });
    }
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return document.activeElement === this.element;
        });
    }
    dispatchEvent(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = createFakeEvent(name);
            if (data) {
                // tslint:disable-next-line:ban Have to use `Object.assign` to preserve the original object.
                Object.assign(event, data);
            }
            dispatchEvent(this.element, event);
            yield this._stabilize();
        });
    }
    /**
     * Dispatches a pointer event on the current element if the browser supports it.
     * @param name Name of the pointer event to be dispatched.
     * @param clientX Coordinate of the user's pointer along the X axis.
     * @param clientY Coordinate of the user's pointer along the Y axis.
     * @param button Mouse button that should be pressed when dispatching the event.
     */
    _dispatchPointerEventIfSupported(name, clientX, clientY, button) {
        // The latest versions of all browsers we support have the new `PointerEvent` API.
        // Though since we capture the two most recent versions of these browsers, we also
        // need to support Safari 12 at time of writing. Safari 12 does not have support for this,
        // so we need to conditionally create and dispatch these events based on feature detection.
        if (typeof PointerEvent !== 'undefined' && PointerEvent) {
            dispatchPointerEvent(this.element, name, clientX, clientY, { isPrimary: true, button });
        }
    }
    /** Dispatches all the events that are part of a mouse event sequence. */
    _dispatchMouseEventSequence(name, args, button) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientX = undefined;
            let clientY = undefined;
            let modifiers = {};
            if (args.length && typeof args[args.length - 1] === 'object') {
                modifiers = args.pop();
            }
            if (args.length) {
                const { left, top, width, height } = yield this.getDimensions();
                const relativeX = args[0] === 'center' ? width / 2 : args[0];
                const relativeY = args[0] === 'center' ? height / 2 : args[1];
                // Round the computed click position as decimal pixels are not
                // supported by mouse events and could lead to unexpected results.
                clientX = Math.round(left + relativeX);
                clientY = Math.round(top + relativeY);
            }
            this._dispatchPointerEventIfSupported('pointerdown', clientX, clientY, button);
            dispatchMouseEvent(this.element, 'mousedown', clientX, clientY, button, modifiers);
            this._dispatchPointerEventIfSupported('pointerup', clientX, clientY, button);
            dispatchMouseEvent(this.element, 'mouseup', clientX, clientY, button, modifiers);
            dispatchMouseEvent(this.element, name, clientX, clientY, button, modifiers);
            // This call to _stabilize should not be needed since the callers will already do that them-
            // selves. Nevertheless it breaks some tests in g3 without it. It needs to be investigated
            // why removing breaks those tests.
            yield this._stabilize();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC10ZXN0LWVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL3Rlc3RpbmcvdGVzdGJlZC91bml0LXRlc3QtZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxLQUFLLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQ0wsNEJBQTRCLEVBSTVCLE9BQU8sR0FHUixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFDTCxZQUFZLEVBQ1osZUFBZSxFQUNmLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxXQUFXLEVBQ1gsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsZ0dBQWdHO0FBQ2hHLE1BQU0sTUFBTSxHQUFHO0lBQ2IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFDO0lBQ3BFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQztJQUNsRCxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUM7SUFDeEQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFDO0lBQ3hELENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM5RCxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUM7SUFDbEQsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDO0lBQzNELENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBQztJQUM3RCxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUM7SUFDbkUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFDO0lBQ2xELENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBQztJQUNyRCxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUM7SUFDdEUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQ2hFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBQztJQUN6RSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUM7SUFDdEUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDO0lBQzNELENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBQztJQUMzRCxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUM7SUFDL0MsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDO0lBQy9DLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQztJQUMvQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUM7SUFDL0MsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDO0lBQy9DLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQztJQUMvQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUM7SUFDL0MsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxH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QUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9FLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3RSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU1RSw0RkFBNEY7WUFDNUYsMEZBQTBGO1lBQzFGLG1DQUFtQztZQUNuQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBrZXlDb2RlcyBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgX2dldFRleHRXaXRoRXhjbHVkZWRFbGVtZW50cyxcbiAgRWxlbWVudERpbWVuc2lvbnMsXG4gIE1vZGlmaWVyS2V5cyxcbiAgVGVzdEVsZW1lbnQsXG4gIFRlc3RLZXksXG4gIFRleHRPcHRpb25zLFxuICBFdmVudERhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7XG4gIGNsZWFyRWxlbWVudCxcbiAgY3JlYXRlRmFrZUV2ZW50LFxuICBkaXNwYXRjaEZha2VFdmVudCxcbiAgZGlzcGF0Y2hNb3VzZUV2ZW50LFxuICBkaXNwYXRjaFBvaW50ZXJFdmVudCxcbiAgaXNUZXh0SW5wdXQsXG4gIHRyaWdnZXJCbHVyLFxuICB0cmlnZ2VyRm9jdXMsXG4gIHR5cGVJbkVsZW1lbnQsXG4gIGRpc3BhdGNoRXZlbnQsXG59IGZyb20gJy4vZmFrZS1ldmVudHMnO1xuXG4vKiogTWFwcyBgVGVzdEtleWAgY29uc3RhbnRzIHRvIHRoZSBga2V5Q29kZWAgYW5kIGBrZXlgIHZhbHVlcyB1c2VkIGJ5IG5hdGl2ZSBicm93c2VyIGV2ZW50cy4gKi9cbmNvbnN0IGtleU1hcCA9IHtcbiAgW1Rlc3RLZXkuQkFDS1NQQUNFXToge2tleUNvZGU6IGtleUNvZGVzLkJBQ0tTUEFDRSwga2V5OiAnQmFja3NwYWNlJ30sXG4gIFtUZXN0S2V5LlRBQl06IHtrZXlDb2RlOiBrZXlDb2Rlcy5UQUIsIGtleTogJ1RhYid9LFxuICBbVGVzdEtleS5FTlRFUl06IHtrZXlDb2RlOiBrZXlDb2Rlcy5FTlRFUiwga2V5OiAnRW50ZXInfSxcbiAgW1Rlc3RLZXkuU0hJRlRdOiB7a2V5Q29kZToga2V5Q29kZXMuU0hJRlQsIGtleTogJ1NoaWZ0J30sXG4gIFtUZXN0S2V5LkNPTlRST0xdOiB7a2V5Q29kZToga2V5Q29kZXMuQ09OVFJPTCwga2V5OiAnQ29udHJvbCd9LFxuICBbVGVzdEtleS5BTFRdOiB7a2V5Q29kZToga2V5Q29kZXMuQUxULCBrZXk6ICdBbHQnfSxcbiAgW1Rlc3RLZXkuRVNDQVBFXToge2tleUNvZGU6IGtleUNvZGVzLkVTQ0FQRSwga2V5OiAnRXNjYXBlJ30sXG4gIFtUZXN0S2V5LlBBR0VfVVBdOiB7a2V5Q29kZToga2V5Q29kZXMuUEFHRV9VUCwga2V5OiAnUGFnZVVwJ30sXG4gIFtUZXN0S2V5LlBBR0VfRE9XTl06IHtrZXlDb2RlOiBrZXlDb2Rlcy5QQUdFX0RPV04sIGtleTogJ1BhZ2VEb3duJ30sXG4gIFtUZXN0S2V5LkVORF06IHtrZXlDb2RlOiBrZXlDb2Rlcy5FTkQsIGtleTogJ0VuZCd9LFxuICBbVGVzdEtleS5IT01FXToge2tleUNvZGU6IGtleUNvZGVzLkhPTUUsIGtleTogJ0hvbWUnfSxcbiAgW1Rlc3RLZXkuTEVGVF9BUlJPV106IHtrZXlDb2RlOiBrZXlDb2Rlcy5MRUZUX0FSUk9XLCBrZXk6ICdBcnJvd0xlZnQnfSxcbiAgW1Rlc3RLZXkuVVBfQVJST1ddOiB7a2V5Q29kZToga2V5Q29kZXMuVVBfQVJST1csIGtleTogJ0Fycm93VXAnfSxcbiAgW1Rlc3RLZXkuUklHSFRfQVJST1ddOiB7a2V5Q29kZToga2V5Q29kZXMuUklHSFRfQVJST1csIGtleTogJ0Fycm93UmlnaHQnfSxcbiAgW1Rlc3RLZXkuRE9XTl9BUlJPV106IHtrZXlDb2RlOiBrZXlDb2Rlcy5ET1dOX0FSUk9XLCBrZXk6ICdBcnJvd0Rvd24nfSxcbiAgW1Rlc3RLZXkuSU5TRVJUXToge2tleUNvZGU6IGtleUNvZGVzLklOU0VSVCwga2V5OiAnSW5zZXJ0J30sXG4gIFtUZXN0S2V5LkRFTEVURV06IHtrZXlDb2RlOiBrZXlDb2Rlcy5ERUxFVEUsIGtleTogJ0RlbGV0ZSd9LFxuICBbVGVzdEtleS5GMV06IHtrZXlDb2RlOiBrZXlDb2Rlcy5GMSwga2V5OiAnRjEnfSxcbiAgW1Rlc3RLZXkuRjJdOiB7a2V5Q29kZToga2V5Q29kZXMuRjIsIGtleTogJ0YyJ30sXG4gIFtUZXN0S2V5LkYzXToge2tleUNvZGU6IGtleUNvZGVzLkYzLCBrZXk6ICdGMyd9LFxuICBbVGVzdEtleS5GNF06IHtrZXlDb2RlOiBrZXlDb2Rlcy5GNCwga2V5OiAnRjQnfSxcbiAgW1Rlc3RLZXkuRjVdOiB7a2V5Q29kZToga2V5Q29kZXMuRjUsIGtleTogJ0Y1J30sXG4gIFtUZXN0S2V5LkY2XToge2tleUNvZGU6IGtleUNvZGVzLkY2LCBrZXk6ICdGNid9LFxuICBbVGVzdEtleS5GN106IHtrZXlDb2RlOiBrZXlDb2Rlcy5GNywga2V5OiAnRjcnfSxcbiAgW1Rlc3RLZXkuRjhdOiB7a2V5Q29kZToga2V5Q29kZXMuRjgsIGtleTogJ0Y4J30sXG4gIFtUZXN0S2V5LkY5XToge2tleUNvZGU6IGtleUNvZGVzLkY5LCBrZXk6ICdGOSd9LFxuICBbVGVzdEtleS5GMTBdOiB7a2V5Q29kZToga2V5Q29kZXMuRjEwLCBrZXk6ICdGMTAnfSxcbiAgW1Rlc3RLZXkuRjExXToge2tleUNvZGU6IGtleUNvZGVzLkYxMSwga2V5OiAnRjExJ30sXG4gIFtUZXN0S2V5LkYxMl06IHtrZXlDb2RlOiBrZXlDb2Rlcy5GMTIsIGtleTogJ0YxMid9LFxuICBbVGVzdEtleS5NRVRBXToge2tleUNvZGU6IGtleUNvZGVzLk1FVEEsIGtleTogJ01ldGEnfVxufTtcblxuLyoqIEEgYFRlc3RFbGVtZW50YCBpbXBsZW1lbnRhdGlvbiBmb3IgdW5pdCB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBVbml0VGVzdEVsZW1lbnQgaW1wbGVtZW50cyBUZXN0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnQsIHByaXZhdGUgX3N0YWJpbGl6ZTogKCkgPT4gUHJvbWlzZTx2b2lkPikge31cblxuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyaWdnZXJCbHVyKHRoaXMuZWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gIH1cblxuICBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWlzVGV4dElucHV0KHRoaXMuZWxlbWVudCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGNsZWFyIGFuIGludmFsaWQgZWxlbWVudCcpO1xuICAgIH1cbiAgICBjbGVhckVsZW1lbnQodGhpcy5lbGVtZW50KTtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgfVxuXG4gIGFzeW5jIGNsaWNrKC4uLmFyZ3M6IFtNb2RpZmllcktleXM/XSB8IFsnY2VudGVyJywgTW9kaWZpZXJLZXlzP10gfFxuICAgIFtudW1iZXIsIG51bWJlciwgTW9kaWZpZXJLZXlzP10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9kaXNwYXRjaE1vdXNlRXZlbnRTZXF1ZW5jZSgnY2xpY2snLCBhcmdzLCAwKTtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgfVxuXG4gIGFzeW5jIHJpZ2h0Q2xpY2soLi4uYXJnczogW01vZGlmaWVyS2V5cz9dIHwgWydjZW50ZXInLCBNb2RpZmllcktleXM/XSB8XG4gICAgW251bWJlciwgbnVtYmVyLCBNb2RpZmllcktleXM/XSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2Rpc3BhdGNoTW91c2VFdmVudFNlcXVlbmNlKCdjb250ZXh0bWVudScsIGFyZ3MsIDIpO1xuICAgIGF3YWl0IHRoaXMuX3N0YWJpbGl6ZSgpO1xuICB9XG5cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJpZ2dlckZvY3VzKHRoaXMuZWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gIH1cblxuICBhc3luYyBnZXRDc3NWYWx1ZShwcm9wZXJ0eTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgICAvLyBUT0RPKG1tYWxlcmJhKTogQ29uc2lkZXIgYWRkaW5nIHZhbHVlIG5vcm1hbGl6YXRpb24gaWYgd2UgcnVuIGludG8gY29tbW9uIGNhc2VzIHdoZXJlIGl0c1xuICAgIC8vICBuZWVkZWQuXG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgfVxuXG4gIGFzeW5jIGhvdmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2Rpc3BhdGNoUG9pbnRlckV2ZW50SWZTdXBwb3J0ZWQoJ3BvaW50ZXJlbnRlcicpO1xuICAgIGRpc3BhdGNoTW91c2VFdmVudCh0aGlzLmVsZW1lbnQsICdtb3VzZWVudGVyJyk7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gIH1cblxuICBhc3luYyBtb3VzZUF3YXkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fZGlzcGF0Y2hQb2ludGVyRXZlbnRJZlN1cHBvcnRlZCgncG9pbnRlcmxlYXZlJyk7XG4gICAgZGlzcGF0Y2hNb3VzZUV2ZW50KHRoaXMuZWxlbWVudCwgJ21vdXNlbGVhdmUnKTtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRLZXlzKC4uLmtleXM6IChzdHJpbmcgfCBUZXN0S2V5KVtdKTogUHJvbWlzZTx2b2lkPjtcbiAgYXN5bmMgc2VuZEtleXMobW9kaWZpZXJzOiBNb2RpZmllcktleXMsIC4uLmtleXM6IChzdHJpbmcgfCBUZXN0S2V5KVtdKTogUHJvbWlzZTx2b2lkPjtcbiAgYXN5bmMgc2VuZEtleXMoLi4ubW9kaWZpZXJzQW5kS2V5czogYW55W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhcmdzID0gbW9kaWZpZXJzQW5kS2V5cy5tYXAoayA9PiB0eXBlb2YgayA9PT0gJ251bWJlcicgPyBrZXlNYXBbayBhcyBUZXN0S2V5XSA6IGspO1xuICAgIHR5cGVJbkVsZW1lbnQodGhpcy5lbGVtZW50IGFzIEhUTUxFbGVtZW50LCAuLi5hcmdzKTtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgfVxuXG4gIGFzeW5jIHRleHQob3B0aW9ucz86IFRleHRPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgICBpZiAob3B0aW9ucz8uZXhjbHVkZSkge1xuICAgICAgcmV0dXJuIF9nZXRUZXh0V2l0aEV4Y2x1ZGVkRWxlbWVudHModGhpcy5lbGVtZW50LCBvcHRpb25zLmV4Y2x1ZGUpO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuXG4gIGFzeW5jIGhhc0NsYXNzKG5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuX3N0YWJpbGl6ZSgpO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICB9XG5cbiAgYXN5bmMgZ2V0RGltZW5zaW9ucygpOiBQcm9taXNlPEVsZW1lbnREaW1lbnNpb25zPiB7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gICAgcmV0dXJuICh0aGlzLmVsZW1lbnQgYXMgYW55KVtuYW1lXTtcbiAgfVxuXG4gIGFzeW5jIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICh0aGlzLmVsZW1lbnQgYXMgYW55KS52YWx1ZSA9IHZhbHVlO1xuICAgIGF3YWl0IHRoaXMuX3N0YWJpbGl6ZSgpO1xuICB9XG5cbiAgYXN5bmMgc2VsZWN0T3B0aW9ucyguLi5vcHRpb25JbmRleGVzOiBudW1iZXJbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgICBjb25zdCBpbmRleGVzID0gbmV3IFNldChvcHRpb25JbmRleGVzKTsgLy8gQ29udmVydCB0byBhIHNldCB0byByZW1vdmUgZHVwbGljYXRlcy5cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gb3B0aW9uLnNlbGVjdGVkO1xuXG4gICAgICAvLyBXZSBoYXZlIHRvIGdvIHRocm91Z2ggYG9wdGlvbi5zZWxlY3RlZGAsIGJlY2F1c2UgYEhUTUxTZWxlY3RFbGVtZW50LnZhbHVlYCBkb2Vzbid0XG4gICAgICAvLyBhbGxvdyBmb3IgbXVsdGlwbGUgb3B0aW9ucyB0byBiZSBzZWxlY3RlZCwgZXZlbiBpbiBgbXVsdGlwbGVgIG1vZGUuXG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSBpbmRleGVzLmhhcyhpKTtcblxuICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAhPT0gd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGRpc3BhdGNoRmFrZUV2ZW50KHRoaXMuZWxlbWVudCwgJ2NoYW5nZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkKSB7XG4gICAgICBhd2FpdCB0aGlzLl9zdGFiaWxpemUoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBtYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuX3N0YWJpbGl6ZSgpO1xuICAgIGNvbnN0IGVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZSBhcyBhbnk7XG4gICAgcmV0dXJuIChlbGVtZW50UHJvdG90eXBlWydtYXRjaGVzJ10gfHwgZWxlbWVudFByb3RvdHlwZVsnbXNNYXRjaGVzU2VsZWN0b3InXSlcbiAgICAgICAgLmNhbGwodGhpcy5lbGVtZW50LCBzZWxlY3Rvcik7XG4gIH1cblxuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZWxlbWVudDtcbiAgfVxuXG4gIGFzeW5jIGRpc3BhdGNoRXZlbnQobmFtZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgRXZlbnREYXRhPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlRmFrZUV2ZW50KG5hbWUpO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4gSGF2ZSB0byB1c2UgYE9iamVjdC5hc3NpZ25gIHRvIHByZXNlcnZlIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICBPYmplY3QuYXNzaWduKGV2ZW50LCBkYXRhKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgZXZlbnQpO1xuICAgIGF3YWl0IHRoaXMuX3N0YWJpbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBwb2ludGVyIGV2ZW50IG9uIHRoZSBjdXJyZW50IGVsZW1lbnQgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgaXQuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHBvaW50ZXIgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC5cbiAgICogQHBhcmFtIGNsaWVudFggQ29vcmRpbmF0ZSBvZiB0aGUgdXNlcidzIHBvaW50ZXIgYWxvbmcgdGhlIFggYXhpcy5cbiAgICogQHBhcmFtIGNsaWVudFkgQ29vcmRpbmF0ZSBvZiB0aGUgdXNlcidzIHBvaW50ZXIgYWxvbmcgdGhlIFkgYXhpcy5cbiAgICogQHBhcmFtIGJ1dHRvbiBNb3VzZSBidXR0b24gdGhhdCBzaG91bGQgYmUgcHJlc3NlZCB3aGVuIGRpc3BhdGNoaW5nIHRoZSBldmVudC5cbiAgICovXG4gIHByaXZhdGUgX2Rpc3BhdGNoUG9pbnRlckV2ZW50SWZTdXBwb3J0ZWQoXG4gICAgbmFtZTogc3RyaW5nLCBjbGllbnRYPzogbnVtYmVyLCBjbGllbnRZPzogbnVtYmVyLCBidXR0b24/OiBudW1iZXIpIHtcbiAgICAvLyBUaGUgbGF0ZXN0IHZlcnNpb25zIG9mIGFsbCBicm93c2VycyB3ZSBzdXBwb3J0IGhhdmUgdGhlIG5ldyBgUG9pbnRlckV2ZW50YCBBUEkuXG4gICAgLy8gVGhvdWdoIHNpbmNlIHdlIGNhcHR1cmUgdGhlIHR3byBtb3N0IHJlY2VudCB2ZXJzaW9ucyBvZiB0aGVzZSBicm93c2Vycywgd2UgYWxzb1xuICAgIC8vIG5lZWQgdG8gc3VwcG9ydCBTYWZhcmkgMTIgYXQgdGltZSBvZiB3cml0aW5nLiBTYWZhcmkgMTIgZG9lcyBub3QgaGF2ZSBzdXBwb3J0IGZvciB0aGlzLFxuICAgIC8vIHNvIHdlIG5lZWQgdG8gY29uZGl0aW9uYWxseSBjcmVhdGUgYW5kIGRpc3BhdGNoIHRoZXNlIGV2ZW50cyBiYXNlZCBvbiBmZWF0dXJlIGRldGVjdGlvbi5cbiAgICBpZiAodHlwZW9mIFBvaW50ZXJFdmVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgUG9pbnRlckV2ZW50KSB7XG4gICAgICBkaXNwYXRjaFBvaW50ZXJFdmVudCh0aGlzLmVsZW1lbnQsIG5hbWUsIGNsaWVudFgsIGNsaWVudFksIHtpc1ByaW1hcnk6IHRydWUsIGJ1dHRvbn0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEaXNwYXRjaGVzIGFsbCB0aGUgZXZlbnRzIHRoYXQgYXJlIHBhcnQgb2YgYSBtb3VzZSBldmVudCBzZXF1ZW5jZS4gKi9cbiAgcHJpdmF0ZSBhc3luYyBfZGlzcGF0Y2hNb3VzZUV2ZW50U2VxdWVuY2UoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGFyZ3M6IFtNb2RpZmllcktleXM/XSB8IFsnY2VudGVyJywgTW9kaWZpZXJLZXlzP10gfCBbbnVtYmVyLCBudW1iZXIsIE1vZGlmaWVyS2V5cz9dLFxuICAgIGJ1dHRvbj86IG51bWJlcikge1xuICAgIGxldCBjbGllbnRYOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNsaWVudFk6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbW9kaWZpZXJzOiBNb2RpZmllcktleXMgPSB7fTtcblxuICAgIGlmIChhcmdzLmxlbmd0aCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnb2JqZWN0Jykge1xuICAgICAgbW9kaWZpZXJzID0gYXJncy5wb3AoKSBhcyBNb2RpZmllcktleXM7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7bGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0fSA9IGF3YWl0IHRoaXMuZ2V0RGltZW5zaW9ucygpO1xuICAgICAgY29uc3QgcmVsYXRpdmVYID0gYXJnc1swXSA9PT0gJ2NlbnRlcicgPyB3aWR0aCAvIDIgOiBhcmdzWzBdIGFzIG51bWJlcjtcbiAgICAgIGNvbnN0IHJlbGF0aXZlWSA9IGFyZ3NbMF0gPT09ICdjZW50ZXInID8gaGVpZ2h0IC8gMiA6IGFyZ3NbMV0gYXMgbnVtYmVyO1xuXG4gICAgICAvLyBSb3VuZCB0aGUgY29tcHV0ZWQgY2xpY2sgcG9zaXRpb24gYXMgZGVjaW1hbCBwaXhlbHMgYXJlIG5vdFxuICAgICAgLy8gc3VwcG9ydGVkIGJ5IG1vdXNlIGV2ZW50cyBhbmQgY291bGQgbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gICAgICBjbGllbnRYID0gTWF0aC5yb3VuZChsZWZ0ICsgcmVsYXRpdmVYKTtcbiAgICAgIGNsaWVudFkgPSBNYXRoLnJvdW5kKHRvcCArIHJlbGF0aXZlWSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlzcGF0Y2hQb2ludGVyRXZlbnRJZlN1cHBvcnRlZCgncG9pbnRlcmRvd24nLCBjbGllbnRYLCBjbGllbnRZLCBidXR0b24pO1xuICAgIGRpc3BhdGNoTW91c2VFdmVudCh0aGlzLmVsZW1lbnQsICdtb3VzZWRvd24nLCBjbGllbnRYLCBjbGllbnRZLCBidXR0b24sIG1vZGlmaWVycyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hQb2ludGVyRXZlbnRJZlN1cHBvcnRlZCgncG9pbnRlcnVwJywgY2xpZW50WCwgY2xpZW50WSwgYnV0dG9uKTtcbiAgICBkaXNwYXRjaE1vdXNlRXZlbnQodGhpcy5lbGVtZW50LCAnbW91c2V1cCcsIGNsaWVudFgsIGNsaWVudFksIGJ1dHRvbiwgbW9kaWZpZXJzKTtcbiAgICBkaXNwYXRjaE1vdXNlRXZlbnQodGhpcy5lbGVtZW50LCBuYW1lLCBjbGllbnRYLCBjbGllbnRZLCBidXR0b24sIG1vZGlmaWVycyk7XG5cbiAgICAvLyBUaGlzIGNhbGwgdG8gX3N0YWJpbGl6ZSBzaG91bGQgbm90IGJlIG5lZWRlZCBzaW5jZSB0aGUgY2FsbGVycyB3aWxsIGFscmVhZHkgZG8gdGhhdCB0aGVtLVxuICAgIC8vIHNlbHZlcy4gTmV2ZXJ0aGVsZXNzIGl0IGJyZWFrcyBzb21lIHRlc3RzIGluIGczIHdpdGhvdXQgaXQuIEl0IG5lZWRzIHRvIGJlIGludmVzdGlnYXRlZFxuICAgIC8vIHdoeSByZW1vdmluZyBicmVha3MgdGhvc2UgdGVzdHMuXG4gICAgYXdhaXQgdGhpcy5fc3RhYmlsaXplKCk7XG4gIH1cbn1cbiJdfQ==