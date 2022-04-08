import {Portuguese} from 'flatpickr/dist/l10n/pt'
import {useField} from 'formik'
import Flatpickr from 'react-flatpickr'
import {Label} from 'reactstrap'
export const DateTimePickerField = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label className='w-100'>
        {/* {console.log(field.onBlur)} */}
        <Label className='form-label'>{label}</Label>
        <Flatpickr
          options={{locale: Portuguese, dateFormat: 'd/m/Y'}}
          className={`form-control date-picker ${meta.touched && meta.error ? 'is-invalid' : null}`}
          type='datetime'
          {...field}
          {...props}
          onBlur={() => {}}
          onChange={(e) => {
            props.fmk.setFieldValue(`${props.name}`, e[0])
          }}
        />
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
