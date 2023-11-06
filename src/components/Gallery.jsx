import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from "./Image";
import products from "../assets/products.json";
import "../App.scss";

const Gallery = () => {
	const [images, setImages] = useState(products);
	const [checkedImages, setCheckedImages] = useState([]);

	const moveImage = (fromIndex, toIndex) => {
		const updatedImages = [...images];
		const [movedImage] = updatedImages.splice(fromIndex, 1);
		updatedImages.splice(toIndex, 0, movedImage);
		setImages(updatedImages);
	};

	const toggleImageCheckbox = (index) => {
		setCheckedImages((prevCheckedImages) => {
			if (prevCheckedImages.includes(index)) {
				return prevCheckedImages.filter((imageIndex) => imageIndex !== index);
			} else {
				return [...prevCheckedImages, index];
			}
		});
	};

	const deleteCheckedImages = () => {
		const updatedImages = images.filter(
			(_, index) => !checkedImages.includes(index)
		);
		setImages(updatedImages);
		setCheckedImages([]);
	};

	return (
		<Box margin={3}>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs>
					<Typography
						variant="h5"
						mb={1}
						sx={{ display: "flex", alignItems: "center", height: "50px" }}>
						{checkedImages.length > 0 ? (
							<>
								<Checkbox checked></Checkbox>
								{checkedImages.length}{" "}
								{checkedImages.length > 1 ? <>Files </> : <>File </>}
								Selected
							</>
						) : (
							<>Gallery</>
						)}
					</Typography>
				</Grid>
				{checkedImages.length > 0 && (
					<Grid item>
						<Button
							variant="text"
							color="error"
							onClick={deleteCheckedImages}
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}>
							Delete {checkedImages.length > 1 ? <>files</> : <>file</>}
						</Button>
					</Grid>
				)}
			</Grid>

			<Divider />

			<Grid
				container
				spacing={3}
				mt={3}
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
					"@media (max-width: 768px)": {
						gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					},
					"@media (max-width: 480px)": {
						gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
					},
					"@media (max-width: 320px)": {
						gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
					},
				}}>
				{images.map((image, index) => (
					<Grid
						item
						sx={index === 0 && { gridRow: "span 2", gridColumn: "span 2" }}
						key={index}>
						<Image
							key={index}
							image={image}
							index={index}
							moveImage={moveImage}
							toggleImageCheckbox={toggleImageCheckbox}
							checkedImages={checkedImages}
						/>
					</Grid>
				))}
				<Grid item>
					<Card
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							border: "0.5px dashed #d1cdcd",
							height: "100%",
							width: "100%",
						}}>
						<CardMedia component="div">
							<ImageOutlinedIcon />
						</CardMedia>
						<CardMedia component="div">Add images</CardMedia>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Gallery;
