import {useContext} from 'react';
import {Tag} from 'react-feather';
import {Link} from 'react-router-dom';
//@ts-ignore
import {Col, Row, Spinner} from 'reactstrap';
import Box from '../../components/ui/BoxList';
import {ModalContext} from '../../utility/context/Modal';
import {useGroups} from '../../utility/hooks/main/drug/useGroup';

export default function Drugs() {
  const {setOpen} = useContext(ModalContext);
  const {groups} = useGroups();
  if (groups.isLoading) {
    return (
      <div className='position-absolute' style={{top: '50%', left: '50%'}}>
        <Spinner color='primary' />
      </div>
    );
  }
  return (
    <div className='flex w-100 flex-wrap flex-row'>
      <Row className='mb-2 w-100'>
        {!groups.data?.length && (
          <div className='p-1'>
            <h3 className='m-0'>Ooops..</h3>
            <br />
            <p>
              Não existem medicamentos adicionados, mas você pode{' '}
              <a
                className='text-primary'
                onClick={() => {
                  setOpen(true);
                }}
              >
                adicionar novos aqui!
              </a>
            </p>
          </div>
        )}
        {
          //@ts-ignore
          groups.data.map((item) => (
            <Col sm='3' key={`item${item}`}>
              <Link to={`/drugs/group/${item}`}>
                <Box Icon={Tag} title={item} />
              </Link>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}
