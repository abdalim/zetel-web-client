import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import { Order, OrderStatus } from '../../interfaces'
import {
  cancelOrder,
  getOrder,
  Action as OrderAction,
} from '../../store/order/order.action'
import { AppState } from '../../store/reducers'

const CANCELLABLE_STATES = [OrderStatus.Created, OrderStatus.Confirmed]

const PageOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const orderStore = useSelector((state: AppState) => state.order)

  const [order, setOrder] = React.useState<Order | undefined>(undefined)
  const [isCancellable, setIsCancellable] = React.useState(false)
  const [isCancelling, setIsCancelling] = React.useState(false)

  const { id } = router.query

  // fetch order data
  React.useEffect(() => {
    let intervalID: number
    if (id) {
      dispatch(getOrder(+id, false))

      intervalID = setInterval(() => {
        // poll for order details
        dispatch(getOrder(+id, true))
      }, 10000)
    }

    return () => {
      if (intervalID) {
        clearInterval(intervalID)
      }
    }
  }, [])

  // update order
  React.useEffect(() => {
    if (
      (orderStore.type === OrderAction.GetOrderSuccessful ||
        orderStore.type === OrderAction.CancelOrderSuccessful) &&
      orderStore.order
    ) {
      setOrder(orderStore.order)
      setIsCancelling(false)
    }
  }, [orderStore])

  // update cancellability
  React.useEffect(() => {
    if (
      orderStore &&
      orderStore.order &&
      CANCELLABLE_STATES.includes(orderStore.order.status)
    ) {
      setIsCancellable(true)
    } else {
      setIsCancellable(false)
    }
  }, [orderStore])

  // update cancelling status
  React.useEffect(() => {
    setIsCancelling(orderStore.type === OrderAction.CancelOrderRequest)
  }, [orderStore])

  const onClickCancel = React.useCallback(() => {
    dispatch(cancelOrder(+id))
    setIsCancelling(true)
  }, [])

  return (
    <Layout
      navbar={{
        hasBack: true,
        isProminent: true,
        title: order ? `Order ${id}` : 'Order Details',
      }}
    >
      {order && (
        <>
          <OrderDetails order={order} />
          {isCancellable && (
            <Button
              fullWidth={true}
              variant="contained"
              color="secondary"
              disabled={!isCancellable || isCancelling}
              isLoading={isCancelling}
              size="large"
              style={{ marginTop: 32 }}
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          )}
        </>
      )}
      {!order && (
        <Typography variant="body1" align="center">
          Oops, we can't find that order
        </Typography>
      )}
    </Layout>
  )
}

export default PageOrder
