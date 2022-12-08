import { useState, useEffect } from "react";
import { Header, Container, Segment, Button, Input, Message, Label } from "semantic-ui-react";

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
	`SocialDistrict`,
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`
].map(v => v.toLowerCase());

export function InfoPane({ searchType }) {
	const [ visible, setVisible ] = useState(true);

	useEffect(() => {
		setVisible(true);
	}, [ searchType ]);

	useEffect(() => {
		console.log(visible)
	}, [ visible ]);

	if(searchType === "area") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Area</Message.Header>
				<Message.Content>
					<p>Search for results within a provided area</p>
					<p>For multiple areas, separate with a `||`</p>
					<p>Example: `Oxford||Lake Orion`</p>
					<p>NOTE: All searches employ a wildcard wrapper: '%term%'</p>
				</Message.Content>
			</Message>
		);
	} else if(searchType === "name") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Name</Message.Header>
				<Message.Content>
					<p>Name uses the <strong>DBA Name</strong> first, and if absent, the <strong>Legal Name</strong> as the fallback</p>
					<p>Use `||` for an `OR` join, and `&&` for an `AND` join</p>
					<p>NOTE: All searches employ a wildcard wrapper: '%term%'</p>
				</Message.Content>
			</Message>
		);
	} else if(searchType === "tag") {
		return (
			<Message onDismiss={ () => setVisible(false) } visible={ visible } hidden={ !visible }>
				<Message.Header>Search by Tag(s)</Message.Header>
				<Message.Content>
					<p>Using a `tag:value` syntax, you can search key:value pairs within the database.  Use `||` for an `OR` join, and `&&` for an `AND` join</p>
					<p style={ { marginTop: 10 } }>Tags:</p>
					<div>{ columnList.map(t => <Label key={ t } style={ { marginBottom: 10, cursor: "copy" } } onClick={ e => navigator.clipboard.writeText(`${ t }:`) }>{ t }</Label>) }</div>
				</Message.Content>
			</Message>
		);
	}
}

export function SearchResult({ callback, result } = {}) {
	const [ searchType, setSearchType ] = useState("area");
	const [ searchTerm, setSearchTerm ] = useState("name:Lake Orion");

	useEffect(() => {
		let fn = e => {
			if(e.key === "Enter") {
				callback(searchType, searchTerm, {
					onPremiseOnly: true,
				});
			}
		};

		window.addEventListener("keydown", fn);

		return () => {
			window.removeEventListener("keydown", fn);
		};
	}, [ searchType, searchTerm ]);

	return (
		<Container style={ { marginTop: 10, marginBottom: 10 } }>
			<div style={ { textAlign: "center" } }>
				<InfoPane searchType={ searchType } />
				<Button.Group style={ { width: "50%", marginBottom: 10 } }>
					<Button onClick={ e => setSearchType("area") } active={ searchType === "area" }>Area</Button>
					<Button.Or />
					<Button onClick={ e => setSearchType("name") } active={ searchType === "name" }>Name</Button>
					<Button.Or />
					<Button onClick={ e => setSearchType("tag") } active={ searchType === "tag" }>Tag</Button>
				</Button.Group>
				<br />
				<Input style={ { width: "50%" } } type="text" value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } />
			</div>

			<Segment raised>
				<Header as="h2" textAlign="center">
					{ searchTerm }
				</Header>
			</Segment>

			<div style={ { textAlign: "center" } }>{ (result || []).length } Results</div>
		</Container>
	);
};

export default SearchResult;