import {Trees} from '../../objects/trees'
import {Facts} from '../../objects/facts'
import {Fact} from '../../objects/fact'
import ContentItem from '../../objects/contentItem'
import timers from './timers'
import PubSub from 'pubsub-js'
import {Heading} from "../../objects/heading";
import {removeTreeFromGraph} from "../treesGraph"
export default {
    template: require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
    props: ['movie', 'id'],
    created () {
        console.log('TREE COMPONENT CREATED', this)
        var self = this;

        this.editing = false
        this.tree = {} // init to empty object until promises resolve, so vue does not complain
        this.fact = {}
        this.content = {}
        Trees.get(this.id).then(tree => {
            self.tree = tree
            console.log('TREE COMPONENT: Tree just gotten', tree)
            ContentItem.get(tree.contentId).then(content => {
                console.log('TREE COMPONENT: content just gotten', content)
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
            , content: this.content
            , editing: this.editing
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
            switch (this.tree.contentType){
                case 'fact':
                    var fact = new Fact({question: this.content.question, answer: this.content.answer})
                    console.log("fact created is", fact)
                    this.content = ContentItem.create(fact)
                    break;
                case 'heading':
                    this.content = ContentItem.create(new Heading({title: this.content.title}))
                    break;
            }
            this.content.addTree(this.id)
            this.tree.changeContent(this.content.id, this.tree.contentType)

            this.toggleEditing()
        },
        changeTypeToFact() {
            this.tree.contentType == 'fact'
        },
        changeTypeToFact() {
            this.tree.contentType == 'heading'
        },
        unlinkFromParent(){
            if (confirm("Warning! Are you sure you would you like to delete this tree?")){
                this.tree.unlinkFromParent()
            }
            removeTreeFromGraph(this.id)
        }
    }
}