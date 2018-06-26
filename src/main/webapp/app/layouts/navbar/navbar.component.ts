import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';
import { select } from '@angular-redux/store';
import { CHAT_THREADS } from '../../app-store/chat/chat.data';
import { StoreDataInter } from '../../app-store/app-store/app.store.model';
import { ChatRoomDataModel } from '../../chat/model/chat-room.model';
import { Observable } from 'rxjs';
import { DisplayFeedRouteWhoEnum } from '../../feed/model/display-feed-query-models';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.css'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    @select([CHAT_THREADS])
    chatThreads: Observable<StoreDataInter<ChatRoomDataModel>>;
    unreadMessages: number;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.unreadMessages = 0;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.chatThreads.subscribe((threads: StoreDataInter<ChatRoomDataModel>) => {
            let n = 0;
            threads.payloads.forEach((each) => {
                n += each.numberOfUnreadMessage();
            });
            this.unreadMessages = n;
        });
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    get userLogin() {
        return this.principal.getUserLogin();
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    getDisplayFeedWho(who: string): DisplayFeedRouteWhoEnum  {
        if (who === 'user') return DisplayFeedRouteWhoEnum.USER;
        return DisplayFeedRouteWhoEnum.FRIENDS;
    }
}
