import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { useRouter } from 'next/router'
import React from 'react'

import * as s from './NavBar.styled'

export interface Props {
  hasBack?: boolean
  isProminent?: boolean
  title?: string
}

const NavBar: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()

  const onBackButtonSelect = React.useCallback(() => {
    router.replace('/')
  }, [])
  const classes = s.useStyles(props)
  return (
    <s.AppBar>
      <s.Toolbar className={classes.toolbar}>
        {props.hasBack && (
          <IconButton
            edge="start"
            color="inherit"
            aria-lable="back"
            onClick={onBackButtonSelect}
          >
            <ArrowBack />
          </IconButton>
        )}
        {props.title && (
          <s.Title variant="h5" className={classes.title}>
            {props.title}
          </s.Title>
        )}
      </s.Toolbar>
    </s.AppBar>
  )
}

export default NavBar
