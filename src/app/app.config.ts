import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // Inicializamos la App de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Proveemos el servicio de Firestore
    provideFirestore(() => getFirestore()),
  ]
};
