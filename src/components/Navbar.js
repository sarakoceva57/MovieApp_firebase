import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import { MovieContext } from '../context/MoviesContext';
import { logout } from '../firebase';


const baseUrl = 'https://api.themoviedb.org/3';
const searchUrl = `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=`;
const Navbar = () => {
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext);
	const { setMovies } = useContext(MovieContext);
	const [search, setSearch] = useState('');


	const logoutHandler = () => {
		logout();
		navigate('/login');
	}
	//f-ja za searchot
	const searchHandler = async () => {

		const res = await axios.get(`${searchUrl}${search}`)
		setMovies(res.data.results);

	}
	return (
		<nav className='navbar navbar-expand-lg fixed-top navbar-dark' style={{ backgroundColor: '#070707', height: '60px' }}>
			<div className='container-fluid'>
				<Link to="/" className='navbar-brand'> <h4 style={{ color: '#f79d65' }}> Movies </h4></Link>
				<div className='d-flex align-items-center'>
					{currentUser ? (
						<>
							<form className="d-flex mr-5">
								<input className="form-control me-2" type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} style={{ border: '1px solid grey' }} />
								<button className="btn btn-outline-light ml-2" type="button" onClick={searchHandler}>Search</button>
							</form>
							<h4 className='text-capitalize d-inline-block  mx-2 my-2 mr-5' style={{ color: '#a4a095' }}> {currentUser?.displayName} </h4>
							<button type="button" className="mx-2 btn btn-outline-light" onClick={logoutHandler}> Logout </button>
						</>
					) : (
						<>
							<button type="button" className="mx-2 btn btn-outline-light"
								onClick={() => navigate('/login')}> Login </button>
							<button type='button' className='mx-2 btn btn-outline-light'
								onClick={() => navigate('/register')}> Register </button>
						</>
					)}

				</div>
			</div>
		</nav>
	)
}

export default Navbar