import {Trees} from '../../objects/trees'
import {Facts} from '../../objects/facts'
import {Fact} from '../../objects/fact'
import timers from './timers'
export default {
    template: require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
    props: ['movie', 'id'],
    created () {
        var self = this;

        this.editing = false
        this.tree = {} // init to empty object until promises resolve, so vue does not complain
        this.fact = {}
        Trees.get(this.id).then( (tree) => {
            self.tree = tree
            console.log('TREE CONTROLLER INIT. TREE ID', tree.id, '; Tree.fact.id: ', tree.factId)
            Facts.get(tree.factId).then((fact) =>{
                console.log('TREE CONTROLLR INIT on factGet. fact.id is: ', fact.id, ' and fact is', fact)
                self.fact = fact

                if (!timers[fact.id]){ // to prevent two timers from being set on the same fact simultaneously (two back to back mousevers in sigmajs will do that, causing two seconds to increment every one second
                    setInterval(function(){
                        fact.timeElapsedForCurrentUser = fact.timeElapsedForCurrentUser || 0
                        fact.timeElapsedForCurrentUser++ // = fact.timeElapsedForCurrentUser || 0
                        // console.log('increment', self.x, self.y)
                    }, 1000)

                    timers[fact.id] = true
                }
            })
        })
    },
    data () {
        return {
             tree: this.tree
            , fact: this.fact
        }
    },
    methods: {
        saveTimer() {
            console.log('save timer called!!!')
            this.fact.setTimerForUser && this.fact.setTimerForUser(this.fact.timeElapsedForCurrentUser)
            timers[this.fact.id] = false
        },
        toggleEditing() {
            console.log('toggle editing called', this.editing)
            this.editing = !this.editing
            console.log('toggle editing called finished', this.editing)
        },
        changeFactForTree() {
            console.log('1changeFact: factid on tree is', this.tree.factId)
            console.log('2cange fact for tree', this.fact.question, this.fact.answer)
            this.fact = Facts.create({question: this.fact.question, answer: this.fact.answer})
            console.log('3the fact just created ', this.fact)
            this.fact.addTree(this.id)
            this.tree.changeFact(this.fact.id)
            console.log('4changeFact: factid on tree is NOW', this.tree.factId)
            this.toggleEditing()
        }
    },
}