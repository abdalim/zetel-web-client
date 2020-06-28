import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

import OrderChip from '../../components/OrderChip/OrderChip'
import { Order } from '../../interfaces'

import * as s from './OrderList.styled'

export interface Props {
  orders: Order[]
  onClickOrder: (id: number) => () => void
}

const OrderList: React.FunctionComponent<Props> = (props) => {
  const { orders, onClickOrder } = props

  return (
    <TableContainer component={Paper}>
      <Table aria-label="order list">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Sale (MYR)</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <s.ZTableRow key={order.id} onClick={onClickOrder(order.id)}>
              <TableCell align="center">{order.id}</TableCell>
              <TableCell align="center">{order.item}</TableCell>
              <TableCell align="center">{order.price}</TableCell>
              <TableCell align="center">
                <OrderChip status={order.status} />
              </TableCell>
            </s.ZTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderList
