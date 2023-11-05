import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
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
				return prevCheckedImages.filter(
					(imageIndex) => imageIndex !== index
				);
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
			<Grid container spacing={2}>
				<Grid item xs>
					<Typography variant="h5" mb={1}>
						{checkedImages.length > 0 ? (
							<>
								{checkedImages.length}{" "}
								{checkedImages.length > 1 ? (
									<>Files </>
								) : (
									<>File </>
								)}
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
						>
							Delete{" "}
							{checkedImages.length > 1 ? <>files</> : <>file</>}
						</Button>
					</Grid>
				)}
			</Grid>

			<Divider />

			<Grid container spacing={3} mt={3}>
				{images.map((image, index) => (
					<Grid item xs={index === 0 ? 4.8 : 2.4} key={index}>
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
			</Grid>
		</Box>
	);
};

export default Gallery;
