import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

import OrderChip from '../../components/OrderChip/OrderChip'
import { Order } from '../../interfaces'
import { getTimestampDisplay } from '../../utils/orders.util'

const OrderDetails: React.FunctionComponent<{ order: Order }> = ({ order }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={`Order ${order.id} details`}>
        <TableBody>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">{order.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">{order.item}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Sale (MYR)</TableCell>
            <TableCell align="center">{order.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">
              <OrderChip status={order.status} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Created On</TableCell>
            <TableCell align="center">
              {getTimestampDisplay(order.createdAt)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Last Updated On</TableCell>
            <TableCell align="center">
              {getTimestampDisplay(order.updatedAt)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetails
