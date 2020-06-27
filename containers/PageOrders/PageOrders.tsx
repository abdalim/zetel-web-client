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

import Layout from '../../components/Layout/Layout'
import { Order, OrderStatus } from '../../interfaces'

import * as s from './PageOrders.styled'

const PageOrders = () => {
  const orders = [
    { id: 1, item: 'RON95', price: 23.45, status: OrderStatus.Delivered },
    { id: 2, item: 'RON97', price: 56.78, status: OrderStatus.Created },
    { id: 3, item: 'RON92', price: 20.2, status: OrderStatus.Cancelled },
  ]

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
                  {order.status.toUpperCase()}
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
