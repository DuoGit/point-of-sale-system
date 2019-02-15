import React, {Fragment} from 'react'
import Transaction from '../Transaction/Transaction'
import Barcode from '../Barcode/Barcode'

import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from 'react-router-dom'
import BarcodeLogo from './BarcodeLogo' 
import HistoryLogo from 'material-ui/svg-icons/action/description'
import LogoutLogo from 'material-ui/svg-icons/action/power-settings-new'
import FlatButton from 'material-ui/FlatButton';

const logoutStyle={
  width: '35px',
  height: '35px',
}
class Shop extends React.Component {
  
    logoutUser = () => {
        this.props.logoutUser()
        this.props.history.push('/')
    }

    render(){
    return (
      <Fragment>
      <div className='admin-header'>
      <h2>CASHIER PANEL</h2>
      <FlatButton onClick={this.logoutUser} primary={true}><LogoutLogo style={logoutStyle}/></FlatButton>
      </div>
      <Tabs>
      <Tab icon={<BarcodeLogo/>} label="Barcode Scanner">
        <Barcode shopID={this.props.shopID}/>
      </Tab>
      <Tab icon=  {<HistoryLogo/>} label="Transactions History">
        <Transaction/>
      </Tab>
    </Tabs>     
    </Fragment>
    )
  }
}

export default withRouter(Shop)