import AutoComplete from '@components/autocomplete'
import {useField} from 'formik'
import React, {useEffect, useState} from 'react'
import {Plus} from 'react-feather'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  InputGroupText,
} from 'reactstrap'
export const SelectCompleteField = (props) => {
  const [suggestions, setSuggestions] = useState([])

  const type_props = {...props, name: `${props.name}.type`}
  const title_props = {...props, name: `${props.name}.title`}
  const value_props = {...props, name: `${props.name}.value`}
  const content_props = {...props, name: `${props.name}.content`}

  const [type_field, type_meta] = useField(type_props)
  const [title_field, title_meta] = useField(title_props)
  const [value_field, value_meta] = useField(value_props)
  const [content_field, content_meta] = useField(content_props)
  const [field, meta, helpers] = useField(props)
  const [open, setOpen] = useState(false)

  //? Set autocomplete options based on current selected array
  useEffect(() => {
    //? Set default value, if not provided, for type left selector
    if (!type_field.value.length) {
      props.fmk.setFieldValue(`${props.name}.type`, props.types[0])
    } else {
      setSuggestions(props.suggestions[props.types.indexOf(type_field.value)].content)
    }
  }, [type_field.value])
  const [forceEnable, setForceEnable] = useState(false)
  return (
    <>
      <InputGroup>
        <InputGroupText className={`before ${meta.touched && meta.error ? 'is-invalid' : null}`}>
          <Dropdown isOpen={open} toggle={(e) => {}}>
            <DropdownToggle color='transparent' className='p-0 m-0'>
              <span
                onClick={() => {
                  setOpen(!open)
                }}
              >
                {type_field.value}
              </span>
            </DropdownToggle>

            <DropdownMenu>
              {props.types.map((type, index) => {
                return (
                  <DropdownItem
                    className='w-100'
                    disabled={type === type_field.value ? true : false}
                    key={`drop${index}`}
                    onClick={() => {
                      props.fmk.setFieldValue(`${props.name}.type`, type)
                      setOpen(false)
                    }}
                  >
                    {type}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </InputGroupText>
        <AutoComplete
          className={`form-control before-input after-input ${
            meta.touched && meta.error ? 'is-invalid' : null
          }`}
          filterKey='title'
          suggestionLimit={4}
          base={props.name}
          {...title_field}
          {...title_props}
          suggestions={suggestions}
          disabled={forceEnable ? false : value_field.value?.length}
        />
        <InputGroupText
          className={`after ${meta.touched && meta.error ? 'is-invalid' : null} cursor-pointer`}
          onClick={() => {
            setForceEnable(false)
            //? if user selected a option
            if (value_field.value.length) {
              //? if value already been added to the list
              if (
                content_meta.value.find((c, i) => {
                  if (c.value === value_field.value && c.type === type_field.value) return true
                }) !== undefined
              ) {
                if (type_field.value === 'Medicamento') {
                  helpers.setError('Medicamento já adicionado!')
                  setForceEnable(true)
                  return
                } else {
                  content_meta.value.forEach((e, i) => {
                    if (e.value === value_field.value && e.type === type_field.value) {
                      props.fmk.setFieldValue(
                        `${props.name}.content[${i}].quantity`,
                        String(Number(e.quantity) + 1)
                      )
                    }
                  })
                }
              }
              //? if is the first time adding a value to the list
              else {
                props.fmk.setFieldValue(`${props.name}.content`, [
                  {
                    title: title_field.value,
                    value: value_field.value,
                    quantity: '1',
                    type: type_field.value,
                    concentration: {value: '', mesure: 'mg'},
                    infusion_time: '',
                  },
                  ...content_meta.value,
                ])
              }

              props.fmk.setFieldValue(`${props.name}.title`, '')
              props.fmk.setFieldValue(`${props.name}.value`, '')
            } else {
              helpers.setError('Selecione um valor!')
            }
          }}
        >
          <Plus size={14} color='#0557bc' />
        </InputGroupText>
      </InputGroup>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
