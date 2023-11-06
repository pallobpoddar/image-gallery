import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import { useDrag, useDrop } from "react-dnd";
import "../App.scss";

const ItemType = "IMAGE";

const Image = ({
	image,
	index,
	moveImage,
	toggleImageCheckbox,
	checkedImages,
}) => {
	const [showCheckbox, setShowCheckbox] = useState(false);
	const isChecked = checkedImages.includes(index);

	const [, ref] = useDrag({
		type: ItemType,
		item: { index },
	});

	const [, drop] = useDrop({
		accept: ItemType,
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveImage(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});

	return (
		<Card
			ref={(node) => ref(drop(node))}
			className="card"
			style={{ position: "relative" }}
			onMouseEnter={() => setShowCheckbox(true)}
			onMouseLeave={() => {
				if (!isChecked) {
					setShowCheckbox(false);
				}
			}}
			sx={{
				border: "1px solid #d1cdcd",
				"&:hover": {
					cursor: "pointer",
				},
			}}>
			<CardMedia
				component="img"
				image={image.src}
				alt={image.title}
			/>
			<div className="card-media-overlay" />

			{showCheckbox && (
				<Checkbox
					style={{
						position: "absolute",
						top: "8px",
						left: "8px",
						zIndex: 1,
					}}
					checked={isChecked}
					onChange={() => toggleImageCheckbox(index)}
				/>
			)}
		</Card>
	);
};

export default Image;
