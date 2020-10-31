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
import useSort from 'useSort'

const useStyles = makeStyles(() => ({
  tableContainer: {
    maxHeight: '70vh',
  },
}))

const TableData = () => {
  const classes = useStyles()
  const { loading, sortedData, sorts, sortBy } = useSort(Data, 'id')

  if (loading) return <></>

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                direction={sorts.id.direction}
                active={sorts.id.active}
                onClick={() => sortBy('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.firstName.direction}
                active={sorts.firstName.active}
                onClick={() => sortBy('firstName')}
              >
                First name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.lastName.direction}
                active={sorts.lastName.active}
                onClick={() => sortBy('lastName')}
              >
                Last name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.age.direction}
                active={sorts.age.active}
                onClick={() => sortBy('age')}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.email.direction}
                active={sorts.email.active}
                onClick={() => sortBy('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.address.direction}
                active={sorts.address.active}
                onClick={() => sortBy('address')}
              >
                Address
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                direction={sorts.phoneNumber.direction}
                active={sorts.phoneNumber.active}
                onClick={() => sortBy('phoneNumber')}
              >
                Address
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((user) => {
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
