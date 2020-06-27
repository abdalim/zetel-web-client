import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import React from 'react'

import NavBar, { Props as NavBarProps } from '../NavBar/NavBar'

import * as s from './Layout.styled'

export interface Props {
  children?: React.ReactNode
  navbar: NavBarProps
}

const Layout: React.FunctionComponent<Props> = (props) => (
  <>
    <NavBar {...props.navbar} />
    <Container fixed>
      <s.GridContainer container spacing={2}>
        <Hidden xsDown>
          <Grid item sm={2} />
        </Hidden>
        <Grid item xs={12} sm={8}>
          {props.children}
        </Grid>
        <Hidden xsDown>
          <Grid item sm={2} />
        </Hidden>
      </s.GridContainer>
    </Container>
  </>
)

export default Layout
