import {newTree} from '../../objects/newTree.js'
//temporary hacky solution for controller
export default {
    template: require('./newTree.html'),
    props: ['parentid'],
    data () {
        return {
            question: '',
            answer: ''
        }
    },
    methods: {
        createNewTree() {
            console.log('PARENT ID used in CREATENEWTREE in VUE COMPONENT IS', this.parentid)
            newTree(this.question, this.answer, this.parentid)
        }
    }
}
