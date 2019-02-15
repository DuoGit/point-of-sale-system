import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

  class TransTable extends React.Component {
    render(){
    return (
      <Table
      fixedHeader={true}
      selectable={false}
    >
      <TableHeader
        adjustForCheckbox={true}
      >
        <TableRow>
          <TableHeaderColumn colSpan="6" style={{textAlign: 'center', fontSize: '1.2em'}}>
           {"Transactions: " + this.props.tableData.length}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn colSpan="6" style={{textAlign: 'center', fontSize: '1.2em'}}>
           {"IN: " + this.props.INData + " OUT: " + this.props.OUTData + " DIFF: " + this.props.difference}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>TransID</TableHeaderColumn>
          <TableHeaderColumn>Barcode</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Type</TableHeaderColumn>
          <TableHeaderColumn>Quantity</TableHeaderColumn>
          <TableHeaderColumn>Shop</TableHeaderColumn>
       </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {this.props.tableData.length > 0 ? this.props.tableData.map( (row, index) => (
          <TableRow key={row.transID+row.code}>
            <TableRowColumn>{row.transID}</TableRowColumn>
            <TableRowColumn>{row.code}</TableRowColumn>
            <TableRowColumn>{row.date}</TableRowColumn>
            <TableRowColumn>{row.type}</TableRowColumn>
            <TableRowColumn>{row.qty}</TableRowColumn>
            <TableRowColumn>{row.shopID}</TableRowColumn>
          </TableRow>
          )) : 
          <TableRow selectable={false}>
            <TableRowColumn 
            colSpan='6'
            style={{textAlign: 'center'}}
            >
              Item Not Found
            </TableRowColumn>
          </TableRow>}
      </TableBody>
    </Table>
    )}
  }

  export default TransTable