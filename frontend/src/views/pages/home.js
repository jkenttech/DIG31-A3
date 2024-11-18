import App from './../../App'
import { html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
  }

  render(){
    const template = html`
      
      <div class="page-content">

          <p>Home content</p>
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
