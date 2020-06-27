import { styled } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

export const GridContainer = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))
