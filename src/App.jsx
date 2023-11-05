import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Gallery from "./components/Gallery";

const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Box display="flex" alignItems="center">
				<Container
					component="main"
					maxWidth="lg"
					sx={{ backgroundColor: "white" }}
				>
					<Gallery />
				</Container>
			</Box>
		</DndProvider>
	);
};

export default App;
