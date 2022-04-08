import {useField} from 'formik'
import {Label} from 'reactstrap'
import Cleave from 'cleave.js/react'

export const TimeField = ({label, ...props}) => {
  const mask = {
    delimiters: ['d ', 'h ', 'm ', 's'],
    blocks: [2, 2, 2, 2, 0],
    numericOnly: true,
  }
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        <Label className='form-label'>{label || 'Tempo'}</Label>
        <Cleave
          className={`form-control ${meta.touched && meta.error ? 'is-invalid' : null}`}
          placeholder='Tempo'
          options={mask}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
