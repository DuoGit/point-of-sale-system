import React from 'react'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ProductDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qty: 1,
        }
    }
    onChange = (event) => {
        this.setState({
            qty: event.target.value,
        });
    };
    handleSubmit = () => {
        this.props.closeProductDialog()
        this.props.handleQuantity(this.state.qty)
        this.setState({
            qty: 1
        })
    }

    handleClose = () => {
        this.props.closeProductDialog()
        this.setState({
            qty: 1
        })
    }

    render(){
        return (
            <Dialog
            style={{width:'480px'}}
            title={"Enter a quantity"}
            modal={false}
            open={this.props.dialogOpened}
            onRequestClose={this.props.closeProductDialog}>  
            <TextField
            id="number"
            label="Number"
            value={this.state.qty}
            onChange={this.onChange}
            type="number"
            margin="normal"
          />  
          <RaisedButton label='Add Transaction' primary={true} onClick={this.handleSubmit}/>
          <RaisedButton label='Close' primary={true} onClick={this.handleClose}/>
          </Dialog>
        )
    }

}

export default ProductDialog