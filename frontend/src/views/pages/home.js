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
    let vehicleInfo;
    if(Object.keys(vehicles).length > 0){
      vehicleInfo = html`<table>
      ${this.vehicles.map((vehicle)=>html`
        <tr>
        <td>${vehicle.registration}</td>
        <td>${vehicle.make}</td>
        <td>${vehicle.model}</td>
        </tr>
        `)}
        </table>`
    } else {
      vehicleInfo = html`<p>No vehicles to display</p>`
    }
    return vehicleInfo;
  }

  render(){
    const template = html`
      <va-app-header title="Home"></va-app-header>
      
      <div class="page-content">

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>

        ${this.render_vehicles(this.vehicles)}
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
