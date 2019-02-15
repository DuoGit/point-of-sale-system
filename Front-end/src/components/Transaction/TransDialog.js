import Dialog from 'material-ui/Dialog';
import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class AddDialog extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            code: '',
            shopID: '',
            qty: '',
            type: 'Select Type'
        }
    }

    handleShop = (event) => {
        this.setState({
            shopID: event.target.value,
        });
    };

    handleQuantity = (event) => {
        this.setState({
            qty: event.target.value,
        });
    };

    handleCode = (event) => {
        this.setState({
            code: event.target.value,
        });
    };


    handleSubmit = (event) => {
        this.resetTextfield()
        this.props.closeTransDialog()
        this.props.handleTransaction({
            code: this.state.code,
            qty: this.state.qty,
            shopID: this.state.shopID,
            type: this.state.type
        })

    }

    resetTextfield = () => {
        this.setState({
            code: '',
            qty: '',
            type: 'Select Type',
            shopID: ''

        })
    }

    handleTypeSelected = (event, target, type) => {
        this.setState({
            type
        })
    }

    handleClose = () => {
        this.resetTextfield()
        this.props.closeTransDialog()
    }

    render(){
        return (
            <Dialog 
            style={{width:'450px'}}
            title='Add A Product'
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.onRequestClose}
            open={this.props.dialogOpened}>  
            <div className='dialog-wrapper'>      
                <TextField
                floatingLabelText='Barcode'
                floatingLabelFixed={true}
                onChange={this.handleCode}
                value={this.state.code}/>
                <TextField
                floatingLabelText='Shop ID'
                floatingLabelFixed={true}
                onChange={this.handleShop}
                value={this.state.shopID}/>
                <TextField
                floatingLabelText='Quantity'
                floatingLabelFixed={true}
                onChange={this.handleQuantity}
                value={this.state.qty}/>
                <div>Select a type</div>
                <DropDownMenu value={this.state.type} onChange={this.handleTypeSelected}>
                    <MenuItem value={"in"} primaryText={"in"}/>
                    <MenuItem value={"out"} primaryText={"out"}/>
                </DropDownMenu>
                <RaisedButton label='Add Transaction' primary={true} onClick={this.handleSubmit}/>
                <RaisedButton label='Close' primary={true} onClick={this.handleClose}/>
            </div>
            </Dialog>
        )
    }
}

export default AddDialog

