import Paper from '@material-ui/core/Paper'
import React from 'react'

import Layout from '../../components/Layout/Layout'

const PageCreateOrder = () => {
  return (
    <Layout
      navbar={{
        hasBack: true,
        isProminent: true,
        title: `New Order`,
      }}
    >
      <Paper></Paper>
    </Layout>
  )
}

export default PageCreateOrder
