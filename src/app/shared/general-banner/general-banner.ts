import { Component, input } from '@angular/core';

@Component({
  selector: 'app-general-banner',
  imports: [],
  templateUrl: './general-banner.html',
  styleUrl: './general-banner.scss',
})
export class GeneralBanner {
  backgroundImage = input<string>('/images/contact-banner.webp');
  title = input<string>('Estamos aquí para brindarle soporte, confianza y atención oportuna.');
  text = input<string>(
    'Brindamos asesoría técnica y atención personalizada para resolver sus requerimientos con rapidez y precisión. Nuestro equipo ofrece soporte en sitio y remoto, coordinación de visitas, cotizaciones claras y seguimiento oportuno, respaldado por repuestos disponibles, talleres especializados y cobertura nacional para garantizar la continuidad de sus operaciones.',
  );
}
