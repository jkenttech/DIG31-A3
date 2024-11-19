import App from './../../App'
import { Auth } from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import { Utils } from './../../Utils'

class AddVehicleView{
   
  init(){      
    console.log('AddVehicleView.init')  
    document.title = 'Add Vehicle'    
    this.render()
    Utils.pageIntroAnim()
  }

  addVehicleSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.addVehicle(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
    <div>
        <h1>Add Vehicle</h1>
        <sl-form class="form-signup" @sl-submit=${this.addVehicleSubmitHandler}>
            <div class="input-group">
            <sl-input name="registration" type="text" placeholder="Registration" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="make" type="text" placeholder="Make" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="model" type="text" placeholder="Model" required></sl-input>
            </div>
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Add Vehicle</sl-button>
        </sl-form>
    </div>
    `
    render(template, App.rootEl)
  }
}

export default new AddVehicleView()