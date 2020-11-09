import React, {useEffect, useState} from 'react';
import '../styles/favorites.css';
import axios from '../axios';
import FavRows from "../components/FavRowss";
import {IMAGE_URL} from "../Config";

function FavoritesPage(props) {

    const [favoredMovies, setFavoredMovies] = useState([])

    useEffect(()=>{
        favoritedMovies()
    },[]);

    const favoritedMovies =()=>{
        axios.post('/api/favorites/favoredMovies', {userFrom: "Jeff"})
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.favorites)
                    setFavoredMovies(res.data.favorites)
                } else {
                    alert('Failed to get your list of favorites')
                }
            })
    }

    const removeFave = (movieId, userFrom) =>{
        const details = {
            movieId,
            userFrom
        }

        axios.post('api/favorites/removeFromFavorites', details)
            .then(res=>{
                if(res.data.success){
                    favoritedMovies()
                } else {
                    alert('Failed to remove from favorites')
                }
            })
    }

    return (
        <div className="favorites">
            <h3>My Favorite Movies</h3>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Run Time</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {favoredMovies.map(movie=>(
                        <tr>
                            <FavRows key={movie.movieId} title={movie.movieTitle} runTime={movie.movieRunTime}
                                     image={movie.moviePost ? `${IMAGE_URL}w500${movie.moviePost}` : "No Poster"}
                                     action={()=>removeFave(movie.movieId, movie.userFrom)}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
        </div>
    );
}

export default FavoritesPage;