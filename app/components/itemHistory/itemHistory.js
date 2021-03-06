// import ContentItems from '../../objects/contentItems'
// import {user} from '../../objects/user'
// import './itemHistory.less'

export default {
    template: require('./itemHistory.html').default, // '<div> {{movie}} this is the tree template</div>',
    props: ['itemId', 'tree'],
    async created () {
        // console.log('item history component created')
        var me = this;
        // new Chartist.Line('.ct-chart', {
        //   labels: [1, 2, 3, 4, 5, 6, 7, 8],
        //   series: [
        //     [5, 9, 7, 8, 5, 3, 5, 4]
        //   ]
        // }, {
        //   low: 0,
        //   showArea: true
        // });

        // this.content = await ContentItems.get(this.itemId)
        // this.loaded = true
        // this.loadItemHistory()
    },
    data () {
        return {
            content: {},// this.content
            loaded: false,
        }
    },
    computed : {
        interactions(){
            return this.content.interactions || []
        },
        uri() {
            // return this.loaded && this.content.getURIForWindow()
        }
    },
    methods: {
        clearInteractions(){
            // console.log("A: tree/tree clearInteractions() called")
            // user.addMutation('clearInteractions', {contentId: this.content.id, timestamp: Date.now()})
            // this.loadItemHistory()
        },
        loadItemHistory(){
            // this.interactions = this.content.interactions
            // console.log("interactions are ", this.interactions)
        },
    }
}
