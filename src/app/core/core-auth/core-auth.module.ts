import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CoreAuthServiceConfig} from './core-auth.service';

@NgModule()
export class CoreAuthModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreAuthModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: CoreAuthServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreAuthModule,
      providers: [
        {provide: CoreAuthServiceConfig, useValue: config }
      ]
    };
  }

}
