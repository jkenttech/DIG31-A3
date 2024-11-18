import App from './../../App'
import { html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      
      <div class="page-content">

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
