import { combineReducers } from 'redux'

import orders, { OrdersState } from '../orders/orders.reducer'

export interface AppState {
  orders: OrdersState
}

const app = combineReducers<AppState>({
  orders,
})

export default app
