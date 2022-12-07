import { useState, useEffect } from "react";
import { Header, Container, Table, Grid, Segment } from "semantic-ui-react";

export function Search() {
	const [ msg, setMsg ] = useState(null);

	useEffect(() => {
		fetch(`https://kiszka.com:3001/`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				area: "Lake Orion"
			})
		})
			.then(res => res.json())
			.then(data => setMsg(data));
	}, []);

	if(!msg) {
		return "Loading...";
	}

	return (
		<Grid>
			{
				msg.map((item, index) => (
					<Grid.Row key={ index }>
						<Grid.Column>
							<Container>
								<Header as="h3">
									{ item.Name }
								</Header>

								<Segment>
									{ item.AddressNumber } { item.Street }, { item.City }, { item.State }
								</Segment>

								<Table>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Flag</Table.HeaderCell>
											<Table.HeaderCell>Value</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										<Table.Row>
											<Table.Cell>On Premise</Table.Cell>
											<Table.Cell>{ item.IsOnPremise }</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Off Premise</Table.Cell>
											<Table.Cell>{ item.IsOffPremise }</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Is Ownership Transferable</Table.Cell>
											<Table.Cell>{ item.IsStatuteOwnershipTransferable }</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Is Location Transferable</Table.Cell>
											<Table.Cell>{ item.IsStatuteLocationTransferable }</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Container>
						</Grid.Column>
					</Grid.Row>

					// <li key={ index } style={ { display: "flex" } }>
					// 	<div>{ item.LegalName }</div>
					// 	&nbsp;:&nbsp;
					// 	<div>{ item.DBAName }</div>
					// 	&nbsp;:&nbsp;
					// 	<div>{ item.Name }</div>
					// 	&nbsp;:&nbsp;
					// 	<div>{ item.AddressNumber } { item.Street }</div>
					// 	&nbsp;:&nbsp;
					// 	<div>{ item.IsStatuteLocationTransferable }</div>
					// </li>
				))
			}
		</Grid>
	);
};

export default Search;