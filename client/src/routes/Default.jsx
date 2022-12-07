import { useState, useEffect } from "react";

export function Default() {
	const [ msg, setMsg ] = useState("Loading...");

	useEffect(() => {
		fetch(`https://kiszka.com:3001/`)
		.then(res => res.json())
		.then(data => setMsg(data));
	}, []);

	return (
		<pre>
			{ JSON.stringify(msg, null, 2) }
		</pre>
	);
};

export default Default;