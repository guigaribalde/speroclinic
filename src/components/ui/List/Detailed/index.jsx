import React from "react";
import { List as ListOutter } from "./style";

export default function List(props) {
	const { title, subtitle, complement } = props;
	return (
		<ListOutter>
			<div>
				<b>{title}</b> <span>{subtitle}</span>
			</div>
			<div>
				<span>{complement}</span>
			</div>
		</ListOutter>
	);
}
