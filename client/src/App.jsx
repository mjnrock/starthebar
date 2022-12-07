import React from "react";
import { Routes, Route } from "react-router-dom";

import Router from "./routes/package";

import "semantic-ui-css/semantic.min.css"

export function App() {
	return (
		<Routes>
			<Route path="*" element={ <Router.Default /> } />
			<Route path="search" element={ <Router.Search /> } />
		</Routes>
	);
}

export default App;