import {useField} from 'formik'
import {Label} from 'reactstrap'
import Cleave from 'cleave.js/react'

export const CPFField = ({label, ...props}) => {
  const mask = {
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    numericOnly: true,
    delimiterLazyShow: true,
  }
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        {/* <h6 className='mb-1'>{label}</h6> */}
        <Label className='form-label'>{label || 'CPF'}</Label>
        <Cleave
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          placeholder='CPF'
          options={mask}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
