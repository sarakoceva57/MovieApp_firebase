import React, { useContext } from 'react'
import "./MovieCard.css"
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const imageUrl = 'https://image.tmdb.org/t/p/w1280';
const MovieCard = (props) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { title, poster_path, overview, vote_average, id } = props.movie;

    const showDetails = (id) => {
        if (currentUser) {
            navigate(`/details/${id}`);
        } else {
            alert('Please login to see movie details');
        }
    }

    const setVoteColor = (vote) => {
        if (vote >= 8) return 'green'
        else if (vote >= 6) return 'goldenrod'
        else return 'red'
    }

    return (
        <div className='movie' onClick={() => showDetails(id)}>
            <img src={`${imageUrl}${poster_path}`} alt={title} />
            <div className='text-center p-2 text-white' style={{ borderTop: '1px solid black' }}>
                <h5>{title}</h5>
                {currentUser && (<span className='vote' style={{ backgroundColor: setVoteColor(vote_average) }}>
                    {vote_average}
                </span>)}
            </div>
            <div className='overview'>
                <h2>Overview</h2>
                <h5>{title}</h5>
                <p>{overview}</p>
            </div>

        </div>
    )
}

export default MovieCard