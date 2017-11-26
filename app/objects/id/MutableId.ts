/* tslint:disable variable-name */
// import {log} from '../../core/log'
import {IMutable, IUndoableMutable} from '../mutations/IMutable';
import {IActivatableDatedMutation, IDatedMutation} from '../mutations/IMutation';
import {IdMutationTypes} from './IdMutationTypes';
import {IId} from './IId';
/*
Decided to not implement IUndoable on this class, because undo/redo add/remove aren't
 as commutative as they seem . . . at least for the complicated specs I was setting for myself . . .
 See the commit history for the commit before this file was created to see what I mean.
*/
// TODO: Make IDatedMutation a generic, that takes a type as an argument
interface IMutableId extends IMutable<IDatedMutation<IdMutationTypes>>, IId {}
class MutableId implements IMutableId {
    private id: string;
    private _mutations: Array<IDatedMutation<IdMutationTypes>>;
    public get(): string {
        return this.id
    }
    private set(id): void {
        this.id = id
    }
    constructor({id, mutations = []}) {
        this.id = id
        this._mutations = mutations
    }
    public addMutation(mutation: IDatedMutation<IdMutationTypes>) {
        switch (mutation.type) {
            case IdMutationTypes.SET:
                this.set(mutation.data.id) // TODO: Law of Demeter Violation? How to fix?
                break;
            default:
                throw new TypeError('Mutation Type needs to be one of the following types'
                    + JSON.stringify(IdMutationTypes))
        }
        this._mutations.push(mutation)
    }

    public mutations(): Array<IDatedMutation<IdMutationTypes>> {
        return this._mutations;
    }

}

export {MutableId, IMutableId}