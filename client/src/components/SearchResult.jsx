import { Header, Container, Table, Grid, Segment, Label, Icon } from "semantic-ui-react";

const VenueFlags = [
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`,
	`IsDistillery`,
];

export function SearchResult({ item, resultsFilter } = {}) {
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

	/* Create a Google Search URL */
	let searchUrl = `https://www.google.com/search?q=` + encodeURIComponent(`${ item.Name }, ${ item.City }, ${ item.State }`);
	/* Create a Google Maps URL */
	let mapUrl = `https://www.google.com/maps/place/` + encodeURIComponent(`${ item.FullAddress }`.replace(" ", "+"));

	return (
		<Segment raised>
			<Grid.Row>
				<Grid.Column>
					<Container>
						<Header as="h3">
							{/* { item.Name } */ }
							<a href={ searchUrl } target="_blank" rel="noreferrer">{ item.Name }</a>
						</Header>

						{
							item.Phone ? (
								<>
									<a href={ `tel:${ item.Phone.replace(/[^0-9]+/gi, "") }` }>{ item.Phone }</a>
									<br /><br />
								</>
							) : null
						}

						<a href={ mapUrl } target="_blank" rel="noreferrer">{ item.FullAddress }</a>

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