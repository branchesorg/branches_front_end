import {injectFakeDom} from '../../testHelpers/injectFakeDom';
injectFakeDom()
import test from 'ava'
import {expect} from 'chai'
import * as sinon from 'sinon'
import {myContainer, myContainerLoadAllModules} from '../../../inversify.config';
import {injectionWorks} from '../../testHelpers/testHelpers';
import {
    ISigmaNodeCreator, IStoreSourceUpdateListener, IStoreSourceUpdateListenerCore, ISubscribable,
    ITypeAndIdAndValUpdates
} from '../interfaces';
import {TYPES} from '../types';
import {StoreSourceUpdateListener, StoreSourceUpdateListenerArgs} from './StoreSourceUpdateListener';

myContainerLoadAllModules()
test('StoreSourceUpdateListener:::DI constructor should work', (t) => {
    
    const injects = injectionWorks<StoreSourceUpdateListenerArgs, IStoreSourceUpdateListener>({
        container: myContainer,
        argsType: TYPES.StoreSourceUpdateListenerArgs,
        interfaceType: TYPES.IStoreSourceUpdateListener,
    })
    expect(injects).to.equal(true)
    t.pass()
})
test('StoreSourceUpdateListener:::subscribe', (t) => {
    
    const subscribable: ISubscribable<ITypeAndIdAndValUpdates> = {
        onUpdate() {
        }
    }
    const subscribableUpdateSpy = sinon.spy(subscribable, 'onUpdate')
    const storeSourceUpdateListener: IStoreSourceUpdateListener =
        myContainer.get<IStoreSourceUpdateListener>(TYPES.IStoreSourceUpdateListener)

    expect(subscribableUpdateSpy.callCount).to.equal(0)
    storeSourceUpdateListener.subscribe(subscribable)
    expect(subscribableUpdateSpy.callCount).to.equal(1)
    t.pass()
})
