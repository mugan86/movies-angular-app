import { Injectable } from '@angular/core';
import { TypeAlertEnum } from '@core/constants/alerts';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private translateService: TranslateService) {}

  swalWithConfirmCancelButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ms-3',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  dialogConfirmCancel = async (
    title: string,
    text: string,
    icon: TypeAlertEnum
  ) => {
    return this.swalWithConfirmCancelButtons.fire({
      title: this.translateService.instant(title),
      text: this.translateService.instant(text),
      icon,
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('alerts.confirm'),
      cancelButtonText: this.translateService.instant('alerts.cancel'),
      reverseButtons: true,
    });
  };

  dialogConfirm = async (title: string, text: string, type: TypeAlertEnum) => {
    return this.swalWithConfirmCancelButtons.fire(
      this.translateService.instant(title),
      this.translateService.instant(text),
      type
    );
  };
}
