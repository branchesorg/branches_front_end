import {Trees} from '../../objects/trees'
import {Facts} from '../../objects/facts'
import {Fact} from '../../objects/fact'
import ContentItem from '../../objects/contentItem'
import timers from './timers'
import PubSub from 'pubsub-js'
export default {
    template: require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
    props: ['movie', 'id'],
    created () {
        var self = this;

        this.editing = false
        this.tree = {} // init to empty object until promises resolve, so vue does not complain
        this.fact = {}
        this.content = {}
        Trees.get(this.id).then(tree => {
            self.tree = tree
            ContentItem.get(tree.contentId).then(content => {
                self.content = content
                self.startTimer()
            })

        })
        // Trees.get(this.id).then( (tree) => {
        //     self.tree = tree
        //     Facts.get(tree.factId).then((fact) =>{
        //         self.fact = fact
        //         this.startTimer()
        //     })
        // })
        PubSub.subscribe('canvas.clicked', () => {
            self.saveTimer()
        })
    },
    data () {
        return {
             tree: this.tree
            , fact: this.fact
        }
    },
    computed : {
        typeIsHeading() {
            return this.tree.contentType == 'heading'
        },
        typeIsFact() {
            return this.tree.contentType == 'fact'
        }
    },
    methods: {
        startTimer() {
            var self = this
            if (!timers[this.content.id]){ // to prevent two timers from being set on the same fact simultaneously (two back to back mousevers in sigmajs will do that, causing two seconds to increment every one second
                setInterval(function(){
                    self.content.timeElapsedForCurrentUser = self.content.timeElapsedForCurrentUser || 0
                    self.content.timeElapsedForCurrentUser++ // = fact.timeElapsedForCurrentUser || 0
                    // console.log('increment', self.x, self.y)
                }, 1000)

                timers[this.content.id] = true
            }
        },
        saveTimer() {
            this.content.setTimerForUser && this.content.setTimerForUser(this.content.timeElapsedForCurrentUser)
            timers[this.content.id] = false
        },
        toggleEditing() {
            this.editing = !this.editing
        },
        changeFactForTree() {
            this.fact = Facts.create({question: this.fact.question, answer: this.fact.answer})
            this.fact.addTree(this.id)
            // this.tree.changeFact(this.fact.id)
            this.tree.changeContent(contentId, contentType)
            this.toggleEditing()
        },
        changeContent() {
            let contentItem;
            switch (this.tree.contentType){
                case 'fact':
                    contentItem = ContentItem.create(new Fact({question: this.question, answer: this.answer}))
                case 'heading':
                    contentItem = ContentItem.create(new Heading({heading: this.heading}))

            }
        },
        changeTypeToFact() {
            this.tree.contentType == 'fact'
        },
        changeTypeToFact() {
            this.tree.contentType == 'heading'
        }
    }
}