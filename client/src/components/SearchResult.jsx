import { Header, Container, Table, Grid, Segment } from "semantic-ui-react";

export function SearchResult({ item, url } = {}) {
	return (
		<Segment raised>
			<Grid.Row>
				<Grid.Column>
					<Container>
						<Header as="h3">
							{ item.Name }
						</Header>

						<Segment>
							<a href={ url } target="_blank" rel="noreferrer">{ item.FullAddress }</a>
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
									<Table.Cell>Is Social District</Table.Cell>
									<Table.Cell>{ item.IsSocialDistrict ? "Yes" : "No" }</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>On Premise</Table.Cell>
									<Table.Cell>{ item.IsOnPremise ? "Yes" : "No" }</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Off Premise</Table.Cell>
									<Table.Cell>{ item.IsOffPremise ? "Yes" : "No" }</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Segment>
	);
};

export default SearchResult;