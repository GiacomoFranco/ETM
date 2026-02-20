import { RenderMode, ServerRoute } from '@angular/ssr';

import { SERVICES } from '@core/constants';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'servicios/:service',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return SERVICES.map(({ slug }) => ({ service: slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
