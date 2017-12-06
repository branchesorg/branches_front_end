// // tslint:disable max-classes-per-file
// // tslint:disable no-empty-interface
import {inject, injectable} from 'inversify';
import {
    CONTENT_TYPES,
    IContentData,
    ISubscribableContent,
    ISubscribableMutableField,
    IValUpdates,
} from '../interfaces';
import {PROFICIENCIES} from '../proficiency/proficiencyEnum';
import {Subscribable} from '../subscribable/Subscribable';
import {TYPES} from '../types'

@injectable()
class SubscribableContent extends Subscribable<IValUpdates> implements ISubscribableContent {
    private publishing = false
    public type: ISubscribableMutableField<CONTENT_TYPES>;
    public timer: ISubscribableMutableField<number>;
    public proficiency: ISubscribableMutableField<PROFICIENCIES>;
    public lastRecordedStrength: ISubscribableMutableField<number>;

    // TODO: should the below three objects be private?
    public val(): IContentData {
        return {
            lastRecordedStrength: this.lastRecordedStrength.val(),
            overdue: this.overdue.val(),
            proficiency: this.proficiency.val(),
            timer: this.timer.val(),
        }
    }
    constructor(@inject(TYPES.SubscribableContentArgs) {
        updatesCallbacks, overdue, proficiency, timer, lastRecordedStrength
    }) {
        super({updatesCallbacks})
        this.overdue = overdue
        this.proficiency = proficiency
        this.timer = timer
        this.lastRecordedStrength = lastRecordedStrength
    }
    protected callbackArguments(): IValUpdates {
        return this.val()
    }
    public startPublishing() {
        if (this.publishing) {
            return
        }
        this.publishing = true
        const boundCallCallbacks = this.callCallbacks.bind(this)
        this.overdue.onUpdate(boundCallCallbacks)
        this.proficiency.onUpdate(boundCallCallbacks)
        this.timer.onUpdate(boundCallCallbacks)
        this.lastRecordedStrength.onUpdate(boundCallCallbacks)
    }
}

@injectable()
class SubscribableContentArgs {
    @inject(TYPES.Array) public updatesCallbacks
    @inject(TYPES.ISubscribableMutableNumber) public lastRecordedStrength: number
    @inject(TYPES.ISubscribableMutableBoolean) public overdue: boolean
    @inject(TYPES.ISubscribableMutableProficiency) public proficiency: PROFICIENCIES
    @inject(TYPES.ISubscribableMutableNumber) public timer: number
}

export {SubscribableContent, SubscribableContentArgs}
