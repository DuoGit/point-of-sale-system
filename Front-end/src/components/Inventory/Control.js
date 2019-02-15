import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DeleteLogo from 'material-ui/svg-icons/action/delete-forever'
import AddLogo from 'material-ui/svg-icons/action/add-shopping-cart'
import ChangeLogo from 'material-ui/svg-icons/action/build'
import RefreshLogo from 'material-ui/svg-icons/action/autorenew'
import AddDialog from './AddDialog'
import ChangeDialog from './ChangeDialog'
class Control extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchInput: '',
            addDialog: false,
            changeDialog: false
        }
    }

    closeAddDialog = () => {
        this.setState({
            addDialog: false,
        })
    }

    openAddDialog = () => {
        this.setState({
            addDialog: true,
        })
    }

    closeChangeDialog = () => {
        this.setState({
            changeDialog: false,
        })
    }

    openChangeDialog = () => {
        this.setState({
            changeDialog: true,
        })
    }


    render(){
    return (
        <div className='control'>
            <AddDialog 
                open={this.state.addDialog}
                onRequestClose={this.closeAddDialog}
                handleAdd={this.props.handleAdd}
            />
            <ChangeDialog
                open={this.state.changeDialog}
                onRequestClose={this.closeChangeDialog}
                productSelected={this.props.productSelected}
                handleChange={this.props.handleChange}
            />            
            <RaisedButton label="Refresh" primary={true} icon={<RefreshLogo/>} onClick={this.props.fetchAll}/>
            <RaisedButton label="Add Product" primary={true} icon={<AddLogo/>} onClick={this.openAddDialog} />
            <RaisedButton label="Change Selected" primary={true} icon={<ChangeLogo/>} onClick={this.openChangeDialog}/>
            <RaisedButton label="Delete Selected" primary={true} icon={<DeleteLogo/>} onClick={this.props.handleDelete} />
        </div>
    )
}
}

export default Control
