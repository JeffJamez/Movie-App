import React, {useState, useEffect} from 'react';
import {API_KEY, API_URL, IMAGE_URL} from "../Config";
import MainImage from "../components/MainImage";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import GridCard from "../components/GridCard";
import Favorite from "../components/Favorite";

function MovieDetails(props) {

    const movieId = props.match.params.movieId;

    const [movie, setMovie] = useState([]);
    const [crew, setCrew] = useState([]);
    const [actors, setActors] = useState(false)

    useEffect(()=>{

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setMovie(res)
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(res =>{
                        console.log(res.cast)
                        setCrew(res.cast)
                    })
            })
    },[]);

    const seeActors = () =>{
        setActors(!actors)
    }

    return (
        <div>
            {
                movie &&
                <MainImage image={`${IMAGE_URL}w1280${movie.backdrop_path && movie.backdrop_path}`} title={movie.original_title} text={movie.overview}/>
            }

            {/*Body*/}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                    <Favorite addedFrom="Jeff" movieId={movieId} movieInfo={movie}/>   {/*Put all of the movie\'s info in that props*/}
                </div>

                <TableContainer >
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie Title</TableCell>
                                <TableCell align="right">Release Date</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                                <TableCell align="right">Run Time</TableCell>
                                <TableCell align="right">Vote Average</TableCell>
                                <TableCell align="right">Vote Count</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Popularity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {movie.original_title}
                                    </TableCell>
                                    <TableCell align="right">{movie.release_date}</TableCell>
                                    <TableCell align="right">{movie.revenue}</TableCell>
                                    <TableCell align="right">{movie.runtime}</TableCell>
                                    <TableCell align="right">{movie.vote_average}</TableCell>
                                    <TableCell align="right">{movie.vote_count}</TableCell>
                                    <TableCell align="right">{movie.status}</TableCell>
                                    <TableCell align="right">{movie.popularity}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer><br/>

                <div style={{display: 'flex', justifyContent:'center'}}>
                    <Button variant="outlined" color="secondary" onClick={seeActors}>{actors ? 'Hide Actors' : 'Show Actors'}</Button>
                </div>
                <br/>

                {actors &&
                    <Grid container spacing={1} direction="row">
                    {crew && crew.map((crew, value) => (
                        <Grid item xs={6} sm={3}>
                            <>
                                {crew.profile_path &&
                                <GridCard key={crew.credit_id} actor image={`${IMAGE_URL}w500${crew.profile_path}`}/>
                                }
                            </>
                        </Grid>
                    ))}
                    </Grid>
                }
            </div>
        </div>
    );
}

export default MovieDetails;