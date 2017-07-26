import {login} from '../../core/login'
export function HeaderController() {
    console.log('Header controller just called!!')
    this.loggedIn = false;
    this.login = function(){
      login()
      this.loggedIn = true;
    }
}