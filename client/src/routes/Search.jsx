import { useState, useEffect } from "react";
import { Grid, Label, Icon, Segment } from "semantic-ui-react";
import SearchResult from "../components/SearchResult";
import SearchPane from "../components/SearchPane";

function API(searchType, data, opts = {}) {
	if(!searchType || !data) return Promise.resolve([]);

	return new Promise((resolve, reject) => {
		// fetch(`https://kiszka.com:3001/`, {
		fetch(`http://192.168.86.100:3001/`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				searchType,
				data,
				...opts,
			}),
		})
			.then(res => res.json())
			.then(data => resolve(data));
	});
};

const VenueFlags = Object.fromEntries([
	`IsSocialDistrict`,
	`IsOnPremise`,
	`IsOffPremise`,
	`IsBrewery`,
	`IsWinery`,
	`IsDistillery`,
].map(v => [ v, 1 ]));

export function Search() {
	const [ msg, setMsg ] = useState([]);
	const [ resultsFilter, setResultsFilter ] = useState([]);

	if(!msg || !msg.length) {
		return (
			<SearchPane callback={ (...args) => API(...args).then(data => setMsg(data)) } result={ msg } />
		);
	}

	return (
		<>

			<SearchPane callback={ (...args) => API(...args).then(data => setMsg(data)) } result={ msg } onResultsFilter={ csf => setResultsFilter(csf) } />

			<hr style={ { marginBottom: 40 } } />

			<Grid textAlign="center" style={{ paddingBottom: 20 }}>
				{
					msg.map((item, index) => {
						if(resultsFilter.some(v => item[ v ] !== 1)) return null;

						return (
							<SearchResult key={ item.LegalName + item.FullAddress } item={ item } resultsFilter={ resultsFilter } />
						);
					})
				}
			</Grid>
		</>
	);
};

export default Search;