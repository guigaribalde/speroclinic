import {FieldArray} from 'formik';
import {useEffect, useState} from 'react';
import {Plus} from 'react-feather';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  InputGroupText,
  Label,
  //@ts-ignore
} from 'reactstrap';
import Autocomplete from '../../@core/components/autocomplete';
import {RequisitField} from '../../components/Fields/RequisitField';
export const RequisiteRepeater = (props: any) => {
  return (
    <FieldArray name='requisites.content'>
      {({insert, remove, push}) => {
        return (
          <>
            <div className='pt-1 pl-1 pr-1'>
              <InputGroup className=''>
                <InputGroupText className='before'>
                  <DropdownTGL formik={props.formik} />
                </InputGroupText>
                <Autocomplete
                  //@ts-ignore
                  className={`form-control before-input after-input `}
                  filterKey='title'
                  suggestionLimit={4}
                  base='requisites'
                  suggestions={
                    props.formik.values.requisites.type === 'Medicamento'
                      ? getGroupsFormatted(props.AllDrugs)
                      : getMaterialFormatted(props.AllMaterials)
                  }
                  name='requisites.title'
                  value={props.formik.values.requisites.title}
                  fmk={props.formik}
                  onChange={props.formik.handleChange}
                />
                <InputGroupText
                  className='after cursor-pointer'
                  onClick={() => {
                    if (props.formik.values.requisites.type === 'Medicamento') {
                      const selected = props.AllDrugs.find(
                        (m: any) => m.id === props.formik.values.requisites.value
                      );
                      if (selected) {
                        push({
                          type: 'Medicamento',
                          value: selected.id,
                          quantity: '1',
                          title: selected.scientific_name,
                          concentration: {
                            value: '',
                            mesure: 'mg',
                          },
                          infusion: {
                            time: '',
                            type: null,
                          },
                          day: '',
                        });
                        props.formik.setFieldValue('requisites.title', '');
                        props.formik.setFieldValue('requisites.value', '');
                      }
                    } else {
                      const selected = props.AllMaterials.find(
                        (m: any) => m.id === props.formik.values.requisites.value
                      );
                      if (selected) {
                        push({
                          type: 'Material',
                          value: selected.id,
                          quantity: '1',
                          title: selected.name,
                        });
                        props.formik.setFieldValue('requisites.title', '');
                        props.formik.setFieldValue('requisites.value', '');
                      }
                    }
                  }}
                >
                  <Plus size={14} color='#0557bc' />
                </InputGroupText>
              </InputGroup>
            </div>
            <hr className='w-100' />

            <div className='px-1'>
              {props.formik.values.requisites.content.length === 0 ? (
                <div className='pb-1'>
                  <p className='pb-1 mb-0 text-primary'>Não há nenhum requisito...</p>
                  <Label>Adicione um requisito selecionando uma opção e apertando no '+'.</Label>
                </div>
              ) : (
                props.formik.values.requisites.content.map((c: any, i: any) => {
                  return (
                    <RequisitField
                      title={c.title}
                      quantity={c.quantity}
                      name='requisites.content'
                      locindex={i}
                      key={`requisite${i}`}
                      type={c.type}
                      remove={remove}
                      fmk={props.formik}
                    />
                  );
                })
              )}
            </div>
          </>
        );
      }}
    </FieldArray>
  );
};
function getGroupsFormatted(data: any) {
  return data.map((d: any, i: any) => {
    return {title: d.scientific_name, value: d.id};
  });
}
function getMaterialFormatted(data: any) {
  return data.map((d: any, i: any) => {
    return {title: d.name, value: d.id};
  });
}
function getProtocolFormatted(data: any) {
  return {
    ...data,
    requisites: {...data.requisites, type: '', title: '', value: ''},
  };
}

function DropdownTGL({formik}: {formik: any}) {
  const [open, setOpen] = useState(false);
  const options = ['Material', 'Medicamento'];

  useEffect(() => {
    if (!formik.values.requisites.type) {
      formik.setFieldValue('requisites.type', options[0]);
    }
  }, []);

  return (
    <Dropdown
      isOpen={open}
      toggle={(e: any) => {
        setOpen(!open);
      }}
    >
      <DropdownToggle color='transparent' className='p-0 m-0'>
        <span>{formik.values.requisites.type}</span>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((o, i) => {
          return (
            <DropdownItem
              className='w-100'
              key={i}
              onClick={() => {
                formik.setFieldValue('requisites.type', o);
              }}
            >
              {o}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
