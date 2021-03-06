// tslint:disable max-classes-per-file
import {inject, injectable} from 'inversify';
import {log} from '../../../app/core/log'
import {ContentItemUtils} from '../contentItem/ContentItemUtils';
import {ContentUserDataUtils} from '../contentUser/ContentUserDataUtils';
import {
    CONTENT_TYPES,
    IColorSlice, IContentData,
    IContentUserData, ICoordinate, IProficiencyStats,
    ISigmaNode, ITreeDataWithoutId, ITreeLocationData, ITreeUserData
} from '../interfaces';
import {TYPES} from '../types';
import {SigmaNodeUtils} from './SigmaNodeUtils';
import {PROFICIENCIES} from '../proficiency/proficiencyEnum';
import {DEFAULT_NODE_SIZE} from '../../core/globals';

@injectable()
export class SigmaNode implements ISigmaNode {

    public id: string;
    public parentId: string;
    public contentId: string;
    public contentUserId: string;
    public children: string[];
    public x: number;
    public y: number;
    public aggregationTimer: number;
    public content: IContentData;
    public contentUserData: IContentUserData;
    public label: string;
    public size: number;
    public colorSlices: IColorSlice[];
    public proficiencyStats: IProficiencyStats;
    public proficiency: PROFICIENCIES
    public overdue: boolean;

    public receiveNewTreeData(tree: ITreeDataWithoutId) {
        this.parentId = tree.parentId
        this.contentId = tree.contentId
        this.children = tree.children
    }
    public receiveNewTreeUserData(treeUserData: ITreeUserData) {
        this.colorSlices = SigmaNodeUtils.getColorSlicesFromProficiencyStats(treeUserData.proficiencyStats)
        this.aggregationTimer = treeUserData.aggregationTimer
        this.proficiencyStats = treeUserData.proficiencyStats
    }
    public receiveNewContentData(contentData: IContentData) {
        this.label = ContentItemUtils.getLabelFromContent(contentData)
        this.content = contentData
    }

    public receiveNewContentUserData(contentUserData: IContentUserData) {
        this.contentUserId = contentUserData.id
        this.overdue = contentUserData.overdue
        this.size = ContentUserDataUtils.getSizeFromContentUserData(contentUserData)
        this.contentUserData = contentUserData
        this.proficiency = contentUserData.proficiency
        this.colorSlices = SigmaNodeUtils.getColorSlicesFromProficiency(this.proficiency)
    }

    public receiveNewTreeLocationData(treeLocationData: ITreeLocationData) {
        const pointVal: ICoordinate = treeLocationData.point
        this.x = pointVal.x
        this.y = pointVal.y
    }
    /* TODO: this class shouldn't have a reference to sigma instance.
     But whatever class (SigmaNodesHandlers?) that has acccess to the instance
      of this class should call sigmaInstance.refresh() after an update is called on this class
      */

    constructor(@inject(TYPES.SigmaNodeArgs)
        {
            id,
            parentId,
            contentId,
            children,
            x,
            y,
            content,
            contentUserData,
            label,
            proficiencyStats,
            size,
            aggregationTimer,
            colorSlices,
            overdue,
        }: SigmaNodeArgs = {
            id: undefined,
            parentId: undefined,
            contentId: undefined,
            children: undefined,
            x: undefined,
            y: undefined,
            content: undefined,
            contentUserData: undefined,
            proficiencyStats: undefined,
            label: undefined,
            size: undefined,
            aggregationTimer: undefined,
            colorSlices: undefined,
            overdue: undefined,
        } ) {
        this.id = id
        this.parentId = parentId
        this.contentId = contentId
        this.children = children
        this.x = x
        this.y = y
        this.proficiencyStats = proficiencyStats
        this.aggregationTimer = aggregationTimer
        this.content = content || {
            type: CONTENT_TYPES.LOADING,
            title: 'loading . . .',
            // '' // can't be simply undefined or else sigmajs will have trouble rendering a prope
        }
        this.contentUserData = contentUserData
        this.label = label || 'Default Node Label'
        this.size = size || DEFAULT_NODE_SIZE
        this.colorSlices = colorSlices
        this.overdue = overdue
    }
}

@injectable()
export class SigmaNodeArgs {
    @inject(TYPES.String) public id: string;
    @inject(TYPES.String) public parentId: string;
    @inject(TYPES.String) public contentId: string;
    @inject(TYPES.Array) public children: string[];
    @inject(TYPES.Number) public x: number;
    @inject(TYPES.Number) public y: number;
    @inject(TYPES.String) public label: string;
    @inject(TYPES.Number) public size: number;
    @inject(TYPES.Object) public content: IContentData;
    @inject(TYPES.IContentUserData) public contentUserData: IContentUserData;
    @inject(TYPES.Number) public aggregationTimer: number;
    @inject(TYPES.IProficiencyStats) public proficiencyStats: IProficiencyStats;
    @inject(TYPES.IColorSlice) public colorSlices: IColorSlice[];
    @inject(TYPES.Boolean) public overdue: boolean;
}
