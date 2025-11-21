import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: '',
    loadComponent: () => import('@views').then((m) => m.Home),
  },
  {
    title: 'Servicios',
    path: 'servicios',
    loadComponent: () => import('@views').then((m) => m.Services),
  },
  {
    title: 'Sobre Nosotros',
    path: 'sobre-nosotros',
    loadComponent: () => import('@views').then((m) => m.AboutUs),
  },
  {
    title: 'Galería',
    path: 'galeria',
    loadComponent: () => import('@views').then((m) => m.Galery),
  },
  {
    title: 'Contacto',
    path: 'contacto',
    loadComponent: () => import('@views').then((m) => m.Contact),
  },
  {
    title: '404',
    path: '**',
    loadComponent: () => import('@views').then((m) => m.NotFound),
  },
];
