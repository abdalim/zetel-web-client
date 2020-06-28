import CircularProgress from '@material-ui/core/CircularProgress'
import { styled } from '@material-ui/core/styles'

export const Loader = styled(CircularProgress)({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
})
