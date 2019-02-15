import React from 'react'
import UserTable from './UserTable'
import Control from './Control'

class User extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            rawData: [],
            userSelected: {},
          } 
      }
  
    fetchAll = () => {
        fetch('http://localhost:8080/api/user?token=' + localStorage.getItem('token'))
        .then(res => res.json())
        .then(res => {
          this.setState({
          rawData: res,
        })})
        .then(() => this.forceUpdate())
        .catch(error => console.log(error))
      }
   
      
      handleDelete = () => {
        const deleteUrl = 'http://localhost:8080/api/user/' + this.state.userSelected.shop + '?token=' + localStorage.getItem('token')
        // console.log(deleteUrl)
        fetch(deleteUrl, {
            // body: JSON.stringify({shop: this.state.userSelected.shop}),
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
        fetch('http://localhost:8080/api/user?token=' + localStorage.getItem('token') , {
            body: JSON.stringify(postData),
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(this.fetchAll)
        .catch(error => console.log(error))
      }
    
      handleChange = (putData) => {
        fetch('http://localhost:8080/api/user/' + this.state.userSelected.shop + '?token=' + localStorage.getItem('token') , {
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
        const userSelected = this.state.rawData[rows[0]]
        if (userSelected !== undefined){
        const newState = this.state.rawData.map((item, index)=>{
            return {
                ...item,
                selected: index === rows[0] ? true : false
            }
        })    
        this.setState({
            userSelected,
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
                    userSelected={this.state.userSelected}
                    handleChange={this.handleChange}
                />
                <UserTable
                    rawData={this.state.rawData}
                    handleSelect={this.handleSelect}
                />
            </div>
    )}
}

export default User