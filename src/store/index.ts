import { createStore, combineReducers, AnyAction, Store, ReducersMapObject } from 'redux';
import { IReduxStore } from './types';

type IStore = Store<IReduxStore, AnyAction> & { dispatch: unknown }

const configureStore = (): IStore => {
    let reducers: ReducersMapObject = {};

    const store = createStore(
        combineReducers<IReduxStore>(reducers),
    );

    return store;
};

export default configureStore;
