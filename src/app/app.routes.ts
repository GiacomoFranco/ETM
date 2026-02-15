import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Inicio | EQUIPOS TECNI METÁLICOS S.A.S',
    path: '',
    loadComponent: () => import('@views').then((m) => m.Home),
  },
  {
    title: 'Servicios | EQUIPOS TECNI METÁLICOS S.A.S',
    path: 'servicios',
    loadComponent: () => import('@views').then((m) => m.Services),
  },
  {
    title: 'Servicios | EQUIPOS TECNI METÁLICOS S.A.S',
    path: 'servicios/:service',
    loadComponent: () => import('@views').then((m) => m.Service),
  },
  {
    title: 'Sobre Nosotros | EQUIPOS TECNI METÁLICOS S.A.S',
    path: 'sobre-nosotros',
    loadComponent: () => import('@views').then((m) => m.AboutUs),
  },
  {
    title: 'Galería | EQUIPOS TECNI METÁLICOS S.A.S',
    path: 'galeria',
    loadComponent: () => import('@views').then((m) => m.Galery),
  },
  {
    title: 'Contacto | EQUIPOS TECNI METÁLICOS S.A.S',
    path: 'contacto',
    loadComponent: () => import('@views').then((m) => m.Contact),
  },
  {
    title: '404',
    path: '**',
    loadComponent: () => import('@views').then((m) => m.NotFound),
  },
];
