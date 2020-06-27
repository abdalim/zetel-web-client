import MUIButton, { ButtonProps } from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

interface Props extends ButtonProps {
  isLoading?: boolean
}

const Button: React.FunctionComponent<Props> = ({
  children,
  isLoading = false,
  ...rest
}) => {
  return (
    <MUIButton {...rest}>
      {isLoading ? <CircularProgress size={30} /> : children}
    </MUIButton>
  )
}

export default Button
