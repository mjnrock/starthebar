import { Header, Container, Table, Grid, Segment, Label, Icon } from "semantic-ui-react";

const VenueFlags = [
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`,
	`IsDistillery`,
];

export function SearchResult({ item, url, resultsFilter } = {}) {
	let flags = VenueFlags.reduce((a, flag, i) => {
		if(!!item[ flag ]) {
			return [ ...a, (
				<Label
					key={ flag }
					color={ resultsFilter.includes(flag) ? "blue" : "" }
				>
					<Icon name="tag" />
					{ flag.replace("Is", "").match(/[A-Z][a-z]+/g).join(" ") }
				</Label>
			) ];
		}

		return a;
	}, []);

	return (
		<Segment raised>
			<Grid.Row>
				<Grid.Column>
					<Container>
						<Header as="h3">
							{ item.Name }
						</Header>

						<a href={ url } target="_blank" rel="noreferrer">{ item.FullAddress }</a>

						{
							flags.length ? (
								<div style={ { marginTop: 10 } }>
									{
										flags
									}
								</div>
							) : null
						}
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Segment>
	);
};

export default SearchResult;