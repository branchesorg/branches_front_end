import {newTree} from '../../objects/newTree.js';
import {removeTreeFromGraph} from "../treesGraph"
import {Trees} from '../../objects/trees.js'
import {Facts} from '../../objects/facts.js'

import {toggleVisibility} from "../../core/utils"

export class TreeController {

    constructor($scope){
        this.dataLoaded = false;
        this.testarg = 54
        var self = this
        setTimeout(function(){
            this.testarg++
            console.log('test arg is now', self.testarg)
        },0)
        console.log('Tree controller just called!!!')
        console.log('this.testarg is', this.testarg)
        console.log('this.tree is', this.tree)

        this.testvar = this.testvar || 'hello this is a test var'
        console.log('this .testvar is', this.testvar)
        this.anothertestvar = $scope.treeCtrl.anothertestvar
        console.log('another test var is',this.anothertestvar)
        console.log('constructor $scope is', $scope)
        console.log('constructor $scope.treeCtrl is', $scope.treeCtrl)
        console.log('scope another test var is', $scope.treeCtrl.anothertestvar)

        $scope.$watch('treeCtrl.anothertestvar', function(newVal,oldVal, scope){

            console.log('treectrl.anothertestvar is ', newVal, oldVal, scope, self.anothertestvar)

        })
        $scope.$watch('treeCtrl.tree', function(newVal, oldVal, scope){
            if (!self.dataLoaded){
                self.dataLoaded = true
                console.log('self.tree b4 conversion is', self.tree)
                self.tree = JSON.parse(self.tree)
                console.log('self.tree after is', newVal, oldVal, scope, self.tree)
            }


        })
    }

    editFactOnTreeFromEvent(event) {
        const treeNewFactDom = event.target.parentNode
        var question = treeNewFactDom.querySelector('.tree-new-fact-question').value
        var answer = treeNewFactDom.querySelector('.tree-new-fact-answer').value
        var treeId = treeNewFactDom.querySelector('.tree-id').value
        //1. create new fact
        var fact=
            Facts.create(
                {
                    question: question,
                    answer: answer,
                }
            )
        //2.link new fact with current tree
        fact.addTree(treeId)
        Trees.get(treeId).then( tree => tree.changeFact(fact.id))

        //3.update UI source for question and fact
        var sigmaNode = s.graph.nodes().find(node => node.id == treeId)
        sigmaNode.fact = fact
        s.refresh()

        //4. close the edit functionality
        const treeFactDom = treeNewFactDom.parentNode
        window.treeCtrl.toggleEditGivenTreeFactDom(treeFactDom)

        //5. ^^3 and 4 don't seem to be working. Workaround below:

        alert('Fact updated. Refresh the page to see changes')
    }
    toggleEditGivenTreeFactDom(){
        let treeCurrentFactDom = treeFactDom.querySelector('.tree-current-fact')
        let treeNewFactDom = treeFactDom.querySelector('.tree-new-fact')
        toggleVisibility(treeCurrentFactDom)
        toggleVisibility(treeNewFactDom)
    }
    toggleEdit(event){
        const factEditDom = event.target.parentNode
        window.treeCtrl.toggleEditGivenTreeFactDom(factEditDom)
    }
    deleteTree(event){
        var deleteTreeForm = event.target.parentNode
        var treeId = deleteTreeForm.querySelector('.tree-id').value
        //1.Remove Tree and subtrees from graph
        removeTreeFromGraph(treeId).then(() => s.refresh())
        //2. remove the tree's current parent from being its parent
        Trees.get(treeId).then(tree => {
            tree.unlinkFromParent()
        })
    }
    continueTimer(event){
        var factDom = event.target.parentNode

        var factId = factDom.querySelector('.tree-current-fact-id').value
        console.log('fact id in continue timer is', factId)
        Facts.get(factId).then(fact => fact.continueTimer())
    }
    pauseTimer(event){
        var factDom = event.target.parentNode
        var factId = factDom.querySelector('.tree-current-fact-id').value
        Facts.get(factId).then(fact => fact.pauseTimer())
    }
}
