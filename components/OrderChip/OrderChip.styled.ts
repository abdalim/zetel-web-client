import { makeStyles, Theme } from '@material-ui/core/styles'

import { OrderStatus } from '../../interfaces'

import { Props } from './OrderChip'

const STATUS_COLOR = {
  [OrderStatus.Created]: 'grey',
  [OrderStatus.Confirmed]: 'blue',
  [OrderStatus.Cancelled]: 'red',
  [OrderStatus.Delivered]: 'green',
}

export const useStyles = makeStyles<Theme, Props>({
  chip: {
    background: (props) => STATUS_COLOR[props.status],
    color: 'white',
    fontWeight: 'bolder',
  },
})
