import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

  const UserTable = (props) => {

    return (
      <Table
      fixedHeader={true}
      selectable={true}
      onRowSelection={props.handleSelect}
    >
      <TableHeader
        adjustForCheckbox={true}
      >
        <TableRow>
          <TableHeaderColumn colSpan="4" style={{textAlign: 'center', fontSize: '1.5em'}}>
           {"All Products"}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Password</TableHeaderColumn>
          <TableHeaderColumn>Shop ID</TableHeaderColumn>
          <TableHeaderColumn>Is Admin</TableHeaderColumn>
       </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {props.rawData.length > 0 ? props.rawData.map( (row, index) => (
          <TableRow key={row.name+row.shop} selected={row.selected}>
            <TableRowColumn>{row.name}</TableRowColumn>
            <TableRowColumn>{row.pass}</TableRowColumn>
            <TableRowColumn>{row.shop}</TableRowColumn>
            <TableRowColumn>{row.isAdmin}</TableRowColumn>
          </TableRow>
          )) : 
          <TableRow selectable={false}>
            <TableRowColumn 
            colSpan='4'
            style={{textAlign: 'center'}}
            >
              Item Not Found
            </TableRowColumn>
          </TableRow>}
      </TableBody>
    </Table>
    )
  }

  export default UserTable