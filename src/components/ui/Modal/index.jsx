import '@styles/base/pages/app-invoice.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import {Col, Row} from 'reactstrap';
import AddActions from './AddActions';
import AddCard from './AddCard';
export default function Add(props) {
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={9} md={8} sm={12}>
          <AddCard allProps={props} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions type={props.type} disabled={props.disabled} />
        </Col>
      </Row>
    </div>
  );
}
