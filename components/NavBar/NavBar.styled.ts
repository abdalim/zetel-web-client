import MuiAppBar from '@material-ui/core/AppBar'
import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import MuiToolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export const Title = styled(Typography)({
  flexGrow: 1,
  alignSelf: 'flex-end',
})

export const AppBar = styled(MuiAppBar)({
  position: 'sticky',
  top: 0,
})

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  ' > *': {},
}))

export const useStyles = makeStyles<Theme, { isProminent?: boolean }>({
  toolbar: {
    minHeight: (props) => (props.isProminent ? 128 : 'none'),
    alignItems: (props) => (props.isProminent ? 'flex-start' : 'inherit'),
  },
  title: {
    flexGrow: (props) => (props.isProminent ? 1 : 'inherit'),
    alignSelf: (props) => (props.isProminent ? 'flex-end' : 'inherit'),
  },
})
