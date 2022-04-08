import {useState} from 'react'
import {useSkin} from '@hooks/useSkin'
import {Link, Redirect} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
  FormFeedback,
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import axios from 'axios'
import Logo from '../assets/images/logo/logobig.png'
import {useMutation} from 'react-query'

const Login = () => {
  const [skin, setSkin] = useSkin()
  const [UserName, setUserName] = useState('')
  const [PassWord, setPassWord] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  function handleLogin() {
    axios({
      method: 'post',
      url: '/user/login',
      data: {email: UserName, password: PassWord},
    })
      .then((response) => {
        const {username, role, avatar, token} = response.data
        const obj = {
          username,
          role,
          avatar,
          token,
        }
        localStorage.setItem('userData', JSON.stringify(obj))
        window.location.reload()
      })
      .catch((error) => {
        if (error.message === 'unf') {
          setIsUsernameValid(true)
        }
        if (error.message === 'pin') {
          setIsUsernameValid(false)
          setIsPasswordValid(true)
        }
        console.log('batata')
        console.log(error)
      })
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <img src={Logo} width='200px' />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Bem vindo! 👋
            </CardTitle>
            <CardText className='mb-2'>Por favor entre inserindo suas credenciais abaixo.</CardText>
            <Form className='auth-login-form mt-2' onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                  type='email'
                  id='login-email'
                  placeholder='john@example.com'
                  autoFocus
                  invalid={isUsernameValid}
                />
                <FormFeedback>Oh não! Parece que esse usuário não existe!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Senha
                  </Label>
                  <Link to='/esqueci-a-senha'>
                    <small>Esqueceu a senha?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  onChange={(e) => {
                    setPassWord(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      document.activeElement.blur()
                      handleLogin()
                    }
                  }}
                  className='input-group-merge'
                  id='login-password'
                  invalid={isPasswordValid}
                />
                <FormFeedback>Oh não! Parece que a senha está errada !</FormFeedback>
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id='remember-me'
                  label='Lembre-me'
                />
              </FormGroup>
              <Button.Ripple color='primary' onClick={handleLogin} block>
                Entrar
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
