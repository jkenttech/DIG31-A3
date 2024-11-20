import App from './../../App'
import  { Auth } from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import { Utils } from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/components/radio/radio.js"></script>
      <div class="page-content page-centered">      
        <div class="signup-box">
	  <div class="left">
            <img class="signinup-logo" src="/images/car-placeholder.jpg">
	  </div>
	  <div class="right">
            <h1>Sign Up</h1>
            <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
              <div class="input-group">
                <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="email" type="email" placeholder="Email" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
              </div>            

              <sl-radio-group label="accessLevel" name="accessLevel">
                <p>Select account type:
                  <sl-radio name="accessLevel" value="1">User</sl-radio>
                  <sl-radio name="accessLevel" value="2">Admin</sl-radio>
                </p>
              </sl-radio-group>

              <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
            </sl-form>
            <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
	  </div>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()
