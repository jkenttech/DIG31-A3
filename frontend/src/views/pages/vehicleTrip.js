import App from './../../App'
import { Auth } from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import { Utils } from './../../Utils'
import VehicleAPI from '../../VehicleAPI'

class vehicleTripView{
   
  init(){      
    console.log('AddVehicleView.init')  
    document.title = 'Add Vehicle'    
    Utils.pageIntroAnim()
    this.getTrips()
  }

  async getTrips(){
    try {
      this.trips = await VehicleAPI.getTripsByRegistration(window.location.search.substring(1))      
      console.log(JSON.stringify(this.trips))
      console.log(this.trips)
      this.render()
    }catch(err){
      console.log(err)
    }
  }

  render_trips(trips){
    let tempImg = "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
    let tripInfo;
    if(Object.keys(trips).length > 0){
      tripInfo = html`
        ${this.trips.map((trip)=>html`
          <sl-card class="card-header">
            <div slot="header">
              From: <strong>${trip.startAddress}</strong><br>
              To: <strong>${trip.finishAddress}</strong>
            </div>
            Start Time: <strong><sl-format-date hour="numeric" minute="numeric" day="numeric" month="long" year="numeric">{trip.startDate}</sl-format-date></strong><br>
            Finish Time: <strong><sl-format-date hour="numeric" minute="numeric" day="numeric" month="long" year="numeric">${trip.finishDate}</sl-format-date></strong><br>
            Start Odometer Reading: <strong>${trip.startOdometerReading}</strong><br>
            Finish Odometer Reading: <strong>${trip.finishOdometerReading}</strong><br>
            Start Address: <strong>${trip.startAddress}</strong><br>
            Finish Address: <strong>${trip.finishAddress}</strong>
          </sl-card>
        `)}
      `
    } else {
      tripInfo = html`<strong>No vehicles to display</strong>`
    }
    return tripInfo;
  }

  render(){
    const template = html`      
    <va-app-header title="Home"></va-app-header>
    <h2>Trips for ${window.location.search.substring(1)}</h2><br>
    <sl-button variant="primary" @click=${() => gotoRoute(`/addtrip?${window.location.search.substring(1)}`)} pill>Add Trip</sl-button>
    <br>
    <div>
      ${this.render_trips(this.trips)}
    </div>
    `
    render(template, App.rootEl)
  }
}

export default new vehicleTripView()