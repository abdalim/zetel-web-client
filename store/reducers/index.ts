import { combineReducers } from 'redux'

import order, { OrderState } from '../order/order.reducer'
import orders, { OrdersState } from '../orders/orders.reducer'

export interface AppState {
  order: OrderState
  orders: OrdersState
}

const app = combineReducers<AppState>({
  order,
  orders,
})

export default app
