import {newTree} from '../../objects/newTree.js';
import {removeTreeFromGraph} from "../treesGraph"
import {Trees} from '../../objects/trees.js'
import {Facts} from '../../objects/facts.js'
import user from '../../objects/user.js'
import PubSub from 'pubsub-js'

import {toggleVisibility} from "../../core/utils"

export class TreeController {

    constructor($scope, $interval, $filter){
        this.$scope = $scope;
        this.$interval = $interval;
        this.editMode = false

        this.dataLoaded = false;
        this.testarg = 54
        var self = this

        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.timer = $interval(function () {
            //Display the current time.
            var time = new Date();
            $scope.treeCtrl.secondsElapsedForUser = +$scope.treeCtrl.secondsElapsedForUser || 0;// $scope.treeCtrl.message is going to start off as undefined
            $scope.treeCtrl.secondsElapsedForUser = +$scope.treeCtrl.secondsElapsedForUser + 1 //"Timer Ticked. " + time;
            self.fact.setTimerForUser($scope.treeCtrl.secondsElapsedForUser) // update every second rather than just when the user stops looking at/ studying the node on the tree on the canvas (e.g. when the user clicks on another part of the canvas, the displayed fact stops displaying). closes. The reason I did it this way is because when i couldn't figure out how to access the $destroy event on when the displayed fact stops displaying. It's like the $destroy event would never even get called . . .
        }, 1000);
        $scope.$on('$destroy', function(){
            console.log('destroy called')
            self.pauseTimer()
        }); //when user clicks on canvas, component is destroyed and time spend on that topic needs to be updated in the db

        //tree values will only display if we do this
        $scope.$watch('treeCtrl.tree', function(newVal, oldVal, scope){
            var treeData = JSON.parse(decodeURIComponent(newVal))
            if (!self.dataLoaded){
                self.dataLoaded = true
                self.tree = treeData // todo make a Trees.load() method that takes in a JSON object with all the right properties and converts it into a Trees Object that still has all those properties, but also has the correct methods
                self.id = self.tree.id
                Facts.get(treeData.fact.id).then(fact => {
                    self.fact = fact
                    self.$scope.treeCtrl.secondsElapsedForUser = fact.usersTimeMap[user.getId()]
                    console.log('treeController Fact.get results and storage into secondsElpasedFor User are', fact, self.$scope.treeCtrl.secondsElapsedForUser)
                })
            }

        })
        self.$onDestroy = function() {
            console.log("on destroy called")
        }

        // PubSub.subscribe('canvas.clicked', self.pauseTimer)
    }
    $onInit() {
        console.log(' on init called for treeController')
    }
    // $onDestroy(){
    //     console.log('on destroy called 2')
    // }

    editFactOnTreeFromEvent() {
        //TODO: call this event on toggleEdit, but only if the question or answer have changed

        // 1. create new fact
        var question = this.$scope.treeCtrl.fact.question
        var answer = this.$scope.treeCtrl.fact.answer
        var treeId = this.$scope.treeCtrl.id
        var fact= Facts.create( {question, answer})
        //2.link new fact with current tree
        fact.addTree(treeId)
        Trees.get(treeId).then( tree => tree.changeFact(fact.id)) //TODO: verify if this step works?

        // 3. close the edit functionality
        this.toggleEdit()

        //4. TODO: figure out how to refresh the question which displays on the sigma graph
    }
    toggleEdit(){
        this.editMode = !this.editMode
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
    // continueTimer(event){
    //     var factDom = event.target.parentNode
    //
    //     var factId = factDom.querySelector('.tree-current-fact-id').value
    //     console.log('fact id in continue timer is', factId)
    //     Facts.get(factId).then(fact => fact.continueTimer())
    // }
    pauseTimer(){
        console.log('pause timer called')
        this.$interval.cancel(this.$scope.timer)
        this.fact.setTimerForUser(this.$scope.treeCtrl.secondsElapsedForUser)
    }
}
