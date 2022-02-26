import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const date = new Date(1970, 0, 1);
    date.setSeconds((+minutes || 0) * 60);

    return date
      .toTimeString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') // Dar formato de HH:MM:SS
      .substring(0, 5) // Coger solo HH:MM
      .replace(':', 'h ') // Eliminar ":" y poner "h"
      .concat('m'); // Añadir al final 'm' para minutos
  }
}
