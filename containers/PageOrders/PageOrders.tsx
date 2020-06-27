import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../components/Layout/Layout'
import OrderChip from '../../components/OrderChip/OrderChip'
import { Order } from '../../interfaces'
import {
  getOrders,
  Action as OrdersAction,
} from '../../store/orders/orders.action'

import * as s from './PageOrders.styled'
import { AppState } from '../../store/reducers'

const PageOrders = () => {
  const dispatch = useDispatch()
  const ordersStore = useSelector((state: AppState) => state.orders)

  const [orders, setOrders] = React.useState<Order[]>([])
  // const [isPollOrders, setIsPollOrders] = React.useState(false)

  // load data
  React.useEffect(() => {
    dispatch(getOrders(false))

    const intervalID = setInterval(() => {
      // poll for orders list
      dispatch(getOrders(true))
    }, 10000)

    return () => {
      clearInterval(intervalID)
    }
  }, [])

  // update orders
  React.useEffect(() => {
    if (
      ordersStore.type === OrdersAction.GetOrdersSuccessful &&
      ordersStore.orders
    ) {
      setOrders(ordersStore.orders)
    }
  }, [ordersStore])

  const renderOrderList = (orders: Order[]) => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="order list">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Sale</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.item}</TableCell>
                <TableCell align="center">{order.price}</TableCell>
                <TableCell align="center">
                  <OrderChip status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Layout navbar={{ isProminent: true, title: 'Orders' }}>
      <Container fixed>
        <s.GridContainer container spacing={2}>
          <Hidden smDown>
            <Grid item sm={2} />
          </Hidden>
          <Grid item xs={12} sm={8}>
            {renderOrderList(orders)}
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} />
          </Hidden>
        </s.GridContainer>
      </Container>
    </Layout>
  )
}

export default PageOrders
