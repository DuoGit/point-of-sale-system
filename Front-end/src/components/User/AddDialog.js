import Dialog from 'material-ui/Dialog';
import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddDialog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            pass: '',
        }
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handlePass = (event) => {
        this.setState({
            pass: event.target.value,
        });
    };

    handleSubmit = (event) => {
        const postData = {
            name: this.state.name,
            pass: this.state.pass,
        }
        this.props.handleAdd(postData)
        this.resetTextfield()
        this.props.onRequestClose()
    }

    resetTextfield = () => {
        this.setState({
            name: '',
            pass: '',
        })
    }

    render(){
        const style={
            maxWidth: '420px'
        }
        return (
            <Dialog style={style}
            title='Add A Product'
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.onRequestClose}>  
            <div className='dialog-wrapper'>      
                <TextField
                floatingLabelText='Name'
                floatingLabelFixed={true}
                onChange={this.handleName}
                value={this.state.name}/>
                <TextField
                floatingLabelText='Pass'
                floatingLabelFixed={true}
                onChange={this.handlePass}
                value={this.state.pass}/>
                <RaisedButton label='Add User' primary={true} onClick={this.handleSubmit}/>
            </div>
            </Dialog>
  
        )
    }
}

export default AddDialog

