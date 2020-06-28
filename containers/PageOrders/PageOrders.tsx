import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [orders, setOrders] = React.useState<Order[]>([])
  // const [isPollOrders, setIsPollOrders] = React.useState(false)

  // fetch orders data
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

  const onClickOrder = React.useCallback(
    (id: number) => () => {
      router.push(`/orders/[id]`, `/orders/${id}`)
    },
    []
  )

  const onClickAddFab = React.useCallback(() => {
    router.push(`/orders/new`)
  }, [])

  const renderOrderList = (orders: Order[]) => {
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

  const classes = s.useStyles({ isMobile })()
  return (
    <Layout navbar={{ isProminent: true, title: 'Orders' }}>
      {orders && orders.length > 0 && renderOrderList(orders)}
      {(!orders || orders.length === 0) && (
        <Typography variant="body1" align="center">
          Oops, there are no orders yet
        </Typography>
      )}
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={onClickAddFab}
      >
        <AddIcon />
      </Fab>
    </Layout>
  )
}

export default PageOrders
