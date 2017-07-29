import App from './App.vue'
import VueFire from 'vuefire'
import Vue from 'vue'
import './components'
import './objects'
import './utils'
import {login} from './login.js'
import  {HeaderController} from "../components/header/headerController"
import  {TreeControllerAngular} from "../components/tree/treeControllerAngular"


// Vue.use(VueFire)
// new Vue({el: '#bootstrap', render: h => h(App) })


//ABOVE original VUEJS
///BELOW CONVERTING TO ANGULAR -- below still doesn't work yet



var branches = angular.module('branches', ['ngRoute'])
branches.component('header', {
    template: require('../components/header/header.html'),
    controller: HeaderController,
    controllerAs: 'headerCtrl'
})

branches.component('tree', {
    template: require('../components/tree/tree-angular.html'),
    controller:TreeControllerAngular,
    controllerAs: 'treeCtrl',
    bindings: {
        testarg: '@',
        tree: '@'
        // testvar: '@'
        , anothertestvar: '@'
        , anothertestvarr: '@'
        , message: '@'

    }
})
