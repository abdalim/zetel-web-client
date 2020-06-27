import { AnyAction } from 'redux'

import { Order } from '../../interfaces'

import { Action } from './orders.action'

export interface OrdersState {
  type?: Action
  isPoll: boolean
  orders?: Order[]
  error?: Error
}

const initialState: OrdersState = {
  type: undefined,
  isPoll: false,
  orders: undefined,
  error: undefined,
}

const ordersReducer = (
  state: OrdersState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case Action.GetOrdersRequest:
    case Action.GetOrdersSuccessful:
    case Action.GetOrdersFailed:
      return {
        ...state,
        type: action.type,
        ...action.data,
      }
    default:
      return state
  }
}

export default ordersReducer
