import { useEffect, useState, useCallback } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const getMovie = useCallback(async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            console.log(json);
            console.log(json.data.movie);
            setLoading(false);
            setMovie(json.data.movie);
    }, [id]);
    useEffect(()=> {
        getMovie();
    }, [getMovie]);
    // const getMovie = async () => {
    //     const json = await(
    //         await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    //         ).json();
    //         console.log(json);
    //         console.log(json.data.movie);
    //         setLoading(false);
    //         setMovie(json.data.movie);
    // };
    // useEffect(()=> {
    //     getMovie();
    // }, []);

    return (
        <div>
            {!loading ? 
            <div >
                <h1>{movie.title}</h1>
                <img src={movie.medium_cover_image} alt={movie.title}/>
                <p>장르   {movie.genres.map((e) => (e)).join(' ')}</p>
                <p>러닝타임   {movie.runtime}</p>
                <p>개봉   {movie.date_uploaded}</p>
                <p>평점   {movie.rating}</p>
                <p>다운로드 수   {movie.download_count}</p>
                <p>❤   {movie.like_count}</p>
                <hr />
            <p>{movie.description_intro}</p>
        </div> : null}
        </div>
    )
}

export default Detail;
