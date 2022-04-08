import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";
import List from "./List";
import Add from "./Add";
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { getUsers } from "@api/users";

const AccountSettings = () => {
	const [activeTab, setActiveTab] = useState("1");

	const toggleTab = (tab) => {
		setActiveTab(tab);
	};

	getUsers();

	return (
		<Fragment>
			<Row>
				<Col className="mb-2 mb-md-0" md="3">
					<Tabs activeTab={activeTab} toggleTab={toggleTab} />
				</Col>
				<Col md="9">
					<Card>
						<CardBody>
							<TabContent activeTab={activeTab}>
								<TabPane tabId="1">
									<List />
								</TabPane>
								<TabPane tabId="2">
									<Add />
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AccountSettings;
