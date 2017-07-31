import {newTree} from '../../objects/newTree.js'
//temporary hacky solution for controller
export default {
    template: require('./newTree.html'),
    props: ['parentid'],
    data () {
        return {
            question: '',
            answer: '',
            title: '',
            type: 'fact'
        }
    },
    computed: {
        contentIsFact () {
            return this.type == 'fact'
        },
        contentIsHeading () {
            return this.type == 'heading'
        },
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
                    contentArgs = {title: this.title}
                    break;
            }
            newTree(this.type, this.parentid, contentArgs)
        },
        setTypeToHeading() {
            this.type = 'heading'
        },
        setTypeToFact() {
            this.type = 'fact'
        }
    }
}
