import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { NgApexchartsModule } from 'ng-apexcharts';


export const appConfig: ApplicationConfig = {



  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideAnimationsAsync(),
  provideRouter([]),
  provideFirebaseApp(() => initializeApp({ "projectId": "posweb-f8928", "appId": "1:823611790398:web:b90818f76d6b52d0016d6f", "storageBucket": "posweb-f8928.firebasestorage.app", "apiKey": "AIzaSyDkU5ZurWPOTrngXzkjnWccm5fRcPnbfBw", "authDomain": "posweb-f8928.firebaseapp.com", "messagingSenderId": "823611790398" })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ "projectId": "posweb-f8928", "appId": "1:823611790398:web:b90818f76d6b52d0016d6f", "storageBucket": "posweb-f8928.firebasestorage.app", "apiKey": "AIzaSyDkU5ZurWPOTrngXzkjnWccm5fRcPnbfBw", "authDomain": "posweb-f8928.firebaseapp.com", "messagingSenderId": "823611790398" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),

  provideAnimationsAsync(),
  providePrimeNG({


    theme: {
      preset: Lara,
      options: {
        prefix: 'p',
        darkModeSelector: 'none',
      }
    },

  }),
  provideFirebaseApp(() => initializeApp({ "projectId": "posweb-f8928", "appId": "1:823611790398:web:b90818f76d6b52d0016d6f", "storageBucket": "posweb-f8928.firebasestorage.app", "apiKey": "AIzaSyDkU5ZurWPOTrngXzkjnWccm5fRcPnbfBw", "authDomain": "posweb-f8928.firebaseapp.com", "messagingSenderId": "823611790398" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())

  ]
};
