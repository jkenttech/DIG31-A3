import App from './../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from './../../Router'
import { Utils } from '../../Utils'
import UserAPI from '../../UserAPI'
import VehicleAPI from '../../VehicleAPI'
import { Auth } from '../../Auth'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    Utils.pageIntroAnim()    
    this.getVehicles()
  }

  async getVehicles(){
    console.log(`currentUser.email is ${Auth.currentUser.email}`)
    try {
      this.vehicles = await VehicleAPI.getVehiclesByEmail(Auth.currentUser.email)      
      this.render()
    }catch(err){
      console.log(err)
    }
  }

  render_vehicles(vehicles){
    let tempImg = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    let vehicleInfo;
    if(Object.keys(vehicles).length > 0){
      vehicleInfo = html`
        ${this.vehicles.map((vehicle)=>html`
          <sl-card class="card-overview">
            <img
              slot="image"
              src="${tempImg}"
            />

            <strong>${vehicle.registration}</strong><br />
            ${vehicle.make}<br />
            ${vehicle.model}<br />

            <div slot="footer">
              <sl-button variant="primary" @click=${() => gotoRoute(`/addtrip?${vehicle.registration}`)} pill>Add Trip</sl-button>
              <sl-button variant="secondary" @click=${() => gotoRoute(`/trips?${vehicle.registration}`)} pill>View Trips</sl-button>
            </div>
          </sl-card>
        `)}
      `
    } else {
      vehicleInfo = html`<strong>No vehicles to display</strong>`
    }
    return vehicleInfo;
  }

  render(){
    const template = html`
      <va-app-header title="Home"></va-app-header>
      
      <div class="page-content">

        ${this.render_vehicles(this.vehicles)}
        <br><br>
        <sl-button variant="primary" @click=${() => gotoRoute(`/addvehicle`)} pill>Add Vehicle</sl-button>
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
