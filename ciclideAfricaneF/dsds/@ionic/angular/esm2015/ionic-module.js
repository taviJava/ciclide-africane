import * as tslib_1 from "tslib";
var IonicModule_1;
import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { appInitialize } from './app-initialize';
import { BooleanValueAccessor } from './directives/control-value-accessors/boolean-value-accessor';
import { NumericValueAccessor } from './directives/control-value-accessors/numeric-value-accesssor';
import { RadioValueAccessor } from './directives/control-value-accessors/radio-value-accessor';
import { SelectValueAccessor } from './directives/control-value-accessors/select-value-accessor';
import { TextValueAccessor } from './directives/control-value-accessors/text-value-accessor';
import { IonBackButtonDelegate } from './directives/navigation/ion-back-button';
import { IonRouterOutlet } from './directives/navigation/ion-router-outlet';
import { IonTabs } from './directives/navigation/ion-tabs';
import { NavDelegate } from './directives/navigation/nav-delegate';
import { RouterLinkDelegate } from './directives/navigation/router-link-delegate';
import { IonApp, IonAvatar, IonBackButton, IonBackdrop, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonNav, IonNavLink, IonNote, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSkeletonText, IonSlide, IonSlides, IonSpinner, IonSplitPane, IonTabBar, IonTabButton, IonText, IonTextarea, IonThumbnail, IonTitle, IonToggle, IonToolbar } from './directives/proxies';
import { VirtualFooter } from './directives/virtual-scroll/virtual-footer';
import { VirtualHeader } from './directives/virtual-scroll/virtual-header';
import { VirtualItem } from './directives/virtual-scroll/virtual-item';
import { IonVirtualScroll } from './directives/virtual-scroll/virtual-scroll';
import { AngularDelegate } from './providers/angular-delegate';
import { ConfigToken } from './providers/config';
import { ModalController } from './providers/modal-controller';
import { PopoverController } from './providers/popover-controller';
const DECLARATIONS = [
    // proxies
    IonApp,
    IonAvatar,
    IonBackButton,
    IonBackdrop,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNav,
    IonNavLink,
    IonNote,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSlide,
    IonSlides,
    IonSpinner,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonToggle,
    IonToolbar,
    IonTitle,
    IonTabs,
    // ngModel accessors
    BooleanValueAccessor,
    NumericValueAccessor,
    RadioValueAccessor,
    SelectValueAccessor,
    TextValueAccessor,
    // navigation
    IonRouterOutlet,
    IonBackButtonDelegate,
    NavDelegate,
    RouterLinkDelegate,
    // virtual scroll
    VirtualFooter,
    VirtualHeader,
    VirtualItem,
    IonVirtualScroll
];
let IonicModule = IonicModule_1 = class IonicModule {
    static forRoot(config) {
        return {
            ngModule: IonicModule_1,
            providers: [
                {
                    provide: ConfigToken,
                    useValue: config
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [
                        ConfigToken,
                        DOCUMENT,
                        NgZone
                    ]
                }
            ]
        };
    }
};
IonicModule = IonicModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: DECLARATIONS,
        exports: DECLARATIONS,
        providers: [AngularDelegate, ModalController, PopoverController],
        imports: [CommonModule]
    })
], IonicModule);
export { IonicModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJpb25pYy1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQXVCLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFV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QXFCO0lBQ3JCLFdBQVc7SUFDWCxrQkFBa0I7SUFFbEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixhQUFhO0lBQ2IsV0FBVztJQUNYLGdCQUFnQjtDQUNqQixDQUFDO0FBUUYsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVc7SUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUNqQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQVc7WUFDckIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxJQUFJLEVBQUU7d0JBQ0osV0FBVzt3QkFDWCxRQUFRO3dCQUNSLE1BQU07cUJBQ1A7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXRCWSxXQUFXO0lBTnZCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxZQUFZO1FBQzFCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLENBQUM7UUFDaEUsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVyxXQUFXLENBc0J2QjtTQXRCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElvbmljQ29uZmlnIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5pbXBvcnQgeyBhcHBJbml0aWFsaXplIH0gZnJvbSAnLi9hcHAtaW5pdGlhbGl6ZSc7XG5pbXBvcnQgeyBCb29sZWFuVmFsdWVBY2Nlc3NvciB9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy9ib29sZWFuLXZhbHVlLWFjY2Vzc29yJztcbmltcG9ydCB7IE51bWVyaWNWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL251bWVyaWMtdmFsdWUtYWNjZXNzc29yJztcbmltcG9ydCB7IFJhZGlvVmFsdWVBY2Nlc3NvciB9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy9yYWRpby12YWx1ZS1hY2Nlc3Nvcic7XG5pbXBvcnQgeyBTZWxlY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL3NlbGVjdC12YWx1ZS1hY2Nlc3Nvcic7XG5pbXBvcnQgeyBUZXh0VmFsdWVBY2Nlc3NvciB9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy90ZXh0LXZhbHVlLWFjY2Vzc29yJztcbmltcG9ydCB7IElvbkJhY2tCdXR0b25EZWxlZ2F0ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL2lvbi1iYWNrLWJ1dHRvbic7XG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldCc7XG5pbXBvcnQgeyBJb25UYWJzIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLXRhYnMnO1xuaW1wb3J0IHsgTmF2RGVsZWdhdGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9uYXYtZGVsZWdhdGUnO1xuaW1wb3J0IHsgUm91dGVyTGlua0RlbGVnYXRlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vcm91dGVyLWxpbmstZGVsZWdhdGUnO1xuaW1wb3J0IHsgSW9uQXBwLCBJb25BdmF0YXIsIElvbkJhY2tCdXR0b24sIElvbkJhY2tkcm9wLCBJb25CYWRnZSwgSW9uQnV0dG9uLCBJb25CdXR0b25zLCBJb25DYXJkLCBJb25DYXJkQ29udGVudCwgSW9uQ2FyZEhlYWRlciwgSW9uQ2FyZFN1YnRpdGxlLCBJb25DYXJkVGl0bGUsIElvbkNoZWNrYm94LCBJb25DaGlwLCBJb25Db2wsIElvbkNvbnRlbnQsIElvbkRhdGV0aW1lLCBJb25GYWIsIElvbkZhYkJ1dHRvbiwgSW9uRmFiTGlzdCwgSW9uRm9vdGVyLCBJb25HcmlkLCBJb25IZWFkZXIsIElvbkljb24sIElvbkltZywgSW9uSW5maW5pdGVTY3JvbGwsIElvbkluZmluaXRlU2Nyb2xsQ29udGVudCwgSW9uSW5wdXQsIElvbkl0ZW0sIElvbkl0ZW1EaXZpZGVyLCBJb25JdGVtR3JvdXAsIElvbkl0ZW1PcHRpb24sIElvbkl0ZW1PcHRpb25zLCBJb25JdGVtU2xpZGluZywgSW9uTGFiZWwsIElvbkxpc3QsIElvbkxpc3RIZWFkZXIsIElvbk1lbnUsIElvbk1lbnVCdXR0b24sIElvbk1lbnVUb2dnbGUsIElvbk5hdiwgSW9uTmF2TGluaywgSW9uTm90ZSwgSW9uUHJvZ3Jlc3NCYXIsIElvblJhZGlvLCBJb25SYWRpb0dyb3VwLCBJb25SYW5nZSwgSW9uUmVmcmVzaGVyLCBJb25SZWZyZXNoZXJDb250ZW50LCBJb25SZW9yZGVyLCBJb25SZW9yZGVyR3JvdXAsIElvblJpcHBsZUVmZmVjdCwgSW9uUm93LCBJb25TZWFyY2hiYXIsIElvblNlZ21lbnQsIElvblNlZ21lbnRCdXR0b24sIElvblNlbGVjdCwgSW9uU2VsZWN0T3B0aW9uLCBJb25Ta2VsZXRvblRleHQsIElvblNsaWRlLCBJb25TbGlkZXMsIElvblNwaW5uZXIsIElvblNwbGl0UGFuZSwgSW9uVGFiQmFyLCBJb25UYWJCdXR0b24sIElvblRleHQsIElvblRleHRhcmVhLCBJb25UaHVtYm5haWwsIElvblRpdGxlLCBJb25Ub2dnbGUsIElvblRvb2xiYXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJveGllcyc7XG5pbXBvcnQgeyBWaXJ0dWFsRm9vdGVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtZm9vdGVyJztcbmltcG9ydCB7IFZpcnR1YWxIZWFkZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1oZWFkZXInO1xuaW1wb3J0IHsgVmlydHVhbEl0ZW0gfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1pdGVtJztcbmltcG9ydCB7IElvblZpcnR1YWxTY3JvbGwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwnO1xuaW1wb3J0IHsgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5ndWxhci1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBDb25maWdUb2tlbiB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbmZpZyc7XG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9tb2RhbC1jb250cm9sbGVyJztcbmltcG9ydCB7IFBvcG92ZXJDb250cm9sbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci1jb250cm9sbGVyJztcblxuY29uc3QgREVDTEFSQVRJT05TID0gW1xuICAvLyBwcm94aWVzXG4gIElvbkFwcCxcbiAgSW9uQXZhdGFyLFxuICBJb25CYWNrQnV0dG9uLFxuICBJb25CYWNrZHJvcCxcbiAgSW9uQmFkZ2UsXG4gIElvbkJ1dHRvbixcbiAgSW9uQnV0dG9ucyxcbiAgSW9uQ2FyZCxcbiAgSW9uQ2FyZENvbnRlbnQsXG4gIElvbkNhcmRIZWFkZXIsXG4gIElvbkNhcmRTdWJ0aXRsZSxcbiAgSW9uQ2FyZFRpdGxlLFxuICBJb25DaGVja2JveCxcbiAgSW9uQ2hpcCxcbiAgSW9uQ29sLFxuICBJb25Db250ZW50LFxuICBJb25EYXRldGltZSxcbiAgSW9uRmFiLFxuICBJb25GYWJCdXR0b24sXG4gIElvbkZhYkxpc3QsXG4gIElvbkZvb3RlcixcbiAgSW9uR3JpZCxcbiAgSW9uSGVhZGVyLFxuICBJb25JY29uLFxuICBJb25JbWcsXG4gIElvbkluZmluaXRlU2Nyb2xsLFxuICBJb25JbmZpbml0ZVNjcm9sbENvbnRlbnQsXG4gIElvbklucHV0LFxuICBJb25JdGVtLFxuICBJb25JdGVtRGl2aWRlcixcbiAgSW9uSXRlbUdyb3VwLFxuICBJb25JdGVtT3B0aW9uLFxuICBJb25JdGVtT3B0aW9ucyxcbiAgSW9uSXRlbVNsaWRpbmcsXG4gIElvbkxhYmVsLFxuICBJb25MaXN0LFxuICBJb25MaXN0SGVhZGVyLFxuICBJb25NZW51LFxuICBJb25NZW51QnV0dG9uLFxuICBJb25NZW51VG9nZ2xlLFxuICBJb25OYXYsXG4gIElvbk5hdkxpbmssXG4gIElvbk5vdGUsXG4gIElvblByb2dyZXNzQmFyLFxuICBJb25SYWRpbyxcbiAgSW9uUmFkaW9Hcm91cCxcbiAgSW9uUmFuZ2UsXG4gIElvblJlZnJlc2hlcixcbiAgSW9uUmVmcmVzaGVyQ29udGVudCxcbiAgSW9uUmVvcmRlcixcbiAgSW9uUmVvcmRlckdyb3VwLFxuICBJb25SaXBwbGVFZmZlY3QsXG4gIElvblJvdyxcbiAgSW9uU2VhcmNoYmFyLFxuICBJb25TZWdtZW50LFxuICBJb25TZWdtZW50QnV0dG9uLFxuICBJb25TZWxlY3QsXG4gIElvblNlbGVjdE9wdGlvbixcbiAgSW9uU2tlbGV0b25UZXh0LFxuICBJb25TbGlkZSxcbiAgSW9uU2xpZGVzLFxuICBJb25TcGlubmVyLFxuICBJb25TcGxpdFBhbmUsXG4gIElvblRhYkJhcixcbiAgSW9uVGFiQnV0dG9uLFxuICBJb25UZXh0LFxuICBJb25UZXh0YXJlYSxcbiAgSW9uVGh1bWJuYWlsLFxuICBJb25Ub2dnbGUsXG4gIElvblRvb2xiYXIsXG4gIElvblRpdGxlLFxuXG4gIElvblRhYnMsXG5cbiAgLy8gbmdNb2RlbCBhY2Nlc3NvcnNcbiAgQm9vbGVhblZhbHVlQWNjZXNzb3IsXG4gIE51bWVyaWNWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb1ZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdFZhbHVlQWNjZXNzb3IsXG4gIFRleHRWYWx1ZUFjY2Vzc29yLFxuXG4gIC8vIG5hdmlnYXRpb25cbiAgSW9uUm91dGVyT3V0bGV0LFxuICBJb25CYWNrQnV0dG9uRGVsZWdhdGUsXG4gIE5hdkRlbGVnYXRlLFxuICBSb3V0ZXJMaW5rRGVsZWdhdGUsXG5cbiAgLy8gdmlydHVhbCBzY3JvbGxcbiAgVmlydHVhbEZvb3RlcixcbiAgVmlydHVhbEhlYWRlcixcbiAgVmlydHVhbEl0ZW0sXG4gIElvblZpcnR1YWxTY3JvbGxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TLFxuICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gIHByb3ZpZGVyczogW0FuZ3VsYXJEZWxlZ2F0ZSwgTW9kYWxDb250cm9sbGVyLCBQb3BvdmVyQ29udHJvbGxlcl0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIElvbmljTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogSW9uaWNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPElvbmljTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJb25pY01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ29uZmlnVG9rZW4sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGFwcEluaXRpYWxpemUsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgQ29uZmlnVG9rZW4sXG4gICAgICAgICAgICBET0NVTUVOVCxcbiAgICAgICAgICAgIE5nWm9uZVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==