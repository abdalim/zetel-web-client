import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'

export const ZTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:hover': {
    background: '#eee',
  },
})

export const useStyles = (props: { isMobile?: boolean }) =>
  makeStyles((theme) => {
    const fabResponsiveStyle = props.isMobile
      ? {
          bottom: 0,
          right: 0,
        }
      : {
          top: 128 - (56 + theme.spacing(2)) / 2,
          right: theme.spacing(8),
        }
    return {
      fab: {
        position: 'fixed',
        zIndex: 9999,
        margin: theme.spacing(2),
        ...fabResponsiveStyle,
      },
    }
  })
