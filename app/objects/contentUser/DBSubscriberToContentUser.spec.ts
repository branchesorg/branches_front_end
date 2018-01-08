import {injectFakeDom} from '../../testHelpers/injectFakeDom';
injectFakeDom()
import test from 'ava'
import {expect} from 'chai'
import * as sinon from 'sinon'
import {myContainer} from '../../../inversify.config';
import {IDatabaseSyncer, IDBSubscriber, ISubscribableContentUser} from '../interfaces';
import {TYPES} from '../types';
import {DBSubscriberToContentUser} from './DBSubscriberToContentUser';

let subscribableContentUser
let overdueSyncer: IDatabaseSyncer
let proficiencySyncer: IDatabaseSyncer
let lastRecordedStrengthSyncer: IDatabaseSyncer
let timerSyncer: IDatabaseSyncer
let dbSubscriberToContentUser: IDBSubscriber
test.beforeEach('constructor', () => {
    subscribableContentUser = myContainer.get<ISubscribableContentUser>(TYPES.ISubscribableContentUser)
    overdueSyncer = myContainer.get<IDatabaseSyncer>(TYPES.IDatabaseSyncer)
    proficiencySyncer = myContainer.get<IDatabaseSyncer>(TYPES.IDatabaseSyncer)
    lastRecordedStrengthSyncer = myContainer.get<IDatabaseSyncer>(TYPES.IDatabaseSyncer)
    timerSyncer = myContainer.get<IDatabaseSyncer>(TYPES.IDatabaseSyncer)
    dbSubscriberToContentUser = new DBSubscriberToContentUser(
        {
            lastRecordedStrength: subscribableContentUser.lastRecordedStrength,
            lastRecordedStrengthSyncer,
            overdue: subscribableContentUser.overdue,
            overdueSyncer,
            proficiency: subscribableContentUser.proficiency,
            proficiencySyncer,
            timer: subscribableContentUser.timer,
            timerSyncer,
        }
    )
})
test('IDBSubscriber > DBSubscriberToContentUser::::subscribe' +
    ' should call subscribe on each of the database syncers', (t) => {
    const overdueSyncerSubscribeSpy = sinon.spy(overdueSyncer, 'subscribe')
    const proficiencySyncerSubscribeSpy = sinon.spy(proficiencySyncer, 'subscribe')
    const lastRecordedStrengthSyncerSubscribeSpy = sinon.spy(lastRecordedStrengthSyncer, 'subscribe')
    const timerSyncerSubscribeSpy = sinon.spy(timerSyncer, 'subscribe')
    expect(overdueSyncerSubscribeSpy.callCount).to.equal(0)
    expect(proficiencySyncerSubscribeSpy.callCount).to.equal(0)
    expect(lastRecordedStrengthSyncerSubscribeSpy.callCount).to.equal(0)
    expect(timerSyncerSubscribeSpy.callCount).to.equal(0)

    dbSubscriberToContentUser.subscribe()

    expect(overdueSyncerSubscribeSpy.callCount).to.equal(1)
    expect(proficiencySyncerSubscribeSpy.callCount).to.equal(1)
    expect(lastRecordedStrengthSyncerSubscribeSpy.callCount).to.equal(1)
    expect(timerSyncerSubscribeSpy.callCount).to.equal(1)
    t.pass()
})