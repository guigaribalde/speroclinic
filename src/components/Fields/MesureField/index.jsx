import {useField} from 'formik'
import {Input, InputGroup, InputGroupText, Label} from 'reactstrap'

export const MesureField = ({label, unity, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        <Label className='form-label'>{label}</Label>

        <InputGroup>
          <Input
            {...field}
            {...props}
            className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
            type='number'
          />
          <InputGroupText className={`after ${meta.touched && meta.error ? 'is-invalid' : null}`}>
            {unity}
          </InputGroupText>
        </InputGroup>
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
