import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import InputPassword from "@components/input-password-toggle";
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Button,
	FormFeedback,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";
import Logo from "../assets/images/logo/logobig.png";
import axios from "axios";
import { useState, useEffect } from "react";

const ResetPassword = (props) => {
	const [skin, setSkin] = useSkin();
	const { id } = props.match.params;
	const [password, setPassword] = useState("");
	const [passwordcp, setPasswordcp] = useState("");
	const [error, setError] = useState(false);
	const illustration =
			skin === "dark" ? "reset-password-v2-dark.svg" : "reset-password-v2.svg",
		source = require(`@src/assets/images/pages/${illustration}`).default;

	useEffect(() => {
		if (password !== "" && passwordcp !== "") {
			if (password !== passwordcp) {
				setError(true);
			} else {
				setError(false);
			}
		}
	}, [password, passwordcp]);

	function ResetPassword() {
		if (error) {
			alert("as senhas devem ser iguais");
		} else {
			axios({
				method: "post",
				url: `/user/reset/${id}`,
				data: { password },
			})
				.then((response) => {
					console.log(response.status);
					if (response.status === 200 || response.status === 201) {
						setError(false);
						window.location.href = "/login";
					}
				})
				.catch((error) => {
					setError(true);
				});
		}
	}

	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/">
					<img src={Logo} width="200px" />
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
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
							Redefinir Senha 🔒
						</CardTitle>
						<CardText className="mb-2">
							Suas novas senhas precisam ser diferentes das anteriores
						</CardText>
						<Form
							className="auth-reset-password-form mt-2"
							onSubmit={(e) => e.preventDefault()}
						>
							<FormGroup>
								<Label className="form-label" for="new-password">
									Nova Senha
								</Label>
								<InputPassword
									className="input-group-merge"
									id="new-password"
									autoFocus
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="confirm-password">
									Confirmar nova sernha
								</Label>
								<InputPassword
									className="input-group-merge"
									id="confirm-password"
									onChange={(e) => {
										setPasswordcp(e.target.value);
									}}
									invalid={error}
								/>
							</FormGroup>
							<Button.Ripple
								color="primary"
								block
								onClick={() => {
									ResetPassword();
								}}
								disabled={password === "" || passwordcp === "" || error}
							>
								Definir nova senha
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
	);
};

export default ResetPassword;
