import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import {withRouter} from 'react-router-dom'
import LoginLogo from 'material-ui/svg-icons/action/account-circle'

const LoginStyle={
  marginTop: '100px',
  width: '300px',
  padding: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
}

const LogoStyle={
    width: '50px',
    height: '50px',
    marginTop: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
}

class Login extends React.Component { 
    constructor(props){
      super(props)
      this.state = {
        name: '',
        pass: '',
        failed: false
      }
    }
  
    setFailed = () => {
      this.setState({
        failed: true
      })
    }

    setSuccess = () => {
      this.setState({
        failed: false
      })
    }
  
    resetField = () => {
      this.setState({
        name: '',
        pass: '',
      })
    }
  
    handleSubmit = () => {
      let postData = {
        "name": this.state.name,
        "pass": this.state.pass
      }
      fetch('http://localhost:8080/api/auth', 
      {
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      switch (res.role){
        case 'admin':
          this.props.loginUser(res)
          this.props.history.push('/admin')
          break
        case 'cashier':
          this.props.loginUser(res)
          this.props.history.push('/cashier')
          break
        default:
          this.setFailed()
          this.resetField()
          break
      }}
    )
    }
  
    handleName = (e) => {
      this.setState({
        name: e.target.value
      })
    }
  
    handlePass = (e) => {
      this.setState({
        pass: e.target.value
      })
    }
  
    render(){
    
      const actions = 
        <RaisedButton
          label="Try again"
          primary={true}
          onClick={this.setSuccess}
        />
      return (
      <Paper zDepth={3} style={LoginStyle}>
        <RaisedButton label="MY LITTLE SHOP"/>
        <LoginLogo style={LogoStyle}/>
        <Dialog
          title="Warning! Authentication failed!"
          actions={actions}
          modal={true}
          open={this.state.failed}
        />

        <TextField
          floatingLabelText="ENTER YOUR ACCOUNT"
          floatingLabelFixed={true}
          onChange={this.handleName}
          value={this.state.name}
        />
        <TextField
        type='password'
        floatingLabelText="ENTER YOUR PASSWORD"
        floatingLabelFixed={true}
        onChange={this.handlePass}
        value={this.state.pass}
        />
        <RaisedButton label="Login" primary={true} onClick={this.handleSubmit}/>
      </Paper>
    )
    }
  }
  
export default withRouter(Login)