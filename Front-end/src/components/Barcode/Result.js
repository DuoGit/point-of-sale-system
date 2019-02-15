import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const style= {
  width: "600px",
  textAlign: "center",
  marginLeft: "auto",
  marginRight: "auto",
}

const Result = (props) => {
    let found = props.transaction[0]
    return (
        <List style={style}>
        <Subheader>Transaction:</Subheader>
          {found && props.transaction.map(item => {
            const quantity = item.qty ? item.qty : 'Please Check Shop Management'
            return (
              <ListItem key={item.product.name}>
                {"Name: " + item.product.name + "     Barcode: " + item.product.code + "     Quantity: " + quantity}
              </ListItem>
            )
          })}
        </List>
      )
}



export default Result