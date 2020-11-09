import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import axios from '../axios';

function Favorite({addedFrom, movieId, movieInfo }) {

    const [favoritesNo, setFavoritesNo] = useState(0);
    const [favorited, setFavorited] = useState(false)

    const favoritesInfo = {
        userFrom: addedFrom,
        movieId: movieId,
        movieTitle: movieInfo.original_title,
        movieImage: movieInfo.backdrop_path,
        movieRunTime: movieInfo.runtime
    }

    useEffect(()=>{
        axios.post('/api/favorites/favoritesNumber', favoritesInfo)
            .then(res =>{
                if (res.data.success){
                    setFavoritesNo(res.data.NoOfFavorites)
                } else {
                    alert('Failed to get no of favorites')
                }
            })

        axios.post('/api/favorites/favorited', favoritesInfo)
            .then(res =>{
                if(res.data.success){
                    setFavorited(res.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })
    }, []);

    const handleFavorite =()=>{
        if (favorited){
            axios.post('api/favorites/removeFromFavorites', favoritesInfo)
                .then(res=>{
                    if(res.data.success){
                        setFavoritesNo(favoritesNo - 1)
                        setFavorited(!favorited)
                    } else {
                        alert('Failed to remove from favorites')
                    }
                })
        } else {
            axios.post('api/favorites/addToFavorites', favoritesInfo)
                .then(res=>{
                    if(res.data.success){
                        setFavoritesNo(favoritesNo + 1)
                        setFavorited(!favorited)
                    } else {
                        alert('Failed to add to favorites')
                    }
                })
        }
    }

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleFavorite}>
                {favorited ? 'Remove from Favorites' : 'Add to Favorites'}{favoritesNo}
            </Button>
        </div>
    );
}

export default Favorite;