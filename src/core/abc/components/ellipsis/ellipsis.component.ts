import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ellipsis',
    template: `<ng-content></ng-content>`,
    styleUrls: [ './ellipsis.less' ]
})
export class EllipsisComponent {
    @HostBinding('style.-webkit-line-clamp')
    @Input() lines = 3;
}
