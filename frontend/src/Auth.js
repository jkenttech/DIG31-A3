import App from './App'
import Router, { gotoRoute } from './Router'
import {html, render } from 'lit-html'
import splash from './views/partials/splash'

export class Auth {

  constructor(){
    this.currentUser = {}
  }
  
  static async signUp(userData, fail = false){  
    const response = await fetch(`${App.apiBase}/user`, {
      method: 'POST',      
      body: userData
    })

      // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
    // redirect to signin
    gotoRoute('/signin')
  }

  static async updateProfile(userData, fail = false){  
    const response = await fetch(`${App.apiBase}/user/${Auth.currentUser._id}`, {
      method: 'PUT',      
      body: userData
    })

      // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
    // redirect to signin
    gotoRoute('/profile')
  }

  static async addVehicle(userData, fail = false){  
    userData.append("email", Auth.currentUser.email);
    const response = await fetch(`${App.apiBase}/vehicle`, {
      method: 'POST',      
      body: userData
    })

      // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
    // redirect to signin
    gotoRoute('/')
  }

  static async addTrip(userData, fail = false){  
    userData.append("email", Auth.currentUser.email);
    const response = await fetch(`${App.apiBase}/trip`, {
      method: 'POST',      
      body: userData
    })

      // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
    // redirect to signin
    gotoRoute('/')
  }

  static async signIn(userData, fail = false){
    const response = await fetch(`${App.apiBase}/auth/signin`, {
      method: 'POST',      
      body: userData
    })

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }

    // sign in success
    const data = await response.json()
    // save access token (jwt) to local storage
    localStorage.setItem('accessToken', data.accessToken)
    // set current user
    this.currentUser = data.user      
    // console.log(this.currentUser)           
    // redirect to home
    Router.init()
    gotoRoute('/')
  }


  static async check(success){
    // show splash screen while loading ...   
    render(splash, App.rootEl)
    
    // check local token is there
    if(!localStorage.accessToken){
      // no local token!
      // redirect to sign in page      
      gotoRoute('/signin')
      return
    }
    
    // token must exist - validate token via the backend
    const response = await fetch(`${App.apiBase}/auth/validate`, {
      method: 'GET',
      headers: {        
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    })
    
    // if response not ok
    if(!response.ok){             
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // delete local token
      localStorage.removeItem('accessToken')
      // redirect to sign in      
      gotoRoute('/signin')
      return
    }
    
    // token is valid!
    const data = await response.json()
    // console.log(data)
    // set currentUser obj
    this.currentUser = data.user
    // run success
    success()
  }

  static signOut(){
    // delete local token
    localStorage.removeItem('accessToken')       
    // redirect to sign in    
    gotoRoute('/signin')
    // unset currentUser
    this.currentUser = null
  }
}
