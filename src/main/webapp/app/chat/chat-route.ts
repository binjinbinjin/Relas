import { Routes } from '@angular/router';
import { chatWindowsRoute } from './chat-window/chat-window.route';

export const chatMainRoute: Routes = [
    {
        path: 'chat', redirectTo: 'chat/chat-windows', pathMatch: 'full'
    },
    chatWindowsRoute
];
