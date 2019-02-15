import Dialog from 'material-ui/Dialog';
import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddDialog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            code: '',
        }
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleCode = (event) => {
        this.setState({
            code: event.target.value,
        });
    };

    handleSubmit = (event) => {
        const postData = {
            name: this.state.name,
            code: this.state.code,
        }
        this.props.handleAdd(postData)
        this.resetTextfield()
        this.props.onRequestClose()
    }

    resetTextfield = () => {
        this.setState({
            name: '',
            code: '',
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
                floatingLabelText='Barcode'
                floatingLabelFixed={true}
                onChange={this.handleCode}
                value={this.state.code}/>
                <RaisedButton label='Add Product' primary={true} onClick={this.handleSubmit}/>
            </div>
            </Dialog>
  
        )
    }
}

export default AddDialog

