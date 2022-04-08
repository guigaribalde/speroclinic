import {useField} from 'formik'
import {Input, FormGroup, Label} from 'reactstrap'
export const TextAreaField = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        <FormGroup className='mb-2'>
          {/* <h6 className='mb-1'>{label}</h6> */}
          <Label className='form-label'>{label}</Label>
          <Input
            type='textarea'
            {...field}
            {...props}
            className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          />
        </FormGroup>
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
