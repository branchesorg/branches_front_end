import {Trees} from '../../objects/trees'
import {Facts} from '../../objects/facts'
import timers from './timers'
export default {
    template: require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
    props: ['movie', 'id'],
    created () {
        var self = this;

        this.tree = {} // init to empty object until promises resolve, so vue does not complain
        this.fact = {}
        Trees.get(this.id).then( (tree) => {
            self.tree = tree
            Facts.get(tree.factId).then((fact) =>{
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
        }
    },
}