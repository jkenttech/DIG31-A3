import App from './../../App'
import { Auth } from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import { Utils } from './../../Utils'

class AddTripView{
   
  init(){      
    console.log('AddTripwView.init')  
    document.title = 'Add Trip'    
    this.render()
    Utils.pageIntroAnim()
  }

  addTripSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.addTrip(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
    <va-app-header title="Home"></va-app-header>
    <div>
        <h1>Add Trip for ${window.location.search.substring(1)}</h1>
        <sl-form class="form-signup" @sl-submit=${this.addTripSubmitHandler}>
            <div class="input-group">
            <sl-input name="registration" type="text" value"${window.location.search.substring(1)}" required hidden disabled></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="startAddress" type="text" placeholder="Start Address" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="startDate" type="date" placeholder="Start Date/Time" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="finishAddress" type="text" placeholder="Finish Address" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="finishDate" type="date" placeholder="Finish Date/Time" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="startOdometerReading" type="number" placeholder="Start Odometer Reading" required></sl-input>
            </div>
            <div class="input-group">
            <sl-input name="finishOdometerReading" type="number" placeholder="Finish Odometer Reading" required></sl-input>
            </div>
            <div class="input-group">
            </div>
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Add Trip</sl-button>
        </sl-form>
    </div>
    `
    render(template, App.rootEl)
  }
}

export default new AddTripView()