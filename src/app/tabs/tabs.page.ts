import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { IonTabButton } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  animations: [
    trigger('tabAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('150ms 0ms ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms 0ms ease', style({ opacity: 0 }))])
    ])
  ]
})
export class TabsPage {
  readonly tabs = [
    { tab: 'tab1', icon: 'alarm-outline', label: 'Alarm' },
    { tab: 'tab2', icon: 'analytics-outline', label: 'Analytics' },
    { tab: 'tab3', icon: 'call-outline', label: 'Call' }
    // { tab: 'tab1', icon: 'images-outline', label: 'Gallery' }
  ];
  readonly selectedTab$: BehaviorSubject<Record<'tab', string>> = new BehaviorSubject(this.tabs[0]);

  @ViewChild(IonTabButton, { static: false }) ionTabs: IonTabButton & { el: HTMLElement };

  constructor() {}

  getTransform(tab) {
    const nativeElement = this.ionTabs && this.ionTabs.el;
    if (!nativeElement) {
      return;
    }
    const left = nativeElement.offsetLeft;
    const width = nativeElement.clientWidth;
    const index = this.tabs.findIndex(item => item.tab === tab.tab);
    const TOTAL_PADDING = 24;
    // 24 is subtracted because 12 px is added as padding on left and right side each
    // 12 is added to accomodate padding
    return { width: width - TOTAL_PADDING + 'px', transform: `translate(${TOTAL_PADDING / 2 + left + width * (!tab ? 0 : index)}px)` };
  }
}
