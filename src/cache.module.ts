import { NgModule, ModuleWithProviders } from '@angular/core';
import { CacheService } from './cache.service';
import { IonicStorageModule, Storage } from '@ionic/storage';

export interface CacheConfig {
  keyPrefix?: string;
}

@NgModule({
  imports: [
    IonicStorageModule.forRoot({
      name: '__ionicCache',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ]
})
export class CacheModule {
  static forRoot(cacheConfig?: CacheConfig): ModuleWithProviders {
    return {
      ngModule: CacheModule,
      providers: [
        {
          provide: CacheService,
          useFactory: (storage: Storage) => {
            return new CacheService(storage, Object.assign({ keyPrefix: 'ionic-cache-' }, cacheConfig));
          },
          deps: [Storage]
        }
      ]
    };
  }
}
