// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { MoreVertical, Edit, FileText, Trash } from "react-feather";
import { Link } from "react-router-dom";
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import {
	Slack,
	User,
	Settings,
	Database,
	Edit2,
	Trash2,
	Archive,
} from "react-feather";
import axios from "axios";

const renderRole = (row) => {
	const roleObj = {
		Recepcionista: {
			class: "text-success",
			icon: Database,
		},
		Faturista: {
			class: "text-info",
			icon: Edit2,
		},
		Administrador: {
			class: "text-warning",
			icon: Settings,
		},
	};

	const Icon = roleObj[row.profile] ? roleObj[row.profile].icon : Edit2;

	return (
		<span className="text-truncate text-capitalize align-middle">
			<Icon
				size={18}
				className={`${
					roleObj[row.profile] ? roleObj[row.profile].class : ""
				} mr-50`}
			/>
			{row.profile}
		</span>
	);
};
// ** Table Common Column
export const columns = [
	{
		name: "NOME",
		selector: "name",
		sortable: true,
		minWidth: "250px",
		cell: (row) => (
			<div className="d-flex align-items-center">
				<Avatar content={row.name} initials />
				<div className="user-info text-truncate ml-1">
					<span className="d-block font-weight-bold text-truncate">
						{row.name}
					</span>
					<small>{row.nip}</small>
				</div>
			</div>
		),
	},

	{
		name: "EMAIL",
		selector: "email",
		sortable: true,
		minWidth: "250px",
	},
	{
		name: "FUNÇÃO",
		minWidth: "172px",
		selector: "profile",
		sortable: true,
		cell: (row) => renderRole(row),
	},
	{
		name: "AÇÕES",
		allowOverflow: true,
		selector: "actions",

		cell: (row) => {
			return (
				<div
					className="d-flex"
					style={{ width: "100%", justifyContent: "end" }}
				>
					<UncontrolledDropdown>
						<DropdownToggle className="pr-1" tag="span">
							<MoreVertical size={15} color="#0557bc" />
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem
								tag="a"
								href="/"
								className="w-100"
								onClick={(e) => {
									e.preventDefault();
									axios.delete(`/user/${row.id}`);
								}}
							>
								<Trash size={15} />
								<span className="align-middle ml-50">Excluir</span>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</div>
			);
		},
	},
];
