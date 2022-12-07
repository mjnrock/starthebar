import { useState, useEffect } from "react";
import { Header, Container, Table, Grid, Segment } from "semantic-ui-react";

export function Search() {
	const [ msg, setMsg ] = useState(null);
	const [ area, setArea ] = useState("Lake Orion");

	useEffect(() => {
		fetch(`https://kiszka.com:3001/`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				area,
			})
		})
			.then(res => res.json())
			.then(data => setMsg(data));
	}, []);

	if(!msg) {
		return "Loading...";
	}

	return (
		<>
			<Header as="h1" textAlign="center" style={ { marginTop: 10 } }>
				{ area }
			</Header>

			<hr />

			<Grid style={ { marginTop: 10 } }>
				{
					msg.map((item, index) => {
						/**
						 * Create a Google Maps URL
						 */
						let url = `https://www.google.com/maps/place/` + encodeURIComponent(`${ item.AddressNumber } ${ item.Street }, ${ item.City }, ${ item.State }`.replace(" ", "+"));

						return (
							<>
								<Grid.Row key={ index }>
									<Grid.Column>
										<Container>
											<Header as="h3">
												{ item.Name }
											</Header>

											<Segment>
												<a href={ url } target="_blank" rel="noreferrer">{ item.AddressNumber } { item.Street }, { item.City }, { item.State }</a>
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

								<hr />
							</>
						);
					})
				}
			</Grid>
		</>
	);
};

export default Search;