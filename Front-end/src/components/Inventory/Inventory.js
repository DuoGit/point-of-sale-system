import React from 'react'
import Shoptable from './Shoptable'
import Control from './Control'

class Inventory extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          rawData: [],
          productSelected: {},
        } 
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
   
      
      handleDelete = () => {
        const deleteUrl = 'http://localhost:8080/api/product/' + this.state.productSelected.code + '?token=' + localStorage.getItem('token')
        // console.log(deleteUrl)
        fetch(deleteUrl, {
            body: JSON.stringify({shop: this.state.productSelected.shop}),
            method: 'DELETE',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
                }
        })
        .then(res => res.json())
        .then(this.fetchAll)
        .catch(error => console.log(error))
      }
      
      handleAdd = (postData) => {
        fetch('http://localhost:8080/api/product?token=' + localStorage.getItem('token') , {
            body: JSON.stringify(postData),
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.log(error))
      }
    
      handleChange = (putData) => {
        fetch('http://localhost:8080/api/product/' + this.state.productSelected.code + '?token=' + localStorage.getItem('token') , {
            body: JSON.stringify(putData),
            method: 'PUT',
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(this.fetchAll)
        .catch(error => console.log(error))
      }
  
      handleSelect = (rows) => {
        const productSelected = this.state.rawData[rows[0]]
        if (productSelected !== undefined){
        const newState = this.state.rawData.map((item, index)=>{
            return {
                ...item,
                selected: index === rows[0] ? true : false
            }
        })    
        this.setState({
            productSelected,
            rawData: newState
        })
      }
      }
          
      componentDidMount(){
        this.fetchAll()
      }
      render(){
        return (
            <div className='inventory'>
                <Control 
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    fetchAll={this.fetchAll}
                    productSelected={this.state.productSelected}
                    handleChange={this.handleChange}
                />
                <Shoptable 
                    rawData={this.state.rawData}
                    handleSelect={this.handleSelect}
                />
            </div>
    )}
}

export default Inventory