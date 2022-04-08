// ** Icons Import

const Footer = () => {
	return (
		<p className="clearfix mb-0">
			<span className="float-md-left d-block d-md-inline-block mt-25">
				COPYRIGHT © {new Date().getFullYear()}{" "}
				<a
					href="https:/creatusdev.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Creatus
				</a>
				<span className="d-none d-sm-inline-block">
					, Todos direitos reservados.
				</span>
			</span>
		</p>
	);
};

export default Footer;
