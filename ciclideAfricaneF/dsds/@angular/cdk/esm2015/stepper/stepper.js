/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, InjectionToken, Input, Optional, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { of as observableOf, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { CdkStepHeader } from './step-header';
import { CdkStepLabel } from './step-label';
/** Used to generate unique ID for each stepper component. */
let nextId = 0;
/** Change event emitted on selection changes. */
export class StepperSelectionEvent {
}
/** Enum to represent the different states of the steps. */
export const STEP_STATE = {
    NUMBER: 'number',
    EDIT: 'edit',
    DONE: 'done',
    ERROR: 'error'
};
/** InjectionToken that can be used to specify the global stepper options. */
export const STEPPER_GLOBAL_OPTIONS = new InjectionToken('STEPPER_GLOBAL_OPTIONS');
/**
 * InjectionToken that can be used to specify the global stepper options.
 * @deprecated Use `STEPPER_GLOBAL_OPTIONS` instead.
 * @breaking-change 8.0.0.
 */
export const MAT_STEPPER_GLOBAL_OPTIONS = STEPPER_GLOBAL_OPTIONS;
export class CdkStep {
    /** @breaking-change 8.0.0 remove the `?` after `stepperOptions` */
    constructor(_stepper, stepperOptions) {
        this._stepper = _stepper;
        /** Whether user has seen the expanded step content or not. */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._completedOverride = null;
        this._customError = null;
        this._stepperOptions = stepperOptions ? stepperOptions : {};
        this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
        this._showError = !!this._stepperOptions.showError;
    }
    /** Whether the user can return to this step once it has been marked as completed. */
    get editable() {
        return this._editable;
    }
    set editable(value) {
        this._editable = coerceBooleanProperty(value);
    }
    /** Whether the completion of step is optional. */
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    /** Whether step is marked as completed. */
    get completed() {
        return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
    }
    set completed(value) {
        this._completedOverride = coerceBooleanProperty(value);
    }
    _getDefaultCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
    /** Whether step has an error. */
    get hasError() {
        return this._customError == null ? this._getDefaultError() : this._customError;
    }
    set hasError(value) {
        this._customError = coerceBooleanProperty(value);
    }
    _getDefaultError() {
        return this.stepControl && this.stepControl.invalid && this.interacted;
    }
    /** Selects this step component. */
    select() {
        this._stepper.selected = this;
    }
    /** Resets the step to its initial state. Note that this includes resetting form data. */
    reset() {
        this.interacted = false;
        if (this._completedOverride != null) {
            this._completedOverride = false;
        }
        if (this._customError != null) {
            this._customError = false;
        }
        if (this.stepControl) {
            this.stepControl.reset();
        }
    }
    ngOnChanges() {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    }
}
CdkStep.decorators = [
    { type: Component, args: [{
                selector: 'cdk-step',
                exportAs: 'cdkStep',
                template: '<ng-template><ng-content></ng-content></ng-template>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
CdkStep.ctorParameters = () => [
    { type: CdkStepper, decorators: [{ type: Inject, args: [forwardRef(() => CdkStepper),] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [STEPPER_GLOBAL_OPTIONS,] }] }
];
CdkStep.propDecorators = {
    stepLabel: [{ type: ContentChild, args: [CdkStepLabel,] }],
    content: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    stepControl: [{ type: Input }],
    label: [{ type: Input }],
    errorMessage: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    state: [{ type: Input }],
    editable: [{ type: Input }],
    optional: [{ type: Input }],
    completed: [{ type: Input }],
    hasError: [{ type: Input }]
};
export class CdkStepper {
    constructor(_dir, _changeDetectorRef, 
    // @breaking-change 8.0.0 `_elementRef` and `_document` parameters to become required.
    _elementRef, _document) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Steps that belong to the current stepper, excluding ones from nested steppers. */
        this.steps = new QueryList();
        this._linear = false;
        this._selectedIndex = 0;
        /** Event emitted when the selected step has changed. */
        this.selectionChange = new EventEmitter();
        this._orientation = 'horizontal';
        this._groupId = nextId++;
        this._document = _document;
    }
    /** Whether the validity of previous steps should be checked or not. */
    get linear() {
        return this._linear;
    }
    set linear(value) {
        this._linear = coerceBooleanProperty(value);
    }
    /** The index of the selected step. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(index) {
        const newIndex = coerceNumberProperty(index);
        if (this.steps && this._steps) {
            // Ensure that the index can't be out of bounds.
            if (!this._isValidIndex(index) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.');
            }
            if (this._selectedIndex !== newIndex && !this._anyControlsInvalidOrPending(newIndex) &&
                (newIndex >= this._selectedIndex || this.steps.toArray()[newIndex].editable)) {
                this._updateSelectedItemIndex(index);
            }
        }
        else {
            this._selectedIndex = newIndex;
        }
    }
    /** The step that is selected. */
    get selected() {
        // @breaking-change 8.0.0 Change return type to `CdkStep | undefined`.
        return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
    }
    set selected(step) {
        this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
    }
    ngAfterContentInit() {
        this._steps.changes
            .pipe(startWith(this._steps), takeUntil(this._destroyed))
            .subscribe((steps) => {
            this.steps.reset(steps.filter(step => step._stepper === this));
            this.steps.notifyOnChanges();
        });
    }
    ngAfterViewInit() {
        // Note that while the step headers are content children by default, any components that
        // extend this one might have them as view children. We initialize the keyboard handling in
        // AfterViewInit so we're guaranteed for both view and content children to be defined.
        this._keyManager = new FocusKeyManager(this._stepHeader)
            .withWrap()
            .withHomeAndEnd()
            .withVerticalOrientation(this._orientation === 'vertical');
        (this._dir ? this._dir.change : observableOf())
            .pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed))
            .subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
        this._keyManager.updateActiveItem(this._selectedIndex);
        // No need to `takeUntil` here, because we're the ones destroying `steps`.
        this.steps.changes.subscribe(() => {
            if (!this.selected) {
                this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
            }
        });
        // The logic which asserts that the selected index is within bounds doesn't run before the
        // steps are initialized, because we don't how many steps there are yet so we may have an
        // invalid index on init. If that's the case, auto-correct to the default so we don't throw.
        if (!this._isValidIndex(this._selectedIndex)) {
            this._selectedIndex = 0;
        }
    }
    ngOnDestroy() {
        this.steps.destroy();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** Selects and focuses the next step in list. */
    next() {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
    }
    /** Selects and focuses the previous step in list. */
    previous() {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    }
    /** Resets the stepper to its initial state. Note that this includes clearing form data. */
    reset() {
        this._updateSelectedItemIndex(0);
        this.steps.forEach(step => step.reset());
        this._stateChanged();
    }
    /** Returns a unique id for each step label element. */
    _getStepLabelId(i) {
        return `cdk-step-label-${this._groupId}-${i}`;
    }
    /** Returns unique id for each step content element. */
    _getStepContentId(i) {
        return `cdk-step-content-${this._groupId}-${i}`;
    }
    /** Marks the component to be change detected. */
    _stateChanged() {
        this._changeDetectorRef.markForCheck();
    }
    /** Returns position state of the step with the given index. */
    _getAnimationDirection(index) {
        const position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    }
    /** Returns the type of icon to be displayed. */
    _getIndicatorType(index, state = STEP_STATE.NUMBER) {
        const step = this.steps.toArray()[index];
        const isCurrentStep = this._isCurrentStep(index);
        return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) :
            this._getGuidelineLogic(step, isCurrentStep, state);
    }
    _getDefaultIndicatorLogic(step, isCurrentStep) {
        if (step._showError && step.hasError && !isCurrentStep) {
            return STEP_STATE.ERROR;
        }
        else if (!step.completed || isCurrentStep) {
            return STEP_STATE.NUMBER;
        }
        else {
            return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
        }
    }
    _getGuidelineLogic(step, isCurrentStep, state = STEP_STATE.NUMBER) {
        if (step._showError && step.hasError && !isCurrentStep) {
            return STEP_STATE.ERROR;
        }
        else if (step.completed && !isCurrentStep) {
            return STEP_STATE.DONE;
        }
        else if (step.completed && isCurrentStep) {
            return state;
        }
        else if (step.editable && isCurrentStep) {
            return STEP_STATE.EDIT;
        }
        else {
            return state;
        }
    }
    _isCurrentStep(index) {
        return this._selectedIndex === index;
    }
    /** Returns the index of the currently-focused step header. */
    _getFocusIndex() {
        return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
    }
    _updateSelectedItemIndex(newIndex) {
        const stepsArray = this.steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex],
        });
        // If focus is inside the stepper, move it to the next header, otherwise it may become
        // lost when the active step content is hidden. We can't be more granular with the check
        // (e.g. checking whether focus is inside the active step), because we don't have a
        // reference to the elements that are rendering out the content.
        this._containsFocus() ? this._keyManager.setActiveItem(newIndex) :
            this._keyManager.updateActiveItem(newIndex);
        this._selectedIndex = newIndex;
        this._stateChanged();
    }
    _onKeydown(event) {
        const hasModifier = hasModifierKey(event);
        const keyCode = event.keyCode;
        const manager = this._keyManager;
        if (manager.activeItemIndex != null && !hasModifier &&
            (keyCode === SPACE || keyCode === ENTER)) {
            this.selectedIndex = manager.activeItemIndex;
            event.preventDefault();
        }
        else {
            manager.onKeydown(event);
        }
    }
    _anyControlsInvalidOrPending(index) {
        const steps = this.steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(step => {
                const control = step.stepControl;
                const isIncomplete = control ? (control.invalid || control.pending || !step.interacted) : !step.completed;
                return isIncomplete && !step.optional && !step._completedOverride;
            });
        }
        return false;
    }
    _layoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Checks whether the stepper contains the focused element. */
    _containsFocus() {
        if (!this._document || !this._elementRef) {
            return false;
        }
        const stepperElement = this._elementRef.nativeElement;
        const focusedElement = this._document.activeElement;
        return stepperElement === focusedElement || stepperElement.contains(focusedElement);
    }
    /** Checks whether the passed-in index is a valid step index. */
    _isValidIndex(index) {
        return index > -1 && (!this.steps || index < this.steps.length);
    }
}
CdkStepper.decorators = [
    { type: Directive, args: [{
                selector: '[cdkStepper]',
                exportAs: 'cdkStepper',
            },] }
];
CdkStepper.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CdkStepper.propDecorators = {
    _steps: [{ type: ContentChildren, args: [CdkStep, { descendants: true },] }],
    _stepHeader: [{ type: ContentChildren, args: [CdkStepHeader, { descendants: true },] }],
    linear: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    selected: [{ type: Input }],
    selectionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvc3RlcHBlci9zdGVwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBa0IsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFZLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFFTCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBRXJCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixHQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUMsNkRBQTZEO0FBQzdELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVdmLGlEQUFpRDtBQUNqRCxNQUFNLE9BQU8scUJBQXFCO0NBWWpDO0FB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QWM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUNwRCxPQUFPLGNBQWMsS0FBSyxjQUFjLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsZ0VBQWdFO0lBQ3hELGFBQWEsQ0FBQyxLQUFhO1FBQ2pDLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7OztZQW5TRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7WUEvT2tCLGNBQWMsdUJBZ1UxQixRQUFRO1lBcFRiLGlCQUFpQjtZQUtqQixVQUFVOzRDQWlUMEMsTUFBTSxTQUFDLFFBQVE7OztxQkFwRWxFLGVBQWUsU0FBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDOzBCQVU1QyxlQUFlLFNBQUMsYUFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztxQkFHbEQsS0FBSzs0QkFVTCxLQUFLO3VCQXdCTCxLQUFLOzhCQVVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtGb2N1c2FibGVPcHRpb24sIEZvY3VzS2V5TWFuYWdlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VOVEVSLCBoYXNNb2RpZmllcktleSwgU1BBQ0V9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBBZnRlckNvbnRlbnRJbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRoLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtDZGtTdGVwSGVhZGVyfSBmcm9tICcuL3N0ZXAtaGVhZGVyJztcbmltcG9ydCB7Q2RrU3RlcExhYmVsfSBmcm9tICcuL3N0ZXAtbGFiZWwnO1xuXG4vKiogVXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSUQgZm9yIGVhY2ggc3RlcHBlciBjb21wb25lbnQuICovXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBQb3NpdGlvbiBzdGF0ZSBvZiB0aGUgY29udGVudCBvZiBlYWNoIHN0ZXAgaW4gc3RlcHBlciB0aGF0IGlzIHVzZWQgZm9yIHRyYW5zaXRpb25pbmdcbiAqIHRoZSBjb250ZW50IGludG8gY29ycmVjdCBwb3NpdGlvbiB1cG9uIHN0ZXAgc2VsZWN0aW9uIGNoYW5nZS5cbiAqL1xuZXhwb3J0IHR5cGUgU3RlcENvbnRlbnRQb3NpdGlvblN0YXRlID0gJ3ByZXZpb3VzJ3wnY3VycmVudCd8J25leHQnO1xuXG4vKiogUG9zc2libGUgb3JpZW50YXRpb24gb2YgYSBzdGVwcGVyLiAqL1xuZXhwb3J0IHR5cGUgU3RlcHBlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnfCd2ZXJ0aWNhbCc7XG5cbi8qKiBDaGFuZ2UgZXZlbnQgZW1pdHRlZCBvbiBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbmV4cG9ydCBjbGFzcyBTdGVwcGVyU2VsZWN0aW9uRXZlbnQge1xuICAvKiogSW5kZXggb2YgdGhlIHN0ZXAgbm93IHNlbGVjdGVkLiAqL1xuICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cbiAgLyoqIEluZGV4IG9mIHRoZSBzdGVwIHByZXZpb3VzbHkgc2VsZWN0ZWQuICovXG4gIHByZXZpb3VzbHlTZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzdGVwIGluc3RhbmNlIG5vdyBzZWxlY3RlZC4gKi9cbiAgc2VsZWN0ZWRTdGVwOiBDZGtTdGVwO1xuXG4gIC8qKiBUaGUgc3RlcCBpbnN0YW5jZSBwcmV2aW91c2x5IHNlbGVjdGVkLiAqL1xuICBwcmV2aW91c2x5U2VsZWN0ZWRTdGVwOiBDZGtTdGVwO1xufVxuXG4vKiogVGhlIHN0YXRlIG9mIGVhY2ggc3RlcC4gKi9cbmV4cG9ydCB0eXBlIFN0ZXBTdGF0ZSA9ICdudW1iZXInfCdlZGl0J3wnZG9uZSd8J2Vycm9yJ3xzdHJpbmc7XG5cbi8qKiBFbnVtIHRvIHJlcHJlc2VudCB0aGUgZGlmZmVyZW50IHN0YXRlcyBvZiB0aGUgc3RlcHMuICovXG5leHBvcnQgY29uc3QgU1RFUF9TVEFURSA9IHtcbiAgTlVNQkVSOiAnbnVtYmVyJyxcbiAgRURJVDogJ2VkaXQnLFxuICBET05FOiAnZG9uZScsXG4gIEVSUk9SOiAnZXJyb3InXG59O1xuXG4vKiogSW5qZWN0aW9uVG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IHRoZSBnbG9iYWwgc3RlcHBlciBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IFNURVBQRVJfR0xPQkFMX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48U3RlcHBlck9wdGlvbnM+KCdTVEVQUEVSX0dMT0JBTF9PUFRJT05TJyk7XG5cbi8qKlxuICogSW5qZWN0aW9uVG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IHRoZSBnbG9iYWwgc3RlcHBlciBvcHRpb25zLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBTVEVQUEVSX0dMT0JBTF9PUFRJT05TYCBpbnN0ZWFkLlxuICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TVEVQUEVSX0dMT0JBTF9PUFRJT05TID0gU1RFUFBFUl9HTE9CQUxfT1BUSU9OUztcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciBzdGVwcGVyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGVwcGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzdGVwcGVyIHNob3VsZCBkaXNwbGF5IGFuIGVycm9yIHN0YXRlIG9yIG5vdC5cbiAgICogRGVmYXVsdCBiZWhhdmlvciBpcyBhc3N1bWVkIHRvIGJlIGZhbHNlLlxuICAgKi9cbiAgc2hvd0Vycm9yPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc3RlcHBlciBzaG91bGQgZGlzcGxheSB0aGUgZGVmYXVsdCBpbmRpY2F0b3IgdHlwZVxuICAgKiBvciBub3QuXG4gICAqIERlZmF1bHQgYmVoYXZpb3IgaXMgYXNzdW1lZCB0byBiZSB0cnVlLlxuICAgKi9cbiAgZGlzcGxheURlZmF1bHRJbmRpY2F0b3JUeXBlPzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2RrLXN0ZXAnLFxuICBleHBvcnRBczogJ2Nka1N0ZXAnLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrU3RlcCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgX3N0ZXBwZXJPcHRpb25zOiBTdGVwcGVyT3B0aW9ucztcbiAgX3Nob3dFcnJvcjogYm9vbGVhbjtcbiAgX2Rpc3BsYXlEZWZhdWx0SW5kaWNhdG9yVHlwZTogYm9vbGVhbjtcblxuICAvKiogVGVtcGxhdGUgZm9yIHN0ZXAgbGFiZWwgaWYgaXQgZXhpc3RzLiAqL1xuICBAQ29udGVudENoaWxkKENka1N0ZXBMYWJlbCkgc3RlcExhYmVsOiBDZGtTdGVwTGFiZWw7XG5cbiAgLyoqIFRlbXBsYXRlIGZvciBzdGVwIGNvbnRlbnQuICovXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBUaGUgdG9wIGxldmVsIGFic3RyYWN0IGNvbnRyb2wgb2YgdGhlIHN0ZXAuICovXG4gIEBJbnB1dCgpIHN0ZXBDb250cm9sOiBBYnN0cmFjdENvbnRyb2xMaWtlO1xuXG4gIC8qKiBXaGV0aGVyIHVzZXIgaGFzIHNlZW4gdGhlIGV4cGFuZGVkIHN0ZXAgY29udGVudCBvciBub3QuICovXG4gIGludGVyYWN0ZWQgPSBmYWxzZTtcblxuICAvKiogUGxhaW4gdGV4dCBsYWJlbCBvZiB0aGUgc3RlcC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAvKiogRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlcmUncyBhbiBlcnJvci4gKi9cbiAgQElucHV0KCkgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSB0YWIuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdGhhdCB0aGUgdGFiIGlzIGxhYmVsbGVkIGJ5LlxuICAgKiBXaWxsIGJlIGNsZWFyZWQgaWYgYGFyaWEtbGFiZWxgIGlzIHNldCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gIC8qKiBTdGF0ZSBvZiB0aGUgc3RlcC4gKi9cbiAgQElucHV0KCkgc3RhdGU6IFN0ZXBTdGF0ZTtcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBjYW4gcmV0dXJuIHRvIHRoaXMgc3RlcCBvbmNlIGl0IGhhcyBiZWVuIG1hcmtlZCBhcyBjb21wbGV0ZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBlZGl0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGFibGU7XG4gIH1cbiAgc2V0IGVkaXRhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZWRpdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2VkaXRhYmxlID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgY29tcGxldGlvbiBvZiBzdGVwIGlzIG9wdGlvbmFsLiAqL1xuICBASW5wdXQoKVxuICBnZXQgb3B0aW9uYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbmFsO1xuICB9XG4gIHNldCBvcHRpb25hbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wdGlvbmFsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9vcHRpb25hbCA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHN0ZXAgaXMgbWFya2VkIGFzIGNvbXBsZXRlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGxldGVkT3ZlcnJpZGUgPT0gbnVsbCA/IHRoaXMuX2dldERlZmF1bHRDb21wbGV0ZWQoKSA6IHRoaXMuX2NvbXBsZXRlZE92ZXJyaWRlO1xuICB9XG4gIHNldCBjb21wbGV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb21wbGV0ZWRPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX2NvbXBsZXRlZE92ZXJyaWRlOiBib29sZWFufG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX2dldERlZmF1bHRDb21wbGV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcENvbnRyb2wgPyB0aGlzLnN0ZXBDb250cm9sLnZhbGlkICYmIHRoaXMuaW50ZXJhY3RlZCA6IHRoaXMuaW50ZXJhY3RlZDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHN0ZXAgaGFzIGFuIGVycm9yLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGFzRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUVycm9yID09IG51bGwgPyB0aGlzLl9nZXREZWZhdWx0RXJyb3IoKSA6IHRoaXMuX2N1c3RvbUVycm9yO1xuICB9XG4gIHNldCBoYXNFcnJvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2N1c3RvbUVycm9yID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9jdXN0b21FcnJvcjogYm9vbGVhbnxudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF9nZXREZWZhdWx0RXJyb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcENvbnRyb2wgJiYgdGhpcy5zdGVwQ29udHJvbC5pbnZhbGlkICYmIHRoaXMuaW50ZXJhY3RlZDtcbiAgfVxuXG4gIC8qKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHJlbW92ZSB0aGUgYD9gIGFmdGVyIGBzdGVwcGVyT3B0aW9uc2AgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQ2RrU3RlcHBlcikpIHB1YmxpYyBfc3RlcHBlcjogQ2RrU3RlcHBlcixcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU1RFUFBFUl9HTE9CQUxfT1BUSU9OUykgc3RlcHBlck9wdGlvbnM/OiBTdGVwcGVyT3B0aW9ucykge1xuICAgIHRoaXMuX3N0ZXBwZXJPcHRpb25zID0gc3RlcHBlck9wdGlvbnMgPyBzdGVwcGVyT3B0aW9ucyA6IHt9O1xuICAgIHRoaXMuX2Rpc3BsYXlEZWZhdWx0SW5kaWNhdG9yVHlwZSA9IHRoaXMuX3N0ZXBwZXJPcHRpb25zLmRpc3BsYXlEZWZhdWx0SW5kaWNhdG9yVHlwZSAhPT0gZmFsc2U7XG4gICAgdGhpcy5fc2hvd0Vycm9yID0gISF0aGlzLl9zdGVwcGVyT3B0aW9ucy5zaG93RXJyb3I7XG4gIH1cblxuICAvKiogU2VsZWN0cyB0aGlzIHN0ZXAgY29tcG9uZW50LiAqL1xuICBzZWxlY3QoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RlcHBlci5zZWxlY3RlZCA9IHRoaXM7XG4gIH1cblxuICAvKiogUmVzZXRzIHRoZSBzdGVwIHRvIGl0cyBpbml0aWFsIHN0YXRlLiBOb3RlIHRoYXQgdGhpcyBpbmNsdWRlcyByZXNldHRpbmcgZm9ybSBkYXRhLiAqL1xuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmludGVyYWN0ZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jb21wbGV0ZWRPdmVycmlkZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jb21wbGV0ZWRPdmVycmlkZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jdXN0b21FcnJvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jdXN0b21FcnJvciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0ZXBDb250cm9sKSB7XG4gICAgICB0aGlzLnN0ZXBDb250cm9sLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gU2luY2UgYmFzaWNhbGx5IGFsbCBpbnB1dHMgb2YgdGhlIE1hdFN0ZXAgZ2V0IHByb3hpZWQgdGhyb3VnaCB0aGUgdmlldyBkb3duIHRvIHRoZVxuICAgIC8vIHVuZGVybHlpbmcgTWF0U3RlcEhlYWRlciwgd2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgY29ycmVjdGx5LlxuICAgIHRoaXMuX3N0ZXBwZXIuX3N0YXRlQ2hhbmdlZCgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2VkaXRhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oYXNFcnJvcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3B0aW9uYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NvbXBsZXRlZDogQm9vbGVhbklucHV0O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrU3RlcHBlcl0nLFxuICBleHBvcnRBczogJ2Nka1N0ZXBwZXInLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtTdGVwcGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogVXNlZCBmb3IgbWFuYWdpbmcga2V5Ym9hcmQgZm9jdXMuICovXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxGb2N1c2FibGVPcHRpb24+O1xuXG4gIC8qKlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIFJlbW92ZSBgfCB1bmRlZmluZWRgIG9uY2UgdGhlIGBfZG9jdW1lbnRgXG4gICAqIGNvbnN0cnVjdG9yIHBhcmFtIGlzIHJlcXVpcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50fHVuZGVmaW5lZDtcblxuICAvKiogRnVsbCBsaXN0IG9mIHN0ZXBzIGluc2lkZSB0aGUgc3RlcHBlciwgaW5jbHVkaW5nIGluc2lkZSBuZXN0ZWQgc3RlcHBlcnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2RrU3RlcCwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgX3N0ZXBzOiBRdWVyeUxpc3Q8Q2RrU3RlcD47XG5cbiAgLyoqIFN0ZXBzIHRoYXQgYmVsb25nIHRvIHRoZSBjdXJyZW50IHN0ZXBwZXIsIGV4Y2x1ZGluZyBvbmVzIGZyb20gbmVzdGVkIHN0ZXBwZXJzLiAqL1xuICByZWFkb25seSBzdGVwczogUXVlcnlMaXN0PENka1N0ZXA+ID0gbmV3IFF1ZXJ5TGlzdDxDZGtTdGVwPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBzdGVwIGhlYWRlcnMgb2YgdGhlIHN0ZXBzIGluIHRoZSBzdGVwcGVyLlxuICAgKiBAZGVwcmVjYXRlZCBUeXBlIHRvIGJlIGNoYW5nZWQgdG8gYFF1ZXJ5TGlzdDxDZGtTdGVwSGVhZGVyPmAuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2RrU3RlcEhlYWRlciwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgX3N0ZXBIZWFkZXI6IFF1ZXJ5TGlzdDxGb2N1c2FibGVPcHRpb24+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB2YWxpZGl0eSBvZiBwcmV2aW91cyBzdGVwcyBzaG91bGQgYmUgY2hlY2tlZCBvciBub3QuICovXG4gIEBJbnB1dCgpXG4gIGdldCBsaW5lYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmVhcjtcbiAgfVxuICBzZXQgbGluZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGluZWFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9saW5lYXIgPSBmYWxzZTtcblxuICAvKiogVGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBzdGVwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgbmV3SW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShpbmRleCk7XG5cbiAgICBpZiAodGhpcy5zdGVwcyAmJiB0aGlzLl9zdGVwcykge1xuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGluZGV4IGNhbid0IGJlIG91dCBvZiBib3VuZHMuXG4gICAgICBpZiAoIXRoaXMuX2lzVmFsaWRJbmRleChpbmRleCkgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2Nka1N0ZXBwZXI6IENhbm5vdCBhc3NpZ24gb3V0LW9mLWJvdW5kcyB2YWx1ZSB0byBgc2VsZWN0ZWRJbmRleGAuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBuZXdJbmRleCAmJiAhdGhpcy5fYW55Q29udHJvbHNJbnZhbGlkT3JQZW5kaW5nKG5ld0luZGV4KSAmJlxuICAgICAgICAgIChuZXdJbmRleCA+PSB0aGlzLl9zZWxlY3RlZEluZGV4IHx8IHRoaXMuc3RlcHMudG9BcnJheSgpW25ld0luZGV4XS5lZGl0YWJsZSkpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRJdGVtSW5kZXgoaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXggPSAwO1xuXG4gIC8qKiBUaGUgc3RlcCB0aGF0IGlzIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogQ2RrU3RlcCB7XG4gICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBDaGFuZ2UgcmV0dXJuIHR5cGUgdG8gYENka1N0ZXAgfCB1bmRlZmluZWRgLlxuICAgIHJldHVybiB0aGlzLnN0ZXBzID8gdGhpcy5zdGVwcy50b0FycmF5KClbdGhpcy5zZWxlY3RlZEluZGV4XSA6IHVuZGVmaW5lZCE7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHN0ZXA6IENka1N0ZXApIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnN0ZXBzID8gdGhpcy5zdGVwcy50b0FycmF5KCkuaW5kZXhPZihzdGVwKSA6IC0xO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgc3RlcCBoYXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFN0ZXBwZXJTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFN0ZXBwZXJTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvKiogVXNlZCB0byB0cmFjayB1bmlxdWUgSUQgZm9yIGVhY2ggc3RlcHBlciBjb21wb25lbnQuICovXG4gIF9ncm91cElkOiBudW1iZXI7XG5cbiAgcHJvdGVjdGVkIF9vcmllbnRhdGlvbjogU3RlcHBlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgX2VsZW1lbnRSZWZgIGFuZCBgX2RvY3VtZW50YCBwYXJhbWV0ZXJzIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY/OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XG4gICAgdGhpcy5fZ3JvdXBJZCA9IG5leHRJZCsrO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3N0ZXBzLmNoYW5nZXNcbiAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLl9zdGVwcyksIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoc3RlcHM6IFF1ZXJ5TGlzdDxDZGtTdGVwPikgPT4ge1xuICAgICAgICB0aGlzLnN0ZXBzLnJlc2V0KHN0ZXBzLmZpbHRlcihzdGVwID0+IHN0ZXAuX3N0ZXBwZXIgPT09IHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdGVwcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIE5vdGUgdGhhdCB3aGlsZSB0aGUgc3RlcCBoZWFkZXJzIGFyZSBjb250ZW50IGNoaWxkcmVuIGJ5IGRlZmF1bHQsIGFueSBjb21wb25lbnRzIHRoYXRcbiAgICAvLyBleHRlbmQgdGhpcyBvbmUgbWlnaHQgaGF2ZSB0aGVtIGFzIHZpZXcgY2hpbGRyZW4uIFdlIGluaXRpYWxpemUgdGhlIGtleWJvYXJkIGhhbmRsaW5nIGluXG4gICAgLy8gQWZ0ZXJWaWV3SW5pdCBzbyB3ZSdyZSBndWFyYW50ZWVkIGZvciBib3RoIHZpZXcgYW5kIGNvbnRlbnQgY2hpbGRyZW4gdG8gYmUgZGVmaW5lZC5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxGb2N1c2FibGVPcHRpb24+KHRoaXMuX3N0ZXBIZWFkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAud2l0aFdyYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhIb21lQW5kRW5kKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbih0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyk7XG5cbiAgICAodGhpcy5fZGlyID8gKHRoaXMuX2Rpci5jaGFuZ2UgYXMgT2JzZXJ2YWJsZTxEaXJlY3Rpb24+KSA6IG9ic2VydmFibGVPZjxEaXJlY3Rpb24+KCkpXG4gICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLl9sYXlvdXREaXJlY3Rpb24oKSksIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGRpcmVjdGlvbiA9PiB0aGlzLl9rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyZWN0aW9uKSk7XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0odGhpcy5fc2VsZWN0ZWRJbmRleCk7XG5cbiAgICAvLyBObyBuZWVkIHRvIGB0YWtlVW50aWxgIGhlcmUsIGJlY2F1c2Ugd2UncmUgdGhlIG9uZXMgZGVzdHJveWluZyBgc3RlcHNgLlxuICAgIHRoaXMuc3RlcHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBNYXRoLm1heCh0aGlzLl9zZWxlY3RlZEluZGV4IC0gMSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUaGUgbG9naWMgd2hpY2ggYXNzZXJ0cyB0aGF0IHRoZSBzZWxlY3RlZCBpbmRleCBpcyB3aXRoaW4gYm91bmRzIGRvZXNuJ3QgcnVuIGJlZm9yZSB0aGVcbiAgICAvLyBzdGVwcyBhcmUgaW5pdGlhbGl6ZWQsIGJlY2F1c2Ugd2UgZG9uJ3QgaG93IG1hbnkgc3RlcHMgdGhlcmUgYXJlIHlldCBzbyB3ZSBtYXkgaGF2ZSBhblxuICAgIC8vIGludmFsaWQgaW5kZXggb24gaW5pdC4gSWYgdGhhdCdzIHRoZSBjYXNlLCBhdXRvLWNvcnJlY3QgdG8gdGhlIGRlZmF1bHQgc28gd2UgZG9uJ3QgdGhyb3cuXG4gICAgaWYgKCF0aGlzLl9pc1ZhbGlkSW5kZXgodGhpcy5fc2VsZWN0ZWRJbmRleCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RlcHMuZGVzdHJveSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogU2VsZWN0cyBhbmQgZm9jdXNlcyB0aGUgbmV4dCBzdGVwIGluIGxpc3QuICovXG4gIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4odGhpcy5fc2VsZWN0ZWRJbmRleCArIDEsIHRoaXMuc3RlcHMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKiogU2VsZWN0cyBhbmQgZm9jdXNlcyB0aGUgcHJldmlvdXMgc3RlcCBpbiBsaXN0LiAqL1xuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1heCh0aGlzLl9zZWxlY3RlZEluZGV4IC0gMSwgMCk7XG4gIH1cblxuICAvKiogUmVzZXRzIHRoZSBzdGVwcGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLiBOb3RlIHRoYXQgdGhpcyBpbmNsdWRlcyBjbGVhcmluZyBmb3JtIGRhdGEuICovXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkSXRlbUluZGV4KDApO1xuICAgIHRoaXMuc3RlcHMuZm9yRWFjaChzdGVwID0+IHN0ZXAucmVzZXQoKSk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VkKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBzdGVwIGxhYmVsIGVsZW1lbnQuICovXG4gIF9nZXRTdGVwTGFiZWxJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgY2RrLXN0ZXAtbGFiZWwtJHt0aGlzLl9ncm91cElkfS0ke2l9YDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHVuaXF1ZSBpZCBmb3IgZWFjaCBzdGVwIGNvbnRlbnQgZWxlbWVudC4gKi9cbiAgX2dldFN0ZXBDb250ZW50SWQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGNkay1zdGVwLWNvbnRlbnQtJHt0aGlzLl9ncm91cElkfS0ke2l9YDtcbiAgfVxuXG4gIC8qKiBNYXJrcyB0aGUgY29tcG9uZW50IHRvIGJlIGNoYW5nZSBkZXRlY3RlZC4gKi9cbiAgX3N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHBvc2l0aW9uIHN0YXRlIG9mIHRoZSBzdGVwIHdpdGggdGhlIGdpdmVuIGluZGV4LiAqL1xuICBfZ2V0QW5pbWF0aW9uRGlyZWN0aW9uKGluZGV4OiBudW1iZXIpOiBTdGVwQ29udGVudFBvc2l0aW9uU3RhdGUge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gaW5kZXggLSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXlvdXREaXJlY3Rpb24oKSA9PT0gJ3J0bCcgPyAnbmV4dCcgOiAncHJldmlvdXMnO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGF5b3V0RGlyZWN0aW9uKCkgPT09ICdydGwnID8gJ3ByZXZpb3VzJyA6ICduZXh0JztcbiAgICB9XG4gICAgcmV0dXJuICdjdXJyZW50JztcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSB0eXBlIG9mIGljb24gdG8gYmUgZGlzcGxheWVkLiAqL1xuICBfZ2V0SW5kaWNhdG9yVHlwZShpbmRleDogbnVtYmVyLCBzdGF0ZTogU3RlcFN0YXRlID0gU1RFUF9TVEFURS5OVU1CRVIpOiBTdGVwU3RhdGUge1xuICAgIGNvbnN0IHN0ZXAgPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgY29uc3QgaXNDdXJyZW50U3RlcCA9IHRoaXMuX2lzQ3VycmVudFN0ZXAoaW5kZXgpO1xuXG4gICAgcmV0dXJuIHN0ZXAuX2Rpc3BsYXlEZWZhdWx0SW5kaWNhdG9yVHlwZSA/IHRoaXMuX2dldERlZmF1bHRJbmRpY2F0b3JMb2dpYyhzdGVwLCBpc0N1cnJlbnRTdGVwKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldEd1aWRlbGluZUxvZ2ljKHN0ZXAsIGlzQ3VycmVudFN0ZXAsIHN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERlZmF1bHRJbmRpY2F0b3JMb2dpYyhzdGVwOiBDZGtTdGVwLCBpc0N1cnJlbnRTdGVwOiBib29sZWFuKTogU3RlcFN0YXRlIHtcbiAgICBpZiAoc3RlcC5fc2hvd0Vycm9yICYmIHN0ZXAuaGFzRXJyb3IgJiYgIWlzQ3VycmVudFN0ZXApIHtcbiAgICAgIHJldHVybiBTVEVQX1NUQVRFLkVSUk9SO1xuICAgIH0gZWxzZSBpZiAoIXN0ZXAuY29tcGxldGVkIHx8IGlzQ3VycmVudFN0ZXApIHtcbiAgICAgIHJldHVybiBTVEVQX1NUQVRFLk5VTUJFUjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0ZXAuZWRpdGFibGUgPyBTVEVQX1NUQVRFLkVESVQgOiBTVEVQX1NUQVRFLkRPTkU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0R3VpZGVsaW5lTG9naWMoXG4gICAgICBzdGVwOiBDZGtTdGVwLCBpc0N1cnJlbnRTdGVwOiBib29sZWFuLCBzdGF0ZTogU3RlcFN0YXRlID0gU1RFUF9TVEFURS5OVU1CRVIpOiBTdGVwU3RhdGUge1xuICAgIGlmIChzdGVwLl9zaG93RXJyb3IgJiYgc3RlcC5oYXNFcnJvciAmJiAhaXNDdXJyZW50U3RlcCkge1xuICAgICAgcmV0dXJuIFNURVBfU1RBVEUuRVJST1I7XG4gICAgfSBlbHNlIGlmIChzdGVwLmNvbXBsZXRlZCAmJiAhaXNDdXJyZW50U3RlcCkge1xuICAgICAgcmV0dXJuIFNURVBfU1RBVEUuRE9ORTtcbiAgICB9IGVsc2UgaWYgKHN0ZXAuY29tcGxldGVkICYmIGlzQ3VycmVudFN0ZXApIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9IGVsc2UgaWYgKHN0ZXAuZWRpdGFibGUgJiYgaXNDdXJyZW50U3RlcCkge1xuICAgICAgcmV0dXJuIFNURVBfU1RBVEUuRURJVDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzQ3VycmVudFN0ZXAoaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4ID09PSBpbmRleDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudGx5LWZvY3VzZWQgc3RlcCBoZWFkZXIuICovXG4gIF9nZXRGb2N1c0luZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyID8gdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggOiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0ZWRJdGVtSW5kZXgobmV3SW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHN0ZXBzQXJyYXkgPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgIHNlbGVjdGVkSW5kZXg6IG5ld0luZGV4LFxuICAgICAgcHJldmlvdXNseVNlbGVjdGVkSW5kZXg6IHRoaXMuX3NlbGVjdGVkSW5kZXgsXG4gICAgICBzZWxlY3RlZFN0ZXA6IHN0ZXBzQXJyYXlbbmV3SW5kZXhdLFxuICAgICAgcHJldmlvdXNseVNlbGVjdGVkU3RlcDogc3RlcHNBcnJheVt0aGlzLl9zZWxlY3RlZEluZGV4XSxcbiAgICB9KTtcblxuICAgIC8vIElmIGZvY3VzIGlzIGluc2lkZSB0aGUgc3RlcHBlciwgbW92ZSBpdCB0byB0aGUgbmV4dCBoZWFkZXIsIG90aGVyd2lzZSBpdCBtYXkgYmVjb21lXG4gICAgLy8gbG9zdCB3aGVuIHRoZSBhY3RpdmUgc3RlcCBjb250ZW50IGlzIGhpZGRlbi4gV2UgY2FuJ3QgYmUgbW9yZSBncmFudWxhciB3aXRoIHRoZSBjaGVja1xuICAgIC8vIChlLmcuIGNoZWNraW5nIHdoZXRoZXIgZm9jdXMgaXMgaW5zaWRlIHRoZSBhY3RpdmUgc3RlcCksIGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSBhXG4gICAgLy8gcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50cyB0aGF0IGFyZSByZW5kZXJpbmcgb3V0IHRoZSBjb250ZW50LlxuICAgIHRoaXMuX2NvbnRhaW5zRm9jdXMoKSA/IHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShuZXdJbmRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShuZXdJbmRleCk7XG5cbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gbmV3SW5kZXg7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VkKCk7XG4gIH1cblxuICBfb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaGFzTW9kaWZpZXIgPSBoYXNNb2RpZmllcktleShldmVudCk7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG5cbiAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT0gbnVsbCAmJiAhaGFzTW9kaWZpZXIgJiZcbiAgICAgICAgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gbWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYW55Q29udHJvbHNJbnZhbGlkT3JQZW5kaW5nKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcHMudG9BcnJheSgpO1xuXG4gICAgc3RlcHNbdGhpcy5fc2VsZWN0ZWRJbmRleF0uaW50ZXJhY3RlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fbGluZWFyICYmIGluZGV4ID49IDApIHtcbiAgICAgIHJldHVybiBzdGVwcy5zbGljZSgwLCBpbmRleCkuc29tZShzdGVwID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IHN0ZXAuc3RlcENvbnRyb2w7XG4gICAgICAgIGNvbnN0IGlzSW5jb21wbGV0ZSA9XG4gICAgICAgICAgICBjb250cm9sID8gKGNvbnRyb2wuaW52YWxpZCB8fCBjb250cm9sLnBlbmRpbmcgfHwgIXN0ZXAuaW50ZXJhY3RlZCkgOiAhc3RlcC5jb21wbGV0ZWQ7XG4gICAgICAgIHJldHVybiBpc0luY29tcGxldGUgJiYgIXN0ZXAub3B0aW9uYWwgJiYgIXN0ZXAuX2NvbXBsZXRlZE92ZXJyaWRlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGF5b3V0RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgc3RlcHBlciBjb250YWlucyB0aGUgZm9jdXNlZCBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9jb250YWluc0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fZG9jdW1lbnQgfHwgIXRoaXMuX2VsZW1lbnRSZWYpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGVwcGVyRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuIHN0ZXBwZXJFbGVtZW50ID09PSBmb2N1c2VkRWxlbWVudCB8fCBzdGVwcGVyRWxlbWVudC5jb250YWlucyhmb2N1c2VkRWxlbWVudCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIHBhc3NlZC1pbiBpbmRleCBpcyBhIHZhbGlkIHN0ZXAgaW5kZXguICovXG4gIHByaXZhdGUgX2lzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ID4gLTEgJiYgKCF0aGlzLnN0ZXBzIHx8IGluZGV4IDwgdGhpcy5zdGVwcy5sZW5ndGgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2VkaXRhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcHRpb25hbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29tcGxldGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oYXNFcnJvcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGluZWFyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zZWxlY3RlZEluZGV4OiBOdW1iZXJJbnB1dDtcbn1cblxuXG4vKipcbiAqIFNpbXBsaWZpZWQgcmVwcmVzZW50YXRpb24gb2YgYW4gXCJBYnN0cmFjdENvbnRyb2xcIiBmcm9tIEBhbmd1bGFyL2Zvcm1zLlxuICogVXNlZCB0byBhdm9pZCBoYXZpbmcgdG8gYnJpbmcgaW4gQGFuZ3VsYXIvZm9ybXMgZm9yIGEgc2luZ2xlIG9wdGlvbmFsIGludGVyZmFjZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuaW50ZXJmYWNlIEFic3RyYWN0Q29udHJvbExpa2Uge1xuICBhc3luY1ZhbGlkYXRvcjogKChjb250cm9sOiBhbnkpID0+IGFueSkgfCBudWxsO1xuICBkaXJ0eTogYm9vbGVhbjtcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGVycm9yczoge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsO1xuICBpbnZhbGlkOiBib29sZWFuO1xuICBwYXJlbnQ6IGFueTtcbiAgcGVuZGluZzogYm9vbGVhbjtcbiAgcHJpc3RpbmU6IGJvb2xlYW47XG4gIHJvb3Q6IEFic3RyYWN0Q29udHJvbExpa2U7XG4gIHN0YXR1czogc3RyaW5nO1xuICBzdGF0dXNDaGFuZ2VzOiBPYnNlcnZhYmxlPGFueT47XG4gIHRvdWNoZWQ6IGJvb2xlYW47XG4gIHVudG91Y2hlZDogYm9vbGVhbjtcbiAgdXBkYXRlT246IGFueTtcbiAgdmFsaWQ6IGJvb2xlYW47XG4gIHZhbGlkYXRvcjogKChjb250cm9sOiBhbnkpID0+IGFueSkgfCBudWxsO1xuICB2YWx1ZTogYW55O1xuICB2YWx1ZUNoYW5nZXM6IE9ic2VydmFibGU8YW55PjtcbiAgY2xlYXJBc3luY1ZhbGlkYXRvcnMoKTogdm9pZDtcbiAgY2xlYXJWYWxpZGF0b3JzKCk6IHZvaWQ7XG4gIGRpc2FibGUob3B0cz86IGFueSk6IHZvaWQ7XG4gIGVuYWJsZShvcHRzPzogYW55KTogdm9pZDtcbiAgZ2V0KHBhdGg6IChzdHJpbmcgfCBudW1iZXIpW10gfCBzdHJpbmcpOiBBYnN0cmFjdENvbnRyb2xMaWtlIHwgbnVsbDtcbiAgZ2V0RXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIHBhdGg/OiAoc3RyaW5nIHwgbnVtYmVyKVtdIHwgc3RyaW5nKTogYW55O1xuICBoYXNFcnJvcihlcnJvckNvZGU6IHN0cmluZywgcGF0aD86IChzdHJpbmcgfCBudW1iZXIpW10gfCBzdHJpbmcpOiBib29sZWFuO1xuICBtYXJrQWxsQXNUb3VjaGVkKCk6IHZvaWQ7XG4gIG1hcmtBc0RpcnR5KG9wdHM/OiBhbnkpOiB2b2lkO1xuICBtYXJrQXNQZW5kaW5nKG9wdHM/OiBhbnkpOiB2b2lkO1xuICBtYXJrQXNQcmlzdGluZShvcHRzPzogYW55KTogdm9pZDtcbiAgbWFya0FzVG91Y2hlZChvcHRzPzogYW55KTogdm9pZDtcbiAgbWFya0FzVW50b3VjaGVkKG9wdHM/OiBhbnkpOiB2b2lkO1xuICBwYXRjaFZhbHVlKHZhbHVlOiBhbnksIG9wdGlvbnM/OiBPYmplY3QpOiB2b2lkO1xuICByZXNldCh2YWx1ZT86IGFueSwgb3B0aW9ucz86IE9iamVjdCk6IHZvaWQ7XG4gIHNldEFzeW5jVmFsaWRhdG9ycyhuZXdWYWxpZGF0b3I6IChjb250cm9sOiBhbnkpID0+IGFueSB8XG4gICAgKChjb250cm9sOiBhbnkpID0+IGFueSlbXSB8IG51bGwpOiB2b2lkO1xuICBzZXRFcnJvcnMoZXJyb3JzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsIG9wdHM/OiBhbnkpOiB2b2lkO1xuICBzZXRQYXJlbnQocGFyZW50OiBhbnkpOiB2b2lkO1xuICBzZXRWYWxpZGF0b3JzKG5ld1ZhbGlkYXRvcjogKGNvbnRyb2w6IGFueSkgPT4gYW55IHxcbiAgICAoKGNvbnRyb2w6IGFueSkgPT4gYW55KVtdIHwgbnVsbCk6IHZvaWQ7XG4gIHNldFZhbHVlKHZhbHVlOiBhbnksIG9wdGlvbnM/OiBPYmplY3QpOiB2b2lkO1xuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9wdHM/OiBhbnkpOiB2b2lkO1xuICBwYXRjaFZhbHVlKHZhbHVlOiBhbnksIG9wdGlvbnM/OiBhbnkpOiB2b2lkO1xuICByZXNldChmb3JtU3RhdGU/OiBhbnksIG9wdGlvbnM/OiBhbnkpOiB2b2lkO1xuICBzZXRWYWx1ZSh2YWx1ZTogYW55LCBvcHRpb25zPzogYW55KTogdm9pZDtcbn1cbiJdfQ==