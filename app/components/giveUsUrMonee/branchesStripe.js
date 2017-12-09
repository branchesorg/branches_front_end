import {mapGetters} from 'vuex'
import { Bus } from 'vue-stripe';

export default {
    template: require('./branches-stripe.html'),
    created () {
        const self = this;
        // self.loggedIn = false;
        // self.user = {};
        // self.username = '';
        self.stripekey = "pk_test_5ohxWhILJDRRiruf88n3Tnzw";
        self.subscription = {
            name: 'Branches Subscription',
            description: 'Monthly Branches Subscription',
            amount: 1999 // $19.99 in cents
        }
        Bus.$on('vue-stripe.success', payload => {
            console.log("Success: ", payload);
        });
        Bus.$on('vue-stripe.error', payload => {
            console.log("Error: ", payload);
        });
    },
    data () {
        return {
            stripekey: this.stripekey
        }
    },
    computed: {

    },

    asyncComputed: {
        async stuff(){

        },
    },

    // watch: {
    //     currentStudyingCategoryTreeId(newId, oldId){
    //         console.log('now studying ', newId)
    //     }
    // },
    methods: {
        dothings () {
            console.log("things");
        },
    }
}
