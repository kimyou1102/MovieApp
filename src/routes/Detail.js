import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            console.log(json.data.movie);
            setLoading(false);
            setTitle(json.data.movie.title);
            setImg(json.data.movie.medium_cover_image);
            setRating(json.data.movie.rating);
            setRuntime(json.data.movie.runtime);
            setGenres(json.data.movie.genres);
            setDate(json.data.movie.date_uploaded);
            setDownload(json.data.movie.download_count);
            setLike(json.data.movie.like_count);
            setDescription(json.data.movie.description_intro);
    }
    useEffect(()=> {
        getMovie();
    }, [])

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [rating, setRating] = useState('');
    const [runtime, setRuntime] = useState('');
    const [genres, setGenres] = useState([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [download, setDownload] = useState('');
    const [like, setLike] = useState('');
    console.log(title);
    return (
        <div>
            {!loading ? 
            <div >
                <h1>{title}</h1>
                <img src={img} />
                <p>장르   {genres.map((e) => (e)).join(' ')}</p>
                <p>러닝타임   {runtime}</p>
                <p>개봉   {date}</p>
                <p>평점   {rating}</p>
                <p>다운로드 수   {download}</p>
                <p>❤   {like}</p>
                <hr />
            <p>{description}</p>
        </div> : null}
        </div>
    )
}

export default Detail;
