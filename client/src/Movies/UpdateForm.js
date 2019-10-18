import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
	tile: '',
	director: '',
	metascore: '',
	stars: ''
};

const UpdateForm = (props) => {
	const [ movie, setMovie ] = useState(initialMovie);
	useEffect(
		() => {
			const movieToEdit = props.items.find((item) => `${item.id}` === props.match.params.id);

			if (movieToEdit) setMovie(movieToEdit);
		},
		[ props.items, props.match.params.id ]
	);

	const changeHandler = (ev) => {
		ev.persist();
		let value = ev.target.value;
		if (ev.target.name === 'price') {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[ev.target.name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// action creator

		axios
			.put(`http://localhost:3333/items/${movie.id}`, movie)
			.then((res) => {
				// needs to call setItems
				props.updateItems(res.data);
				props.history.push('/');
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title} />
				<div className="baseline" />

				<input
					type="input"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="string"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<input type="number" name="stars" onChange={changeHandler} placeholder="stars" value={movie.stars} />
				<div className="baseline" />

				<button className="md-button form-button">Update</button>
			</form>
		</div>
	);
};

export default UpdateForm;
