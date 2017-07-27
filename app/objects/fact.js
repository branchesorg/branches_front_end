import md5 from 'md5';
import user from './user'
import firebase from './firebaseService'
export class Fact {
  //constructor is used when LOADING facts from db or when CREATING facts from Facts.create
  constructor ({question, answer, id, usersTimeMap, trees}){
    this.question = question;
    this.answer = answer;
    this.id = id || md5(JSON.stringify({question: question, answer: answer}));
    this.trees = {}

    this.usersTimeMap = usersTimeMap || {} ;

    this.timeElapsedForCurrentUser = user.loggedIn && this.usersTimeMap && this.usersTimeMap[user.getId()] || 0
    this.timerId = null;
  }

  updateWithUserInfo() {//in case the card was loaded before the user logged in and userTimeElapsed is just a 0 when it actually isnt in the db
    this.timeElapsed = user.loggedIn && usersTimeMap[user.getId()] || 0
  }

  //bc certain properties used in the local js object in memory, shouldn't be stored in the db

    getDBRepresentation(){
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            trees: this.trees,
            usersTimeMap: this.usersTimeMap
        }
    }

  addTree(treeId){
    this.trees[treeId] = true
    var trees = {}
    trees[treeId] = true
    var updates = {
      trees
    }
    firebase.database().ref('facts/' +this.id).update(updates)
  }
  continueTimer(){
      if (!user.loggedIn) return;
      if (this.timerId) return;
      const self = this
      this.timerId = setInterval(()=>{
         self.timeElapsedForCurrentUser++
      },1000)
  }

  pauseTimer() {
      if (!user.loggedIn) return;
      if (!this.timerId) return;

      clearInterval(this.timerId)
      this.timerId = null
      this.usersTimeMap[user.getId()] = this.timeElapsedForCurrentUser

      var updates = {
          usersTimeMap: this.usersTimeMap
      }
      firebase.database().ref('facts/' + this.id).update(updates)
  }
  setTimerForUser(time){
      console.log('setTimer for user just called')
      this.usersTimeMap[user.getId()] = time

      var updates = {
          usersTimeMap: this.usersTimeMap
      }

      firebase.database().ref('facts/' + this.id).update(updates)
  }

}
