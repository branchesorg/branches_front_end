import {Trees} from '../../objects/trees'
import {Facts} from '../../objects/facts'
export default {
    template: require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
    props: ['movie', 'id'],
    created () {
        this.anothervar = 25
       console.log('new tree node created', ...arguments)
        var self = this;

        this.tree = {}
        this.fact = {}
        Trees.get(this.id).then( (tree) => {
            self.tree = tree
            Facts.get(tree.factId).then((fact) =>{
                self.fact = fact
                console.log('fact is', fact)

                setInterval(function(){
                    self.x++
                    self.y = self.y + 2
                    fact.timeElapsedForCurrentUser = fact.timeElapsedForCurrentUser || 0
                    fact.timeElapsedForCurrentUser++ // = fact.timeElapsedForCurrentUser || 0
                    // console.log('increment', self.x, self.y)
                }, 1000)
            })
        })
    },
    data () {
        var self = this;
        return {
            x: 5
            , y: 7
            , tree: self.tree
            , fact: self.fact
        }
    },
    computed: {
        // treeid() {
        //     return {
        //         one: this.x + 'ec535',
        //         two: this.y + 'ec535',
        //     }
        // }
    },
    asyncComputed: {
      // tree () {
      //     var self = this
      //     return Trees.get(this.id).then( (tree) => {
      //        Facts.get(tree.factId).then((fact) =>{
      //            self.fact = fact
      //            console.log('fact is', fact)
      //        })
      //         return tree
      //     })
      //     // const total = this.x + this.y
      //     // return new Promise(resolve =>
      //     //   setTimeout(() => resolve(total), 1000)
      //     // )
      // },
        // fact() {
        //   return Facts.get(this.tree.factId) //this.tree.then(tree => Facts.get(tree.factId))
        // }
    }
}