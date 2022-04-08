// ** React Imports
import {useFormikContext} from 'formik'
import {Fragment} from 'react'
// ** Third Party Components
import {Button, Card, CardBody} from 'reactstrap'

const AddActions = (props) => {
  const {type, disabled} = props
  const {submitForm} = useFormikContext()

  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button.Ripple
            color='primary'
            block
            className='mb-75'
            onClick={() => {
              submitForm()
            }}
            disabled={!disabled ? (type === 'add' ? false : type === 'edit' ? true : true) : true}
          >
            Adicionar
          </Button.Ripple>

          <Button.Ripple
            color='primary'
            block
            outline
            onClick={() => {
              submitForm()
            }}
            disabled={!disabled ? (type === 'add' ? true : type === 'edit' ? false : true) : true}
          >
            Salvar
          </Button.Ripple>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddActions
