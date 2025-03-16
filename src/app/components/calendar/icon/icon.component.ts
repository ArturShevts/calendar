import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent implements OnInit {
  @Input() iconName: string = '';
  public svgIcon: any;

  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  httpParams = new HttpParams({});
  ngOnInit() {
    if (this.iconName == '') {
    } else {
      this.http
        .get(
          `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Color/${this.iconName}.svg`,
          {
            responseType: 'text',
          },
        )
        .subscribe((res) => {
          this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(res);
        });
    }
  }
}
