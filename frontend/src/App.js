import Router from './Router'

class App {
  constructor(){
    this.name = "Simple Logbook"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3030'
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  init() { 
    console.log("App.init")
    
    Router.init()
  }
}

export default new App()
