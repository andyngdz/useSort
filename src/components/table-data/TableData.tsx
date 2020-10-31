import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
} from '@material-ui/core'
import Data from './Data'

const useStyles = makeStyles(() => ({
  tableContainer: {
    maxHeight: '70vh',
  },
}))

const TableData = () => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>ID</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>First name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Last name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Age</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Address</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Phone number</TableSortLabel>
            </TableCell>
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
    </TableContainer>
  )
}

export default TableData
