import {useField} from 'formik'
import {Label} from 'reactstrap'
import Cleave from 'cleave.js/react'

export const PhoneField = ({label, ...props}) => {
  const mask = {
    delimiters: ['(', ') ', '-'],
    blocks: [0, 2, 5, 4],
    numericOnly: true,
    delimiterLazyShow: true,
  }
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        {/* <h6 className='mb-1'>{label}</h6> */}
        <Label className='form-label'>{label || 'Telefone'}</Label>
        <Cleave
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          placeholder='Telefone'
          options={mask}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
