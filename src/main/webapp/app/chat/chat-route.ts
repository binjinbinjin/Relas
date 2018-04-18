import { Routes } from '@angular/router';
import { chatWindowsRoute } from './chat-window/chat-window.route';
import { chatThreadsRoute } from './chat-threads/chat-threads-route';

export const chatMainRoute: Routes = [
    {
        path: 'chat', redirectTo: 'chat/threads', pathMatch: 'full'
    },
    chatWindowsRoute,
    chatThreadsRoute,
];
