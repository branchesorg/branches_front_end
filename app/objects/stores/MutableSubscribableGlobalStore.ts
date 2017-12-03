import {
    AllObjectMutationTypes, IGlobalDatedMutation, IIdDatedMutation, IMutableSubscribableGlobalStore,
    ObjectTypes, TreeMutationTypes
} from '../interfaces';
import {SubscribableGlobalStore} from './SubscribableGlobalStore';

class MutableSubscribableGlobalStore extends SubscribableGlobalStore implements IMutableSubscribableGlobalStore {
    constructor({treeStore, updatesCallbacks}) {
        super({treeStore, updatesCallbacks})
    }
    public addMutation(mutation: IGlobalDatedMutation<AllObjectMutationTypes>) {
        switch (mutation.objectType) {
            case ObjectTypes.TREE:
                let type = mutation.type;
                if (! (type in TreeMutationTypes)) {
                    throw new TypeError(type + ' not in ' + TreeMutationTypes)
                }
                // ^^^ TODO: use better generics to avoid the above if statement
                type = type as TreeMutationTypes
                const treeStoreMutation: IIdDatedMutation<TreeMutationTypes> = {
                    data: mutation.data,
                    id: mutation.id,
                    timestamp: mutation.timestamp,
                    type,
                }
                this.treeStore.addMutation(treeStoreMutation)
        }
    }

    public mutations(): Array<IGlobalDatedMutation<AllObjectMutationTypes>> {
        throw new Error('Method not implemented.');
    }

}

export {MutableSubscribableGlobalStore}