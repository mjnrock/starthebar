import { useState, useEffect, useRef } from "react";
import { Container, Button, Input, Message, Label, Segment, Icon } from "semantic-ui-react";

let columnList = [
	`LARABusinessID`,
	`LegalName`,
	`DBAName`,
	`Name`,
	`Phone`,
	`AddressNumber`,
	`Street`,
	`City`,
	`County`,
	`State`,
	`ZIP`,
	`FullAddress`,
	`LicenseMask`,
	`LicenseTypeMask`,
	`SocialDistrict`,
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`
].map(v => v.toLowerCase());

export function InfoPane({ searchType, searchRef, setSearchTerm, searchTerm }) {
	const [ visible, setVisible ] = useState(true);

	useEffect(() => {
		setVisible(true);
	}, [ searchType ]);

	if(searchType === "area") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Area</Message.Header>
				<Message.Content>
					<p>Search for results within a provided area.  For multiple areas, separate with a `||`.</p>
					<p>NOTE: All searches employ a wildcard wrapper: '%term%'</p>
				</Message.Content>
			</Message>
		);
	} else if(searchType === "name") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Name</Message.Header>
				<Message.Content>
					<p>Name uses the <strong>DBA Name</strong> first, and if absent, the <strong>Legal Name</strong> as the fallback.</p>
					<p>Use `||` for an `OR` join, and `&&` for an `AND` join.</p>
					<p>NOTE: All searches employ a wildcard wrapper: '%term%'</p>
				</Message.Content>
			</Message>
		);
	} else if(searchType === "tag") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Tag(s)</Message.Header>
				<Message.Content>
					<p>Using a `tag:value` syntax, you can search key:value pairs within the database.  Use `||` for an `OR` join, and `&&` for an `AND` join.</p>
					<p style={ { marginTop: 10 } }>Tags:</p>
					<div>{ columnList.map(t => <Label key={ t } style={ { marginBottom: 10, cursor: "copy" } } onContextMenu={ e => e.preventDefault() } onMouseUp={ e => {
						e.preventDefault();

						if(searchRef.current) {
							let tag = `${ t }:`.toLowerCase();

							if(e.ctrlKey || e.button === 2) {
								tag = `&&${ tag }`;
							} else if(searchTerm.length) {
								tag = `||${ tag }`;
							}

							if(searchTerm) {
								setSearchTerm(searchTerm + tag);
							} else {
								setSearchTerm(`${ t }:`.toLowerCase());
							}

							searchRef.current.focus();
							searchRef.current.select();
						}

					} }>{ t }</Label>) }</div>
				</Message.Content>
			</Message>
		);
	}
}

const VenueFlags = Object.fromEntries([
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`,
	`IsDistillery`,
].map(v => [ v, 1 ]));

export function SearchResult({ callback, result, onResultsFilter } = {}) {
	const searchRef = useRef(null);
	const [ searchType, setSearchType ] = useState("tag");
	const [ searchTerm, setSearchTerm ] = useState("");
	const [ history, setHistory ] = useState({
		area: [],
		name: [],
		tag: [],
	});
	const [ resultsFilter, setResultsFilter ] = useState([]);

	useEffect(() => {
		if(onResultsFilter) {
			onResultsFilter(resultsFilter);
		}
	}, [ resultsFilter ]);

	useEffect(() => {
		let fn = e => {
			if(e.key === "Enter") {
				callback(searchType, searchTerm, {
					onPremiseOnly: true,
				});

				let h = history;
				if(!h[ searchType ].includes(searchTerm)) {
					h[ searchType ].push(searchTerm);
					setHistory(h);
				}
			}
		};

		window.addEventListener("keydown", fn);

		return () => {
			window.removeEventListener("keydown", fn);
		};
	}, [ searchType, searchTerm ]);

	useEffect(() => {
		callback();
		setSearchTerm("");
		searchRef.current.focus();
	}, [ searchType ]);

	return (
		<Container style={ { marginTop: 10, marginBottom: 10 } }>
			<div style={ { textAlign: "center" } }>
				<InfoPane searchType={ searchType } searchRef={ searchRef } setSearchTerm={ setSearchTerm } searchTerm={ searchTerm } />
				<Button.Group style={ { width: "50%", marginBottom: 10 } }>
					<Button onClick={ e => setSearchType("area") } color={ searchType === "area" ? "blue" : "" }>Area</Button>
					<Button.Or />
					<Button onClick={ e => setSearchType("name") } color={ searchType === "name" ? "blue" : "" }>Name</Button>
					<Button.Or />
					<Button onClick={ e => setSearchType("tag") } color={ searchType === "tag" ? "blue" : "" }>Tag</Button>
				</Button.Group>
				<br />
				<Input ref={ searchRef } list={ searchType } style={ { width: "50%" } } type="text" value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } />
				<datalist id="area">
					{ history.area.map((v, i) => <option key={ i } value={ v } />) }
				</datalist>
				<datalist id="name">
					{ history.name.map((v, i) => <option key={ i } value={ v } />) }
				</datalist>
				<datalist id="tag">
					{ history.tag.map((v, i) => <option key={ i } value={ v } />) }
				</datalist>
			</div>

			{
				(result || []).length ? (
					<>
						<Segment basic={ true } textAlign="center" style={ { margin: 0 } }>
							{
								Object.keys(VenueFlags).map((flag, i) => {
									return (
										<Label
											key={ flag }
											color={ resultsFilter.includes(flag) ? "blue" : "" }
											style={ {
												cursor: "pointer",
											} }
											onClick={ e => {
												if(!resultsFilter.includes(flag)) {
													setResultsFilter([ ...resultsFilter, flag ]);
												} else {
													setResultsFilter(resultsFilter.filter(v => v !== flag));
												}
											} }
										>
											<Icon name={ resultsFilter.includes(flag) ? "check circle outline" : "circle outline" } />
											{ flag.replace("Is", "").match(/[A-Z][a-z]+/g).join(" ") }
										</Label>
									);
								})
							}
						</Segment>

						<div style={ { textAlign: "center", marginTop: 10, fontFamily: "monospace" } }>
							<strong>
								{
									resultsFilter.length ? (
										<>
											{
												result.filter(v => {
													let flags = Object.keys(VenueFlags).filter(flag => resultsFilter.includes(flag));
													return flags.every(flag => v[ flag ]);
												}).length
											}
										</>
									) : result.length
								}
							</strong>
							<span>&nbsp;Venue(s)</span>
						</div>
					</>
				) : (
					null
				)
			}

		</Container>
	);
};

export default SearchResult;