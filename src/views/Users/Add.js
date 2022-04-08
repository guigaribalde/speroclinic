import { Fragment, useState } from "react";
import InputPasswordToggle from "@components/input-password-toggle";
import {
	Button,
	Media,
	Label,
	Row,
	Col,
	Input,
	FormGroup,
	Alert,
	Form,
} from "reactstrap";
import Select from "react-select";
import { CheckCircle, AlertCircle } from "react-feather";
import { selectThemeColors } from "@utils";
import axios from "axios";

const Add = () => {
	const colourOptions = [
		{ value: "Administrador", label: "Admin" },
		{ value: "Recepcionista", label: "Recepcionista" },
		{ value: "Faturista", label: "Faturista" },
	];
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profile, setProfile] = useState(null);

	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [profileError, setProfileError] = useState(false);

	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(false);

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	function nameValidate() {
		if (name === "") {
			return true;
		}
		return false;
	}
	function emailValidate() {
		if (email === "") {
			return true;
		}
		if (validateEmail(email)) {
			return false;
		}
		return true;
	}
	function passwordValidate() {
		if (password === "") {
			return true;
		}
		return false;
	}
	function profileValidate() {
		if (profile === "") {
			return true;
		}
		return false;
	}

	function clearInputs() {
		setName("");
		setEmail("");
		setPassword("");
		setProfile(null);
	}

	function addUser() {
		setNameError(nameValidate());
		setEmailError(emailValidate());
		setPasswordError(passwordValidate());
		setProfileError(profileValidate());
		if (
			nameValidate() ||
			emailValidate() ||
			passwordValidate() ||
			profileValidate()
		) {
			return;
		} else {
			axios
				.post("/user", {
					name,
					email,
					password,
					profile: profile.value,
				})
				.then((e) => {
					console.log(e);
					setVisible(true);
					setTimeout(() => {
						return setVisible(false);
					}, 2000);
				})
				.catch((e) => {
					console.log(e);
					setError(true);
					setTimeout(() => {
						return setError(false);
					}, 2000);
				});
		}
		clearInputs();
	}

	return (
		<Fragment>
			<Form className="mt-2">
				<Row>
					<Col sm="6">
						<FormGroup>
							<Label for="nome">Nome</Label>
							<Input
								id="nome"
								type="text"
								name="nome"
								placeholder="Nome"
								value={name}
								onChange={(e) => setName(e.target.value)}
								invalid={nameError}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								invalid={emailError}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="password">Senha</Label>
							<InputPasswordToggle
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								className="input-group-merge"
								id="password"
								value={password}
								invalid={passwordError}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="funcao">Função</Label>
							<Select
								theme={selectThemeColors}
								className="react-select"
								classNamePrefix="select"
								options={colourOptions}
								value={profile}
								isClearable={false}
								onChange={(e) => {
									setProfile(e);
								}}
								invalid={profileError}
							/>
						</FormGroup>
					</Col>
					<Col className="mt-2" sm="12">
						<Alert color="success" isOpen={visible}>
							<div className="alert-body">
								<CheckCircle size={15} />{" "}
								<span className="ml-1">
									Novo usuário adicionado com sucesso!
								</span>
							</div>
						</Alert>
						<Alert color="danger" isOpen={error}>
							<div className="alert-body">
								<AlertCircle size={15} />{" "}
								<span className="ml-1">Erro: O email ja está cadastrado!</span>
							</div>
						</Alert>
						<Button.Ripple
							type="submit"
							className="mr-1"
							color="primary"
							onClick={(e) => {
								e.preventDefault();
								addUser();
							}}
						>
							Adicionar
						</Button.Ripple>
					</Col>
				</Row>
			</Form>
		</Fragment>
	);
};

export default Add;
