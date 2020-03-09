import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Update = passedIn => {
    const [movie, setMovie] = useState(null);
    const [data, setData] = useState({ title: '', metascore: '', director: '', stars: '' })
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${passedIn.match.params.id}`)
            .then(res => {
                setMovie(res.data)
                setData({ ...data, stars: res.data.stars, id: res.data.id })
            })
            .catch(err => console.log(err.response));
    }, [passedIn.match.params.id]);
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handle = (event) => {
        event.preventDefault();
        console.log(data)
        axios
            .put(`http://localhost:5000/api/movies/${passedIn.match.params.id}`, data)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    }
    console.log(movie)

    if (!movie) {
        return <div>Loading movie information...</div>;
    }
    return (
        <div className="movie-list">
            <h2>{movie.title}</h2>
            <div className="movie-director">
                Director: <em>{movie.director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{movie.metascore}</strong>
            </div>
            <h3>Actors</h3>

            {movie.stars.map(star => (
                <div key={star} className="movie-star">
                    {star}
                </div>
            ))}
            <form onSubmit={handle}>
                <label>
                    Film Name:
                         <input type="text"
                        name='title'
                        value={data.title}
                        onChange={handleChange} />
                </label>
                <label>
                    metascore:
                         <input type="text"
                        name='metascore'
                        value={data.metascore}
                        onChange={handleChange} />
                </label>
                <label>
                    Director Name:
                         <input type="text"
                        name='director'
                        value={data.director}
                        onChange={handleChange} />
                </label>
                <input type="submit" value="Change" />
            </form>
        </div>
    );
}
export default Update
