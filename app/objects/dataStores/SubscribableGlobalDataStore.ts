// tslint:disable max-classes-per-file
// tslint:disable no-empty-interface
import {inject, injectable} from 'inversify';
import {log} from '../../core/log'
import {IIdAndValUpdates, ISubscribableGlobalDataStoreCore, ITypeAndIdAndValUpdates} from '../interfaces';
import {SubscribableCore} from '../subscribable/SubscribableCore';
import {TYPES} from '../types';
import {ObjectDataTypes} from './ObjectTypes';

interface ISubscribableGlobalDataStore extends SubscribableGlobalDataStore { }

@injectable()
class SubscribableGlobalDataStore extends SubscribableCore<ITypeAndIdAndValUpdates>
implements ISubscribableGlobalDataStoreCore {
    private update: ITypeAndIdAndValUpdates;
    protected callbackArguments(): ITypeAndIdAndValUpdates {
        // log('globaldatastore callback arguments called')
        return this.update
    }

    private subscribableTreeDataStore;
    constructor(@inject(TYPES.GlobalDataStoreArgs){subscribableTreeDataStore, updatesCallbacks = []}) {
        super({updatesCallbacks})
        this.subscribableTreeDataStore = subscribableTreeDataStore
        // log('subscribableGlobalDataStore called')
    }
    public startBroadcasting() {
        const me = this
        this.subscribableTreeDataStore.onUpdate((update: IIdAndValUpdates) => {
            me.update = {
                type: ObjectDataTypes.TREE_DATA,
                ...update
            }
            me.callCallbacks()
        })

    }
}

@injectable()
class GlobalDataStoreArgs {
    @inject(TYPES.Array) public updatesCallbacks;
    @inject(TYPES.ISubscribableTreeDataStore) public subscribableTreeDataStore
}

export {SubscribableGlobalDataStore, GlobalDataStoreArgs, ISubscribableGlobalDataStore}