import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RelasSharedModule } from '../shared';
import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import {
    accountState,
    ActivateComponent,
    ActivateService,
    PasswordComponent,
    PasswordResetFinishComponent,
    PasswordResetFinishService,
    PasswordResetInitComponent,
    PasswordResetInitService,
    PasswordService,
    PasswordStrengthBarComponent,
    Register,
    RegisterComponent,
    SettingsComponent,
    SocialAuthComponent,
    SocialRegisterComponent,
} from './';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
    imports: [
        RelasSharedModule,
        RouterModule.forChild(accountState),
        UserPortfolioModule
    ],
    declarations: [
        SocialRegisterComponent,
        SocialAuthComponent,
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        PortfolioComponent
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelasAccountModule {}
