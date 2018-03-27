
export const enum StoreDataSource {
    'WEB_SOCKET', 'HTTP', 'CLIENT', 'LOCAL_STORAGE', 'SESSION_STORAGE'
}

export const enum StoreDataStatus {
    'LOADING', 'COMPLETE', 'INITIALIZING', 'DEAD'
}

export interface StoreDataInter {
    value: any;
    dataStatus: StoreDataStatus;
    extraInfo?: any;
    route?: any;
    dataSource: StoreDataSource;
}

export interface AppStoreState {
    [data: string]: StoreDataInter;
}
