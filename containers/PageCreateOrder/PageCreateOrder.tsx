import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import {
  createOrder,
  Action as OrderAction,
} from '../../store/order/order.action'
import { AppState } from '../../store/reducers'

const PageCreateOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const orderStore = useSelector((state: AppState) => state.order)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isFailedCreate, setIsFailedCreate] = React.useState(false)

  const onSubmitForm = React.useCallback((values) => {
    dispatch(createOrder(values))
  }, [])

  // set isSubmitting
  React.useEffect(() => {
    switch (orderStore.type) {
      case OrderAction.CreateOrderRequest:
        setIsSubmitting(true)
        break
      case OrderAction.CreateOrderSuccessful:
        setIsSubmitting(false)
        if (orderStore.order) {
          router.replace(`/orders/[id]`, `/orders/${orderStore.order.id}`)
        } else {
          router.replace(`/`)
        }
        break
      case OrderAction.CreateOrderFailed:
        setIsSubmitting(false)
        setIsFailedCreate(true)
        break
      default:
        return
    }
  }, [orderStore])

  const onCloseFailSnackbar = React.useCallback(() => {
    setIsFailedCreate(false)
  }, [])

  const validationSchema = Yup.object().shape({
    item: Yup.string().required(),
    price: Yup.number().required(),
  })

  const initialValues = {
    item: '',
    price: 0.0,
  }

  return (
    <Layout
      navbar={{
        hasBack: true,
        isProminent: true,
        title: `New Order`,
      }}
    >
      <Paper style={{ padding: 16 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={validationSchema}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth={true}
                  id="item"
                  label="Item"
                  name="item"
                  value={values.item}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.item && touched.item)}
                  helperText={errors.item && touched.item && errors.item}
                  disabled={isSubmitting}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth={true}
                  id="price"
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.price && touched.price)}
                  helperText={errors.price && touched.price && errors.price}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  fullWidth={true}
                  variant="contained"
                  color="secondary"
                  disabled={!dirty || !isValid || isSubmitting}
                  isLoading={isSubmitting}
                  size="large"
                  style={{ marginTop: 32 }}
                >
                  Create
                </Button>
              </form>
            )
          }}
        </Formik>
        <Snackbar
          open={isFailedCreate}
          autoHideDuration={6000}
          onClose={onCloseFailSnackbar}
        >
          <Alert severity="error">
            Failed to create your order. Please try again.
          </Alert>
        </Snackbar>
      </Paper>
    </Layout>
  )
}

export default PageCreateOrder
