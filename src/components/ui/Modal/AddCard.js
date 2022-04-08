// ** React Imports
import '@styles/base/pages/app-invoice.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import {useEffect, useState} from 'react';
// ** Third Party Components
import {AlertCircle, CheckCircle} from 'react-feather';
// ** Styles
import 'react-slidedown/lib/slidedown.css';
import {Alert, Card, CardBody} from 'reactstrap';
// ** Custom Components
import logo from '../../../assets/images/logo/logo.png';

const AddCard = ({allProps}) => {
  const {title, children, type, isSuccess, isError} = allProps;
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    if (isSuccess) {
      setSucess(true);
      setTimeout(() => {
        return setSucess(false);
      }, 3000);
    }
  }, [isSuccess]);
  useEffect(async () => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        return setError(false);
      }, 3000);
    }
  }, [isError]);
  return (
    <Card className='mb-2'>
      {/* Header */}
      <CardBody className='invoice-padding pb-0 mb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 pb-0 mb-0'>
          <div>
            <div className='logo-wrapper mt-1 mb-1'>
              <img src={logo} width={40} />
              <h3 className='text-primary invoice-logo'>
                {type === 'add'
                  ? title === 'Prescrição'
                    ? `Nova ${title}`
                    : `Novo ${title}`
                  : type === 'edit'
                  ? `Editar ${title}`
                  : `${title}`}
              </h3>
            </div>
          </div>
        </div>
        <Alert color='success' isOpen={sucess}>
          <div className='alert-body'>
            <CheckCircle size={15} />{' '}
            <span className='ml-1'>
              {type === 'add'
                ? `Novo ${title} adicionado com sucesso!`
                : type === 'edit'
                ? `${title} editado com sucesso!`
                : `Sucesso!`}
            </span>
          </div>
        </Alert>
        <Alert color='danger' isOpen={error}>
          <div className='alert-body'>
            <AlertCircle size={15} />{' '}
            <span className='ml-1'>Error: Preencha os campos necessários!</span>
          </div>
        </Alert>
      </CardBody>
      {/* /Header */}

      <hr />

      {children}
    </Card>
  );
};

export default AddCard;
