import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Scanner from './Scanner'
import StartLogo from 'material-ui/svg-icons/av/play-arrow'
import StopLogo from 'material-ui/svg-icons/av/stop'
import Result from './Result'

class Barcode extends React.Component {
    constructor(props){
        super(props)
        this.transaction = []
        this.resultCode = ''
        this.listProduct = []
        this.state = {
            scanning: false,
            rawData: [],
        }
        this.onDetected = this.onDetected.bind(this)
    }

    componentDidMount(){
        this.fetchAll()
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
        if (this.resultCode === '' || this.resultCode !== resultCode){
            this.resultCode = resultCode
            let scanResult = this.state.rawData.filter(item => {
                return (item.code === this.resultCode)
            })
            if (scanResult.length > 0) {
                this.transaction.push({
                    product: scanResult[0],
                })
                this.setState({
                    transaction: this.transaction
                })        
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
            dialogOpened: false,
            transaction: [],
        })
        this.resultCode = ''
        this.transaction = []
    }


    render() { 
        return (
        <div className='barcode'>
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
  