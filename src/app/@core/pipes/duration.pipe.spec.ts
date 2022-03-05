import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('Creamos las instancia del Pipe', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('Debe de mostrar correctamente en horas y minutos desde minutos', () => {

      const pipe = new DurationPipe();

      expect(pipe.transform(123)).toBe('02h 03m');
      expect(pipe.transform(50)).toBe('00h 50m');
      expect(pipe.transform(117)).toBe('01h 57m');
      expect(pipe.transform(200)).toBe('03h 20m');
      expect(pipe.transform(610)).toBe('10h 10m');
      expect(pipe.transform(380)).toBe('06h 20m');
  });
});