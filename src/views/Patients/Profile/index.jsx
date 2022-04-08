import {getPatientOne} from '@api/patients'
import Breadcrumbs from '@components/breadcrumbs'
import Spinner from '@components/spinner/Fallback-spinner'
import React, {useState} from 'react'
import {Activity, Briefcase, Gift, MapPin, Phone, User} from 'react-feather'
import {Col, Label, Row} from 'reactstrap'
import {Simple as List} from '../../../components/ui/List'
import SectionTitle from '../../../components/ui/SectionTitle'

const prescriptions = [
  {
    id: '1',
    protocol: 'FOLFOX 6',
    status: 'ABERTO',
  },
  {
    id: '2',
    protocol: 'FOLFOX 6',
    status: 'ABERTO',
  },
  {
    id: '3',
    protocol: 'FLOX',
    status: 'ABERTO',
  },
  {
    id: '4',
    protocol: 'CAPECITABINA',
    status: 'FECHADO',
  },
]
let list = [
  {
    icon: <Gift size='18' />,
    title: 'Nascimento',
    text: '',
  },
  {
    icon: <Briefcase size='18' />,
    title: 'Convenio',
    text: '',
  },
  {
    icon: <Activity size='18' />,
    title: 'Patologia',
    text: '',
  },
  {
    icon: <User size='18' />,
    title: 'Nome da Mãe',
    text: '',
  },
  {
    icon: <Phone size='18' />,
    title: 'Telefone',
    text: '',
  },
  {
    icon: <Phone size='18' />,
    title: 'Telefone Adicional',
    text: '',
  },
  {
    icon: <MapPin size='18' />,
    title: 'Endereço',
    text: '',
  },
]

function RenderPrescriptions({prescs}) {
  if (prescs.length)
    return (
      <div style={{maxWidth: '1600px'}}>
        {prescs.map((item, index) => {
          const {id, protocol, status} = item
          return (
            <List
              key={`presc${index}`}
              title={`#${id.padStart(4, 0)}`}
              subtitle={`(${protocol})`}
              complement={status}
            />
          )
        })}
      </div>
    )
  return (
    <div>
      {' '}
      <span>não há prescrições vinculadas</span>{' '}
    </div>
  )
}

export default function Profile(props) {
  const {id, name, nip} = props.match.params
  const [open, setopen] = useState(false)
  const {isLoading, data: dataRequest, error} = getPatientOne(id)
  if (isLoading) {
    return <Spinner />
  }
  const {data} = dataRequest
  console.log(data)
  const birth = new Date(data?.birth_date)
  if (id !== undefined && id !== null)
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle='Pacientes'
          breadCrumbParent='Listar'
          breadCrumbParentHref='patients/list'
          breadCrumbActive={name}
        />
        <SectionTitle
          title={
            <div className='d-flex'>
              <User size='26' className='mr-1' />
              {name}
            </div>
          }
          subtitle={`#${nip.padStart(4, 0)}`}
        />

        <h2 className='mt-2'>Cadastro</h2>
        <div className='border rounded p-1 mr-1 mb-2 ' style={{maxWidth: '1600px'}}>
          <h5>Informações Pessoais</h5>
          <Row>
            <Col>
              <Label>Nome</Label>
              <br />
              <b>{data.name}</b>
            </Col>
            <Col>
              <Label>Nome da mãe</Label>
              <br />
              <b>{data.mothers_name}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nascimento</Label>
              <br />
              <b>
                {new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(
                  new Date(data.birth_date)
                )}
              </b>
            </Col>

            <Col>
              <Label>Peso</Label>
              <br />
              <b>{data.weight}Kg</b>
            </Col>

            <Col>
              <Label>Altura</Label>
              <br />
              <b>{data.height}m</b>
            </Col>
          </Row>
          <hr />
          <h5>Informações de Contato</h5>
          <Row>
            <Col>
              <Label>Email</Label>
              <br />
              <b>{data.email}</b>
            </Col>
            <Col>
              <Label>CPF</Label>
              <br />
              <b>{data.cpf}</b>
            </Col>
            <Col>
              <Label>Telefone</Label>
              <br />
              <b>{data.phone}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Endereço</Label>
              <br />
              <b>{data.address}</b>
            </Col>
            <Col>
              <Label>CEP</Label>
              <br />
              <b>{data.cep}</b>
            </Col>
          </Row>
          <hr />
          <h5>Informações de Saúde</h5>
          <Row>
            <Col>
              <Label>Nome do Convênio</Label>
              <br />
              <b>{data.health_plan}</b>
            </Col>
            <Col>
              <Label>Número do Convênio</Label>
              <br />
              <b>{data.health_plan_number}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Patologia</Label>
              <br />
              <b>{data.pathology || 'Não Aferido'}</b>
            </Col>
            <Col>
              <Label>Sexo</Label>
              <br />
              <b>{data.gender}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Alergias</Label>
              <br />
              <b>{data.alergy || 'Não Aferido'}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Observações</Label>
              <br />
              <b>{data.obs || 'Não Aferido'}</b>
            </Col>
          </Row>
        </div>

        <h2>Prescrições</h2>
        <RenderPrescriptions prescs={data?.prescriptions || prescriptions} />
      </div>
    )
  else return <div>Loading</div>
}
