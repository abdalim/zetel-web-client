import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../components/Layout/Layout'
import OrderChip from '../../components/OrderChip/OrderChip'
import { Order } from '../../interfaces'
import { getOrder, Action as OrderAction } from '../../store/order/order.action'
import { AppState } from '../../store/reducers'

const PageOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const orderStore = useSelector((state: AppState) => state.order)

  const [order, setOrder] = React.useState<Order | undefined>(undefined)

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
      orderStore.type === OrderAction.GetOrderSuccessful &&
      orderStore.order
    ) {
      setOrder(orderStore.order)
    }
  }, [orderStore])

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
    </Layout>
  )
}

export default PageOrder
