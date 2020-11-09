import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {API_URL, API_KEY, IMAGE_URL} from "../Config";
import '../styles/home.css'
import MainImage from "../components/MainImage";
import Button from '@material-ui/core/Button';
import GridCard from "../components/GridCard";

function HomePage(props) {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, []);

    const fetchMovies = (path) =>{
        fetch(path)
            .then(res => res.json())
            .then(res =>{
                console.log(res)
                setMovies([...movies, ...res.results])
                setCurrentPage(res.page)
            })
    }

    const loadMore = () =>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`
        fetchMovies(endpoint)
    }

    return (
        <div className="home">
            {/*Movie image*/}
            {movies[0] &&
                <MainImage image={`${IMAGE_URL}w1280${movies[0].backdrop_path && movies[0].backdrop_path}`} title={movies[0].original_title} text={movies[0].overview}/>
            }

            {/*Body*/}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Typography variant="h4">Movies by latest</Typography>
                <hr/>

                {/*Grid Cards*/}
                <Grid container spacing={1} direction="row">
                    {movies && movies.map((movie, value) => (
                        <Grid item xs={6} sm={3}>
                            <>
                                <GridCard key={movie.id} image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`} movieId={movie.id}/>
                            </>
                            </Grid>
                    ))}
                </Grid>

                <br/>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <Button variant="outlined" color="primary" onClick={loadMore}>Load More</Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;