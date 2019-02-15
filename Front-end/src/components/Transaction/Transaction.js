import React from 'react'
import TransTable from './TransTable'
import Control from './Control'
import DatePicker from 'material-ui/DatePicker';
import AddLogo from 'material-ui/svg-icons/action/add-shopping-cart'
import TransDialog from './TransDialog'

class Transaction extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tableData: [],
            rawData: [],
            uniqueBarcode: [],
            uniqueShop: [],
            uniqueType: ['in', 'out'],
            shopFilter: 0,
            typeFilter: 'type',
            barcodeFilter: 'barcode',
            INData: 0,
            OUTData: 0,
            difference: 0,
            startDate: '',
            endDate: '',
            dialogOpened: false
          } 
      }
      
    setShopFilter = (shopFilter) => {
      // this.state.shopFilter = shopFilter
      this.setState({
        shopFilter
      }, this.filterRawData)
    }

    setTypeFilter = (typeFilter) => {
      this.setState({
        typeFilter
      }, this.filterRawData)
    }

    setBarcodeFilter = (barcodeFilter) => {
      this.setState({
        barcodeFilter
      }, this.filterRawData)
    }

    setStartDate = (startDate) => {
      this.setState({
        startDate
      }, this.filterRawData)
    }

    setEndDate = (endDate) => {
      this.setState({
        endDate
      }, this.filterRawData)
    }
    
    filterRawData = () => {
      let tableData = this.state.rawData
      if (this.state.shopFilter !== 0){
          tableData = tableData.filter(transaction => {
            return transaction.shopID === this.state.shopFilter
          })
      }
      if (this.state.barcodeFilter !== 'barcode'){
          tableData = tableData.filter(transaction => {
            return transaction.code === this.state.barcodeFilter
          })
      }
      if (this.state.typeFilter !== 'type'){
          tableData = tableData.filter(transaction => {
            return transaction.type === this.state.typeFilter
          })
      }
      let INData = this.calculateIN(tableData)
      let OUTData = this.calculateOUT(tableData)
      let difference = INData - OUTData
      if (this.state.startDate !== ''){
      tableData = tableData.filter(transaction => {
        return new Date(transaction.date) >= new Date(this.state.startDate)
      })
      }
      if (this.state.endDate !== ''){
      tableData = tableData.filter(transaction => {
        return new Date(transaction.date) <= new Date(this.state.endDate)
      })
      }

      this.setState({
        tableData,
        INData,
        OUTData,
        difference
      })
    }

    calculateIN = (tableData) => {
      let INData = tableData.filter(transaction =>{
        return transaction.type === 'in'
      })
      return INData.reduce((prev, cur) => {
        return prev + cur.qty
      }, 0)
    }

    calculateOUT = (tableData) => {
      let OUTData = tableData.filter(transaction =>{
        return transaction.type === 'out'
      })
      return OUTData.reduce((prev, cur) => {
        return prev + cur.qty
      }, 0)
    }

    fetchAll = () => {
        fetch('http://localhost:8080/api/transaction?token=' + localStorage.getItem('token'))
        .then(res => res.json())
        .then(res => {
          this.setState({
          rawData: res,
          tableData: res
        })})
        .then(() => this.setUniqueBarcode(this.state.rawData))
        .then(() => this.setUniqueShop(this.state.rawData))
        .then(() => this.forceUpdate())
        .catch(error => console.log(error))
      }

      setUniqueBarcode = (rawData) => {
        this.setState({
          uniqueBarcode: [...new Set(rawData.map(transaction => transaction.code))]
        })
      }

      setUniqueShop = (rawData) => {
        this.setState({
          uniqueShop: [...new Set(rawData.map(transaction => transaction.shopID))]
        })
      }

      componentDidMount(){
        this.fetchAll()
      }

      closeTransDialog = () => {
        this.setState({
            dialogOpened: false 
        })
    }

    openTransDialog = () => {
        this.setState({
            dialogOpened: true
        })
    }

    handleTransaction = (postData) => {
      console.log(postData)
      fetch('http://localhost:8080/api/transaction?token=' + localStorage.getItem('token') , {
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => console.log(error))
  }



      render(){
        return (
            <div className='inventory'>
            <TransDialog 
                closeTransDialog={this.closeTransDialog}
                dialogOpened={this.state.dialogOpened}
                handleTransaction={this.handleTransaction}
            />
                <Control 
                  uniqueShop={this.state.uniqueShop}
                  uniqueType={this.state.uniqueType}
                  uniqueBarcode={this.state.uniqueBarcode}
                  setBarcodeFilter={this.setBarcodeFilter}
                  setShopFilter={this.setShopFilter}
                  setTypeFilter={this.setTypeFilter}
                  filterRawData={this.filterRawData}
                  fetchAll={this.fetchAll}
                  setStartDate={this.setStartDate}
                  setEndDate={this.setEndDate}
                  openTransDialog={this.openTransDialog}
                  />
                <TransTable 
                    rawData={this.state.rawData}
                    tableData={this.state.tableData}
                    INData={this.state.INData}
                    OUTData={this.state.OUTData}
                    difference={this.state.difference}
                />
            </div>
    )}
}

export default Transaction