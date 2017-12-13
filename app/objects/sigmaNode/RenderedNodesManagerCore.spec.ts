import {expect} from 'chai'
import {myContainer} from '../../../inversify.config';
import {TREE_ID} from '../../testHelpers/testHelpers';
import {IRenderedNodesManagerCore, ISigmaNode} from '../interfaces';
import {TYPES} from '../types';
import {RenderedNodesManagerCore} from './RenderedNodesManagerCore';

describe('RenderedNodesManagerCore', () => {
    it('addToRenderList should add to RenderList', () => {
        const sigmaId = TREE_ID
        const sigmaNode = myContainer.get<ISigmaNode>(TYPES.ISigmaNode)
        const allSigmaNodes = {}
        allSigmaNodes[sigmaId] = sigmaNode
        const renderedNodes = {}
        const renderedNodesManagerCore: IRenderedNodesManagerCore
            = new RenderedNodesManagerCore({renderedNodes, allSigmaNodes})

        renderedNodesManagerCore.addToRenderList(sigmaId)
        const renderedNode = renderedNodes[sigmaId]
        expect(renderedNode).to.deep.equal(sigmaNode)
    })
})