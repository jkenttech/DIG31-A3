// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signupView from './views/pages/signup'
import signinView from './views/pages/signin'
import addVehicleView from './views/pages/addVehicle'
import addTripView from './views/pages/addTrip'
import vehicleTripView from './views/pages/vehicleTrip'
import profileView from './views/pages/profile'

// define routes
const routes = {
	'/': homeView,	
	'404' : fourOFourView,
	'/signup': signupView,	
	'/signin': signinView,	
	'/addvehicle': addVehicleView,
	'/addtrip': addTripView,
	'/vehicle': vehicleTripView,
	'/profile': profileView,
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
