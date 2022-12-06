import React from "react";
import { Routes, Route } from "react-router-dom";

import Router from "./routes/package";

import "semantic-ui-css/semantic.min.css"

export function App() {
	return (
		<Routes>
			<Route path="*" element={ <Router.Default /> } />
		</Routes>
	);
}

export default App;