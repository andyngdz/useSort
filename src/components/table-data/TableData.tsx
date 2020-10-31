import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import Data from './Data'

const TableData = () => {
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Phone number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Data.map((user) => {
          const {
            id,
            firstName,
            lastName,
            age,
            email,
            address,
            phoneNumber,
          } = user

          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{firstName}</TableCell>
              <TableCell>{lastName}</TableCell>
              <TableCell>{age}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TableData
