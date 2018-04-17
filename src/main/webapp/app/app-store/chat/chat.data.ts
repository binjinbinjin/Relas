import { StoreDataInter, StoreDataSource, StoreDataStatus } from '../app-store/app.store.model';
import { ChatMessage } from './../../chat/model/chat-message.model';
import { ChatRoomDataModel } from './../../chat/model/chat-room.model';

//////////// Name of the data that stored in the app stor //////////////////////////////////////

/**
 * Name of the data that stored in the app store
 * new chat message
 */
export const CHAT_MESSAGES = 'chatMessages';

/**
 * Name of the data that stored in the app store
 * chat threads (chat rooms)
 * */
export const CHAT_THREADS = 'chatThreads';
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////// The initial data that can stored in the app store ////////////////////////////

/**
 * The initial data that can stored in the app store
 * new chat message
 */
export const INITIAL_CHAT_MESSAGE = (): StoreDataInter<ChatMessage> => ({
    dataSource: StoreDataSource.WEB_SOCKET,
    dataInfo: { dataStatus: StoreDataStatus.EMPTY },
    payloads: []
});

/**
 * The initial data that can stored in the app store
 * chat threads (chat rooms)
 */
export const INITIAL_CHAT_THREADS = (): StoreDataInter<ChatRoomDataModel> => ({
    dataSource: StoreDataSource.WEB_SOCKET,
    dataInfo: { dataStatus: StoreDataStatus.EMPTY },
    payloads: []
});
////////////////////////////////////////////////////////////////////////////////////////////////
