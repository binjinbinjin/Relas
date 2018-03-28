import { Action } from 'redux';

import { StoreDataInfo } from './app.store.model';

/**App store action interface,
 * all the action of store should inherit this interface
 */
export interface AppAction extends Action {
    dataInfo: StoreDataInfo; /**Object that describe about the data of action */
}
