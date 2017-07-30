<style>
</style>
<template>
    <div>
        <span> {{movie}} </span>
        <span> so this is the tree vue component</span>
        <div>The time is {{person.time}}</div>
        <span> {{person.favColor}}</span>
        <div>age is {{person.age}}</div>
        <div> tree id is {{treeid}} </div>
        <!--<button v-on:click="counter += 1">{{ counter }}</button>-->
    </div>
</template>

<script>
    var time = 5;
    var favColor = 'blue'
    var info = {
        age: 7
    }
    var data = {
        time: 5,
        favColor: 'blue',
        age: 7
    }
    class Person {
        constructor(){
            this.time=5,
                this.favColor='blue',
                this.age= 7
        }
    }

    var person = new Person()
    console.log('person is ', person)
    console.log('data is ', data)

    export default {
        name: 'tree',
//        data: () => {favColor: 'blue'},
        data () {
            return {
                person: new Person() //{
//                    time: 5,
//                    favColor: 'blue',
//                    age: 7
//                }
            } //new Person()
        },
        methods: {
        },
        created: () => {
            var self = this;
            console.log('vue created', arguments)
            setInterval(function() {
               console.log('the time is', person.time++)
                console.log(person.favColor = person.favColor == 'blue' ? 'red': 'blue')
                person.age++
                console.log('tree instance is', self)
            }, 1000)

        },
        destroyed: () => { console.log('destroyed')},
        props: ['treeid', 'movie']
    }
</script>
