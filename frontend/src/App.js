import Router from './Router'
import { Auth } from './Auth'
import * as _config from './utils/config.js'
import Toast from './Toast'

class App {
  constructor(){
    this.name = _config.appName
    this.version = _config.version
    this.apiBase = "ec2-13-55-170-8.ap-southeast-2.compute.amazonaws.com"
    this.rootEl = document.getElementById("root")
  }
  
  init() { 
    console.log("App.init")
    Toast.init()   
    
    // Authentication check    
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()
