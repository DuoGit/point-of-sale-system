import Dialog from 'material-ui/Dialog';
import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ChangeDialog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
        }
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value,
        });
    };


    handleSubmit = (event) => {
        const putData = {
            name: this.state.name,
        }
        this.props.handleChange(putData)
        this.resetTextfield()
        this.props.onRequestClose()
    }

    resetTextfield = () => {
        this.setState({
            name: '',
        })
    }

    componentWillReceiveProps(){
        this.setState({
            name: this.props.productSelected.name,
        })
    }

    render(){
        const style={
            maxWidth: '420px'
        }
        return (
            <Dialog style={style}
            title='Change A Product'
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.onRequestClose}>
            <div className='dialog-wrapper'>      
                <TextField
                floatingLabelText='Name'
                floatingLabelFixed={true}
                onChange={this.handleName}
                value={this.state.name}/>
                <RaisedButton label='Change Product' primary={true} onClick={this.handleSubmit}/>
            </div>
            </Dialog>  
        )
    }
}

export default ChangeDialog
