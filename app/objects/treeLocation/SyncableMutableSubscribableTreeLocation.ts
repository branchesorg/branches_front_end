// tslint:disable max-classes-per-file
// tslint:disable no-empty-interface
import {inject, injectable} from 'inversify';
import {
    IDbValable,
    IDetailedUpdates, IHash,
    ISubscribable,
    ISyncableMutableSubscribableTreeLocation,
    IValable,
} from '../interfaces';
import {MutableSubscribableTreeLocation} from './MutableSubscribableTreeLocation';

@injectable()
export class SyncableMutableSubscribableTreeLocation
    extends MutableSubscribableTreeLocation implements ISyncableMutableSubscribableTreeLocation {
    public getPropertiesToSync(): IHash<ISubscribable<IDetailedUpdates> & IDbValable> {
        return {
            point: this.point,
        }
    }
}
