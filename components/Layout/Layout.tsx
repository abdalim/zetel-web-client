import React from 'react'

import NavBar, { Props as NavBarProps } from '../NavBar/NavBar'

export interface Props {
  children?: React.ReactNode
  navbar: NavBarProps
}

const Layout: React.FunctionComponent<Props> = (props) => (
  <>
    <NavBar {...props.navbar} />
    {props.children}
  </>
)

export default Layout
