import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

  const Shoptable = (props) => {

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
          <TableHeaderColumn colSpan="2" style={{textAlign: 'center', fontSize: '1.5em'}}>
           {"All Products"}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Barcode</TableHeaderColumn>
       </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {props.rawData.length > 0 ? props.rawData.map( (row, index) => (
          <TableRow key={row.code+row.name} selected={row.selected}>
            <TableRowColumn>{row.name}</TableRowColumn>
            <TableRowColumn>{row.code}</TableRowColumn>
          </TableRow>
          )) : 
          <TableRow selectable={false}>
            <TableRowColumn 
            colSpan='2'
            style={{textAlign: 'center'}}
            >
              Item Not Found
            </TableRowColumn>
          </TableRow>}
      </TableBody>
    </Table>
    )
  }

  export default Shoptable