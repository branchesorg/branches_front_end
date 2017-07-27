import {newTree} from '../../objects/newTree.js';
import {removeTreeFromGraph} from "../treesGraph"
import {Trees} from '../../objects/trees.js'
import {Facts} from '../../objects/facts.js'

import {toggleVisibility} from "../../core/utils"

export class TreeController {

    constructor($scope, $interval, $filter){
        this.dataLoaded = false;
        this.testarg = 54
        var self = this

        $scope.treeCtrl.message = "Timer started. ";

                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.timer = $interval(function () {
            //Display the current time.
            var time = new Date();
            $scope.treeCtrl.message = "Timer Ticked. " + time;
        }, 1000);

        this.testargLoaded = false;
        $scope.$watch('treeCtrl.testarg', function(newVal, oldVal, scope){
            console.log('$scope.test arg is', $scope.treeCtrl.testarg, ...arguments)
            // if (!self.testargloaded){
            //     self.testargloaded = true
            //     setInterval(function(){
            //         console.log('test arg is currently', $scope.treeCtrl.testarg++)
            //         $scope.treeCtrl.testarg = $scope.treeCtrl.testarg + 1; //++
            //         console.log('test arg is now', $scope.treeCtrl.testarg)
            //         // console.log('$scope.testarg is originally ', newVal, oldVal)
            //         // $scope.testarg = newVal;
            //         // $scope.testarg = +$scope.testarg + 1
            //         // console.log('test arg is now', $scope.testarg)
            //     },1000)
            // }





            // console.log('$scope.testarg is originally ', $scope.testarg)
            // $scope.testarg = +$scope.testarg + 1
            // console.log('test arg is now', $scope.testarg)
        })
        this.testvar = this.testvar || 'hello this is a test var'

        //tree values will only display if we do this
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
