import { Nav, NavItem, NavLink } from "reactstrap";
import { User, Plus } from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
	return (
		<Nav className="nav-left" pills vertical>
			<NavItem>
				<NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
					<User size={18} className="mr-1" />
					<span className="font-weight-bold">Listar</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					active={activeTab === "2"}
					onClick={() => {
						toggleTab("2");
					}}
				>
					<Plus size={18} className="mr-1" />
					<span className="font-weight-bold">Adicionar</span>
				</NavLink>
			</NavItem>
		</Nav>
	);
};

export default Tabs;
