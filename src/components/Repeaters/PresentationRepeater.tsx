import {FieldArray, FormikProps} from 'formik';
import {useEffect, useState} from 'react';
import {Plus, X} from 'react-feather';
//@ts-ignore
import {Button, Col, Collapse, Row} from 'reactstrap';
import {PresentationForm} from '../Forms/Drug/PresentationForm';

interface Presentation {
  name: string;
  type: string;
  concentration: {value: string; mesure: string};
  buy: string;
  sell: string;
  lab: string;
}

interface PresentationRepeaterProps {
  presentationsClosed: boolean;
  formik: FormikProps<{
    presentations: Presentation[];
  }>;
}

export const PresentationCollapse = ({
  index,
  name,
  formik,
  remove,
  active,
  presentationsClosed,
}: {
  index: number;
  name: string;
  formik: FormikProps<{presentations: Presentation[]}>;
  remove: <T>(index: number) => T | undefined;
  active: number;
  presentationsClosed: boolean;
}) => {
  const [open, setOpen] = useState(presentationsClosed ? false : index === active ? true : false);
  useEffect(() => {
    if (active !== index) {
      setOpen(false);
    }
  }, [active]);

  return (
    <div className='border p-1 rounded mb-1' key={`repeater-${index}`}>
      <Row className='justify-content-between align-items-center w-100'>
        <Col
          className='mb-0 cursor-pointer'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <h5 className='mb-0'>{name || 'Apresentação sem Nome'}</h5>
        </Col>
        <div className='flex'>
          <div className='text-nowrap cursor-pointer' onClick={() => remove(index)}>
            <X size={14} />
          </div>
        </div>
      </Row>

      <Collapse isOpen={open}>
        <PresentationForm index={index} formik={formik} />
      </Collapse>
    </div>
  );
};

export const PresentationRepeater = ({formik, presentationsClosed}: PresentationRepeaterProps) => {
  const [active, setActive] = useState(0);
  const BASE_NAME = 'presentations';
  const BASE_OBJECT = {
    name: '',
    type: '',
    concentration: {value: '', mesure: 'mg'},
    buy: '',
    sell: '',
    lab: '',
  };
  return (
    <FieldArray name={BASE_NAME}>
      {({insert, remove, push}) => (
        <>
          {formik.values.presentations.length > 0 &&
            formik.values.presentations.map((presentation: Presentation, index: number) => {
              return (
                <PresentationCollapse
                  key={index}
                  index={index}
                  name={presentation.name}
                  formik={formik}
                  remove={remove}
                  active={active}
                  presentationsClosed
                />
              );
            })}

          <Button
            className='btn-icon'
            color='primary'
            onClick={() => {
              setActive(formik.values.presentations.length);
              push(BASE_OBJECT);
            }}
            outline={true}
          >
            <Plus size={14} />
            <span className='align-middle ms-25'>Apresentação</span>
          </Button>
        </>
      )}
    </FieldArray>
  );
};
