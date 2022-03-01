import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  inDetailsOrForm = new Subject<boolean>();
  inDetailsOrForm$ = this.inDetailsOrForm.asObservable();
  constructor(private location: Location) {}
  /**
   * Actualizaciones para gestionar el botón del menú, para ir hacia atrás
   * o abrir el menú principal lateral
   * @param detailsOrForm valor para especificar si es una página de detalles o formulario
   */
  isDetailsOrFormPage(detailsOrForm: boolean) {
    this.inDetailsOrForm.next(detailsOrForm);
  }

  /**
   * Volver a la página anterior desde detalles o un formulario
   */
  back(): void {
    this.location.back();
  }
}
