import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Scanner from './Scanner'
import StartLogo from 'material-ui/svg-icons/av/play-arrow'
import StopLogo from 'material-ui/svg-icons/av/stop'
import Result from './Result'
import ProductDialog from './ProductDialog'
class Barcode extends React.Component {
    constructor(props){
        super(props)
        this.transaction = []
        this.found = {}
        this.postData = {}
        this.state = {
            scanning: false,
            resultCode: '',
            rawData: [],
            dialogOpened: false,
            transaction: [],
        }
        this.onDetected = this.onDetected.bind(this)
    }

    componentDidMount(){
        this.fetchAll()
    }

    closeProductDialog = () => {
        this.setState({
            dialogOpened: false 
        })
    }

    fetchAll = () => {
        fetch('http://localhost:8080/api/product?token=' + localStorage.getItem('token'))
        .then(res => res.json())
        .then(res => {
          this.setState({
          rawData: res,
        })})
        .catch(error => console.log(error))
    }
    
    onDetected(result) {
        let resultCode = result.codeResult.code
        if (this.state.resultCode === '' || this.state.resultCode !== resultCode){
            this.setState({
                resultCode
            })
            let scanResult = this.state.rawData.filter(item => {
                return (item.code === this.state.resultCode)
            })
            if (scanResult.length > 0) {
                this.setState(prevState =>({
                    dialogOpened: true,
                }))
                this.found = scanResult[0]
            } 
        }
    }

    startReader = () => {
        this.setState({
            scanning: true
        }) 
    }

    endReader = () => {
        this.setState({
            scanning: false,
            result: '',
            quantity: 0
        })
        this.transaction = []
        this.found = {}
    }

    handleQuantity = (value) => {
        this.postData = {
            qty: value,
            name: this.found.name,
            shopID: this.props.shopID ? this.props.shopID : false,
            code: this.found.code,
            type: "out"
        }
        fetch('http://localhost:8080/api/transaction?token=' + localStorage.getItem('token') , {
            body: JSON.stringify(this.postData),
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.log(error))    
        this.transaction.push({
            product: this.found,
            qty: value
        })
        this.setState({
            transaction: this.transaction
        })
    }

    render() { 
        return (
        <div className='barcode'>
            <ProductDialog 
                closeProductDialog={this.closeProductDialog}
                dialogOpened={this.state.dialogOpened}
                handleQuantity={this.handleQuantity}
                />
            <div className='barcode-control'>
                <RaisedButton icon={<StartLogo/>} label="Start decoding" primary={true} onClick={this.startReader}/>
                <RaisedButton icon={<StopLogo/>} label="Stop decoding" primary={true} onClick={this.endReader}/>
            </div>
            <Result transaction={this.transaction}/>
            {this.state.scanning && <Scanner onDetected={this.onDetected}/>}
        </div>
        )
    }
}

export default Barcode
  