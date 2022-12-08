import { Header, Container, Table, Grid, Segment, Label, Icon } from "semantic-ui-react";

const VenueFlags = [
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`,
	`IsDistillery`,
];

export function SearchResult({ item, url } = {}) {
	let flags = VenueFlags.reduce((a, flag, i) => {
		if(!!item[ flag ]) {
			return [ ...a, (
				<Label key={ flag }>
					<Icon name="check" />
					{ flag.replace("Is", "").match(/[A-Z][a-z]+/g).join(" ") }
				</Label>
			) ];
		}

		return a;
	}, []);

	let googleQuery = `${ item.Name } ${ item.FullAddress }`.replace(/ /g, "+");

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

						{/* <iframe src={ `https://www.google.com/search?q=${ googleQuery }` } style={ { width: `100%`, height: 300, border: 0 } } loading="lazy" /> */}
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Segment>
	);
};

export default SearchResult;