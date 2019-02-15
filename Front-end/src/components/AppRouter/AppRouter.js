import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Login from './Login';
import Admin from '../Admin/Admin';
import Shop from '../Shop/Shop';

class AppRouter extends React.Component {

  constructor(props){
    super(props)

    let token = localStorage.getItem('token')
    let role = localStorage.getItem('role')
    let shopID = localStorage.getItem('shopID')
    this.state = {
      token: token || false,
      role: role || false,
      shopID: shopID || false
    }
}

  loginUser = (auth) => {
    localStorage.setItem('token', auth.token)
    localStorage.setItem('role', auth.role)
    localStorage.setItem('shopID', auth.shopID)
    this.setState({
      token: auth.token,
      role: auth.role,
      shopID: auth.shopID ? auth.shopID : false
    })
  }

  logoutUser = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('shopID')
    fetch('http://localhost:8080/api/logout?token=' + localStorage.getItem('token'))
    .then(res => res.json())
    .then(res => {
      this.setState({
        role: false,
        token: false,
        shopID: false,
      })
    })
  }

  render(){
    return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Login loginUser={this.loginUser}/>}/>
        <Route exact path="/admin" 
          render={() => 
            this.state.role === 'admin' ? 
            <Admin logoutUser={this.logoutUser}/> :
            <Redirect to="/" />}
        />
        <Route exact path="/cashier" 
          render={() => 
            this.state.role === 'cashier' ?
            <Shop shopID={this.state.shopID} logoutUser={this.logoutUser}/> : 
            <Redirect to="/"/>}
        />
        <Redirect to='/'/>}/>
      </Switch>
    </Router>
    )
  }
}

export default AppRouter