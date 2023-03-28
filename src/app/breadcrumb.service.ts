import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: any[] = [];

  constructor() {}

  getBreadcrumbs(): { title: string; link: string }[] {
    return this.breadcrumbs;
  }

  addBreadcrumb(title: string, link: string): void {
    this.breadcrumbs.push({ title: title, link: link });
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }
}
