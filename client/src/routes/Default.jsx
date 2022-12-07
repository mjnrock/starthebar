import { useState, useEffect } from "react";

export function Default() {
	const [ msg, setMsg ] = useState("Loading...");

	useEffect(() => {
		fetch(`https://kiszka.com:3001/`)
		.then(res => res.json())
		.then(data => {
			setMsg(data.message);
		});
	}, []);

	return (
		<>
			{ msg }
		</>
	);
};

export default Default;