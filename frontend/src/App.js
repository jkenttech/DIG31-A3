import Router from './Router'
import { Auth } from './Auth'
import * as _config from './utils/config.js'
import Toast from './Toast'

class App {
  constructor(){
    this.name = _config.appName
    this.version = _config.version
    this.apiBase = "http://127.0.0.1:3030"
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
