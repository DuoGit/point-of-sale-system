import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DeleteLogo from 'material-ui/svg-icons/action/delete-forever'
import AddLogo from 'material-ui/svg-icons/action/add-shopping-cart'
import ChangeLogo from 'material-ui/svg-icons/action/build'
import RefreshLogo from 'material-ui/svg-icons/action/autorenew'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

class Control extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            barcodeSelected: "barcode",
            typeSelected: "type",
            shopSelected: 0,
            startDate: null,
            endDate: null
        }
    }

    handleBarcodeSelected = (event, target, barcodeSelected) => {
        this.setState({
            barcodeSelected
        })
        this.props.setBarcodeFilter(barcodeSelected)
        // this.props.filterRawData()
    }

    handleShopSelected = (event, target, shopSelected) => {
        this.setState({
            shopSelected
        })
        this.props.setShopFilter(shopSelected)
        // this.props.filterRawData()
    }

    handleTypeSelected = (event, target, typeSelected) => {
        this.setState({
            typeSelected
        })
        this.props.setTypeFilter(typeSelected)
        // this.props.filterRawData()
    }

    handleStartDate = (event, date) => {
        this.setState({
          startDate: new Date(date),
        }, () => this.props.setStartDate(date));
      };

    handleEndDate = (event, date) => {
        this.setState({
          endDate: new Date(date),
        }, () => this.props.setEndDate(date));
      };



    render(){
    return (
        <div className='control'>
            <RaisedButton icon={<AddLogo/>} label="Add Transaction" primary={true} onClick={this.props.openTransDialog}/>
            <RaisedButton icon={<RefreshLogo/>} label="Refresh" primary={true} onClick={this.props.fetchAll}/>
            <DropDownMenu value={this.state.barcodeSelected} onChange={this.handleBarcodeSelected}>
                <MenuItem key={"barcode"} value={"barcode"} primaryText={"Barcode"}/>
                {this.props.uniqueBarcode.map((code, index) => {
                    return (<MenuItem key={code} value={code} primaryText={code} />)
                })}
            </DropDownMenu>
            <DropDownMenu value={this.state.typeSelected} onChange={this.handleTypeSelected}>
                <MenuItem key={"type"} value={"type"} primaryText={"Type"}/>
                {this.props.uniqueType.map((code, index) => {
                    return (<MenuItem key={code} value={code} primaryText={code} />)
                })}
            </DropDownMenu>
            <DropDownMenu value={this.state.shopSelected} onChange={this.handleShopSelected}>
                <MenuItem key={0} value={0} primaryText={"0"}/>
                {this.props.uniqueShop.map((code, index) => {
                    return (<MenuItem key={code} value={code} primaryText={code} />)
                })}
            </DropDownMenu>
            <DatePicker
            hintText="Start Date"
            value={this.state.startDate}
            onChange={this.handleStartDate}
            />      
            <DatePicker
            hintText="End Date"
            value={this.state.endDate}
            onChange={this.handleEndDate}
            />
        </div>
    )
}
}

export default Control
