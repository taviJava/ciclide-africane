import * as tslib_1 from "tslib";
import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { modalController } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import { AngularDelegate } from './angular-delegate';
var ModalController = /** @class */ (function (_super) {
    tslib_1.__extends(ModalController, _super);
    function ModalController(angularDelegate, resolver, injector) {
        var _this = _super.call(this, modalController) || this;
        _this.angularDelegate = angularDelegate;
        _this.resolver = resolver;
        _this.injector = injector;
        return _this;
    }
    ModalController.prototype.create = function (opts) {
        return _super.prototype.create.call(this, tslib_1.__assign({}, opts, { delegate: this.angularDelegate.create(this.resolver, this.injector) }));
    };
    ModalController.ctorParameters = function () { return [
        { type: AngularDelegate },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    ModalController = tslib_1.__decorate([
        Injectable()
    ], ModalController);
    return ModalController;
}(OverlayBaseController));
export { ModalController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL21vZGFsLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdyRDtJQUFxQywyQ0FBd0Q7SUFFM0YseUJBQ1UsZUFBZ0MsRUFDaEMsUUFBa0MsRUFDbEMsUUFBa0I7UUFINUIsWUFLRSxrQkFBTSxlQUFlLENBQUMsU0FDdkI7UUFMUyxxQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsY0FBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsY0FBUSxHQUFSLFFBQVEsQ0FBVTs7SUFHNUIsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxJQUFrQjtRQUN2QixPQUFPLGlCQUFNLE1BQU0saUNBQ2QsSUFBSSxJQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFDbkUsQ0FBQztJQUNMLENBQUM7O2dCQVowQixlQUFlO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLFFBQVE7O0lBTGpCLGVBQWU7UUFEM0IsVUFBVSxFQUFFO09BQ0EsZUFBZSxDQWdCM0I7SUFBRCxzQkFBQztDQUFBLEFBaEJELENBQXFDLHFCQUFxQixHQWdCekQ7U0FoQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsT3B0aW9ucywgbW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5pbXBvcnQgeyBPdmVybGF5QmFzZUNvbnRyb2xsZXIgfSBmcm9tICcuLi91dGlsL292ZXJsYXknO1xuXG5pbXBvcnQgeyBBbmd1bGFyRGVsZWdhdGUgfSBmcm9tICcuL2FuZ3VsYXItZGVsZWdhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kYWxDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPE1vZGFsT3B0aW9ucywgSFRNTElvbk1vZGFsRWxlbWVudD4ge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhckRlbGVnYXRlOiBBbmd1bGFyRGVsZWdhdGUsXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICApIHtcbiAgICBzdXBlcihtb2RhbENvbnRyb2xsZXIpO1xuICB9XG5cbiAgY3JlYXRlKG9wdHM6IE1vZGFsT3B0aW9ucyk6IFByb21pc2U8SFRNTElvbk1vZGFsRWxlbWVudD4ge1xuICAgIHJldHVybiBzdXBlci5jcmVhdGUoe1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGRlbGVnYXRlOiB0aGlzLmFuZ3VsYXJEZWxlZ2F0ZS5jcmVhdGUodGhpcy5yZXNvbHZlciwgdGhpcy5pbmplY3RvcilcbiAgICB9KTtcbiAgfVxufVxuIl19