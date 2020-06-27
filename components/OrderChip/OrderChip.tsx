import Chip from '@material-ui/core/Chip'
import React from 'react'

import { OrderStatus } from '../../interfaces'

import * as s from './OrderChip.styled'

export interface Props {
  status: OrderStatus
}

const OrderChip: React.FunctionComponent<Props> = (props) => {
  const classes = s.useStyles(props)
  return <Chip className={classes.chip} label={props.status.toUpperCase()} />
}

export default OrderChip
