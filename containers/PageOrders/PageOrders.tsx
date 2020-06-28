import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../components/Layout/Layout'
import OrderList from '../../components/OrderList/OrderList'
import PageLoader from '../../components/PageLoader/PageLoader'
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
  const [isLoading, setIsLoading] = React.useState(true)

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

  // update isLoading state
  React.useEffect(() => {
    if (
      ordersStore.type === OrdersAction.GetOrdersRequest &&
      !ordersStore.orders
    ) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
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

  const classes = s.useStyles({ isMobile })()
  return (
    <Layout navbar={{ isProminent: true, title: 'Orders' }}>
      {isLoading && <PageLoader />}
      {orders && orders.length > 0 && (
        <OrderList orders={orders} onClickOrder={onClickOrder} />
      )}
      {!isLoading && (!orders || orders.length === 0) && (
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
