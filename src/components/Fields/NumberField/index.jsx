import {useField} from 'formik'
import {Label} from 'reactstrap'
export const NumberField = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        {/* <h6 className='mb-1'>{label}</h6> */}
        <Label className='form-label'>{label}</Label>

        <input
          {...field}
          {...props}
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          type='number'
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
