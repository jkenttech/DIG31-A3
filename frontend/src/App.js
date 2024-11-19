import Router from './Router'
import { Auth } from './Auth'
import * as _config from './utils/config.js'

class App {
  constructor(){
    this.name = _config.appName
    this.version = _config.version
    this.apiBase = "http://localhost:3030"
    this.rootEl = document.getElementById("root")
  }
  
  init() { 
    console.log("App.init")
    
    // Authentication check    
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()
