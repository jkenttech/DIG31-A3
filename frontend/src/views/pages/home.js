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
    try {
      this.vehicles = await VehicleAPI.getVehiclesByEmail(Auth.currentUser.email)      
      this.render()
    }catch(err){
      console.log(err)
    }
  }

  render_vehicles(vehicles){
    let tempImg = "/images/car-placeholder.jpg";
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
              <sl-button variant="secondary" @click=${() => gotoRoute(`/vehicle?${vehicle.registration}`)} pill>View Trips</sl-button>
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
