import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import OrderChip from '../../components/OrderChip/OrderChip'
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

  const renderOrder = (order: Order) => {
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
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Layout
      navbar={{
        hasBack: true,
        isProminent: true,
        title: `Order ${id}`,
      }}
    >
      {order && renderOrder(order)}
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
    </Layout>
  )
}

export default PageOrder
