import { useState } from "react";
import { Grid } from "semantic-ui-react";
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

export function Search() {
	const [ msg, setMsg ] = useState([]);

	console.log(msg)

	if(!msg || !msg.length) {
		return (
			<SearchPane callback={ (...args) => API(...args).then(data => setMsg(data)) } result={ msg } />
		);
	}

	return (
		<>
			<SearchPane callback={ (...args) => API(...args).then(data => setMsg(data)) } result={ msg } />

			<hr style={ { marginBottom: 40 } } />

			<Grid textAlign="center">
				{
					msg.map((item, index) => {
						/* Create a Google Maps URL */
						let url = `https://www.google.com/maps/place/` + encodeURIComponent(`${ item.FullAddress }`.replace(" ", "+"));

						return (
							<SearchResult key={ item.FullAddress } item={ item } url={ url } />
						);
					})
				}
			</Grid>
		</>
	);
};

export default Search;