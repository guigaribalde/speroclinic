// ** Logo
import logo from "@src/assets/images/logo/logo.png";

const SpinnerComponent = () => {
	return (
		<div className="fallback-spinner vh-100">
			<img className="fallback-logo" src={logo} alt="logo" />
		</div>
	);
};

export default SpinnerComponent;
