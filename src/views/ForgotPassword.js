import { Link } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { ChevronLeft } from "react-feather";
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	FormFeedback,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";
import Logo from "../assets/images/logo/logobig.png";
import axios from "axios";
import { useState } from "react";
const ForgotPassword = () => {
	const [skin, setSkin] = useSkin();
	const [email, setEmail] = useState("");
	const [sucess, setSucess] = useState(false);
	const [error, setError] = useState(false);
	const illustration =
			skin === "dark"
				? "forgot-password-v2-dark.svg"
				: "forgot-password-v2.svg",
		source = require(`@src/assets/images/pages/${illustration}`).default;

	function RequestResetPassword() {
		axios({
			method: "post",
			url: "/user/forgot",
			data: { email, url: "http://dev.clinic.speroprev.com/redefinir-senha" },
		})
			.then((response) => {
				console.log(response.status);
				if (response.status === 200 || response.status === 201) {
					setSucess(true);
					setError(false);
				}
			})
			.catch((error) => {
				setSucess(false);
				setError(true);
			});
	}

	return (
		<>
			<div className="auth-wrapper auth-v2">
				<Row className="auth-inner m-0">
					<Link className="brand-logo" to="/">
						<img src={Logo} width="200px" />
					</Link>
					<Col
						className="d-none d-lg-flex align-items-center p-5"
						lg="8"
						sm="12"
					>
						<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
							<img className="img-fluid" src={source} alt="Login V2" />
						</div>
					</Col>

					<Col
						className="d-flex align-items-center auth-bg px-2 p-lg-5"
						lg="4"
						sm="12"
					>
						<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
							<CardTitle tag="h2" className="font-weight-bold mb-1">
								Esqueceu sua senha? 🔒
							</CardTitle>
							<CardText className="mb-2">
								Escreva seu email e nós iremos enviar instruções para você
								redefinir sua senha.
							</CardText>
							<Form
								className="auth-forgot-password-form mt-2"
								onSubmit={(e) => e.preventDefault()}
							>
								<FormGroup>
									<Label className="form-label" for="login-email">
										Email
									</Label>
									<Input
										type="email"
										id="login-email"
										placeholder="john@example.com"
										autoFocus
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										invalid={error}
										valid={sucess}
										onKeyDown={(e) => {
											if (e.keyCode === 13) {
												document.activeElement.blur();
												RequestResetPassword();
											}
										}}
									/>
									<FormFeedback>
										Oh não! Parece que esse email não está cadastrado !
									</FormFeedback>
								</FormGroup>
								<Button.Ripple
									color="primary"
									block
									onClick={() => {
										RequestResetPassword();
									}}
								>
									Enviar link de redefinição
								</Button.Ripple>
							</Form>
							<p className="text-center mt-2">
								<Link to="/login">
									<ChevronLeft className="mr-25" size={14} />
									<span className="align-middle">Voltar ao login</span>
								</Link>
							</p>
						</Col>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default ForgotPassword;
