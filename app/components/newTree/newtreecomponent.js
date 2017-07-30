import {newTree} from '../../objects/newTree.js'
//temporary hacky solution for controller
export default {
    template: require('./newTree.html'),
    props: ['parentid'],
    data () {
        return {
            question: '',
            answer: '',
            heading: '',
            type: 'fact'
        }
    },
    methods: {
        createNewTree() {
            console.log('PARENT ID used in CREATENEWTREE in VUE COMPONENT IS', this.parentid)
            let contentArgs;
            switch(this.type) {
                case 'fact':
                    contentArgs = {question: this.question, answer: this.answer}
                    break;
                case 'heading':
                    contentArgs = {heading: this.heading}
                    break;
            }
            newTree(this.type, this.parentId, contentArgs)
        },
        setTypeToHeading() {
            this.type = 'heading'
        },
        setTypeToFact() {
            this.type = 'fact'
        }
    }
}
