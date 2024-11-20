import App from './../../App'
import { Auth } from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import { Utils } from './../../Utils'

class ProfileView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  profileSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.updateProfile(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
    <va-app-header title="Profile"></va-app-header>
      <div class="page-content page-centered">      
        <div class="signup-box">
	  <div class="left">
            <img class="signinup-logo" src="/images/signup-placeholder.jpg">
	  </div>
	  <div class="right">
            <h1>Edit Profile for ${Auth.currentUser.email}</h1>
            <sl-form class="form-signup" @sl-submit=${this.profileSubmitHandler}>
              <div class="input-group">
                <sl-input name="firstName" type="text" placeholder="First Name" value="${Auth.currentUser.firstName}" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="lastName" type="text" value="${Auth.currentUser.lastName}" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="email" type="email" value="${Auth.currentUser.email}" required hidden></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="password" type="password" placeholder="Current Password" required toggle-password></sl-input>
              </div>            
              <div class="input-group">
                <sl-input name="newPassword" type="password" placeholder="New Password" toggle-password></sl-input>
              </div>            
              <div class="input-group">
                <sl-input name="newPasswordConfirm" type="password" placeholder="New Password Confirmation" toggle-password></sl-input>
              </div>            
              <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Save Changes</sl-button>
            </sl-form>
	  </div>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()
