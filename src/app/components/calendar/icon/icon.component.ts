import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { WeatherIcons } from '../../../interfaces/weather.model';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: false,
})
export class IconComponent implements OnInit {
  @Input() iconData!: { temp: number; icon: string; dateTime: string };
  public svgIcon: any;

  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  tooltipText = '';

  httpParams = new HttpParams({});
  ngOnInit() {
    if (this.iconData.icon == '') {
    } else {
      this.tooltipText = `The temperature on this day will be ${this.iconData.temp} °C.
 ${WeatherIcons[this.iconData.icon]}`;
      this.http
        .get(
          `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Color/${this.iconData.icon}.svg`,
          {
            responseType: 'text',
          },
        )
        .pipe(
          catchError((err: unknown) => {
            this.svgIcon =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.3 84.3"><defs><style>.cls-1{fill:#f5b952;}.cls-2,.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-2,.cls-4{stroke-width:5px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-width:4px;}</style></defs><title>clear-dayAsset 135colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="42.48" cy="42.15" r="18.72"/><path class="cls-2" d="M42.19,23.2A18.84,18.84,0,1,0,61,42,18.86,18.86,0,0,0,42.19,23.2Z"/><line class="cls-3" x1="42.15" y1="14.23" x2="42.15" y2="6.07"/><line class="cls-3" x1="42.15" y1="78.23" x2="42.15" y2="70.07"/><line class="cls-3" x1="14.23" y1="42.15" x2="6.07" y2="42.15"/><line class="cls-3" x1="78.23" y1="42.15" x2="70.07" y2="42.15"/><line class="cls-3" x1="22.41" y1="22.41" x2="16.64" y2="16.64"/><line class="cls-3" x1="67.66" y1="67.66" x2="61.89" y2="61.89"/><line class="cls-3" x1="22.41" y1="61.89" x2="16.64" y2="67.66"/><line class="cls-3" x1="67.66" y1="16.64" x2="61.89" y2="22.41"/><line class="cls-4" x1="54.63" y1="11.47" x2="58.28" y2="2.5"/><line class="cls-4" x1="26.02" y1="81.8" x2="29.67" y2="72.83"/><line class="cls-4" x1="11.47" y1="29.67" x2="2.5" y2="26.02"/><line class="cls-4" x1="81.8" y1="58.28" x2="72.83" y2="54.63"/><line class="cls-4" x1="29.28" y1="11.63" x2="25.52" y2="2.71"/><line class="cls-4" x1="58.78" y1="81.59" x2="55.02" y2="72.67"/><line class="cls-4" x1="11.63" y1="55.02" x2="2.71" y2="58.78"/><line class="cls-4" x1="81.59" y1="25.52" x2="72.67" y2="29.28"/></g></g></svg>';
            return throwError(() => new Error('Could not get icon' + err));
          }),
        )
        .subscribe((res) => {
          this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(res);
        });
    }
  }
}
