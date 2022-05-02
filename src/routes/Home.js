import { useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Movie from "../components/Movie";
import styles from "../Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function LoadingAnimation() {
  return(
    <div className={styles.loading}></div>
  )
}

function Nav({genre, setGenre}) {
  const onClick = (event) => {
    if(event.target.tagName === 'LI') {
      setGenre(event.target.innerText);
    }
  }
  return(
    <div>
      <ul onClick={onClick}>
        <li className={styles.categoryBtn}>All</li>
        <li className={styles.categoryBtn}>Action</li>
        <li className={styles.categoryBtn}>Adventure</li>
        <li className={styles.categoryBtn}>Animation</li>
        <li className={styles.categoryBtn}>Biography</li>
        <li className={styles.categoryBtn}>Comedy</li>
        <li className={styles.categoryBtn}>Crime</li>
        <li className={styles.categoryBtn}>Documentary</li>
        <li className={styles.categoryBtn}>Drama</li>
        <li className={styles.categoryBtn}>Family</li>
        <li className={styles.categoryBtn}>Fantasy</li>
        <li className={styles.categoryBtn}>Film Noir</li>
        <li className={styles.categoryBtn}>History</li>
        <li className={styles.categoryBtn}>Horror</li>
        <li className={styles.categoryBtn}>Music</li>
        <li className={styles.categoryBtn}>Musical</li>
        <li className={styles.categoryBtn}>Mystery</li>
        <li className={styles.categoryBtn}>Romance</li>
        <li className={styles.categoryBtn}>Sci-Fi</li>
        <li className={styles.categoryBtn}>Short Film</li>
        <li className={styles.categoryBtn}>Sport</li>
        <li className={styles.categoryBtn}>Superhero</li>
        <li className={styles.categoryBtn}>Thriller</li>
        <li className={styles.categoryBtn}>War</li>
        <li className={styles.categoryBtn}>Western</li>
      </ul>
    </div>
  )
}

function FilterMovie({movies, genre, modalMode, previewImgSrc, setPreviewImgSrc, previewTitle, setPreviewTitle, movieId, setMovieId, coordinate, setCoordinate, setIsHovered, setModalMode}) {
  const filteredMovies = movies.filter(movie => movie.genres.includes(genre));
  return(
    <div className={styles.filteredWrap}>
      {filteredMovies.length === 0 ? <h2 className={styles.noneInfo}>해당하는 장르의 영화는 없습니다.</h2> 
      : <h2 className={styles.count}>({filteredMovies.length})</h2>}
      <div className={styles.wrap}>
        {filteredMovies.map(movie => (
        <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            coverImg={movie.medium_cover_image}
            genres={movie.genres}
            previewTitle = {previewTitle}
            setPreviewImgSrc = {setPreviewImgSrc}
            setPreviewTitle = {setPreviewTitle}
            setCoordinate = {setCoordinate}
            setMovieId = {setMovieId}
            setIsHovered = {setIsHovered}
            // setModalMovie = {setModalMovie}
            setModalMode = {setModalMode} 
        />
        ))}
        <div className={styles.previewModalWrapper} style={{left: `${coordinate[0]}px`, top: `${coordinate[1]-247.625}px`}}>
          {modalMode ? <Modal src={previewImgSrc} id={movieId} title={previewTitle} /> : null}
        </div>
      </div>
    </div>
    
  )
}

function Modal({id, src, title}) {
  const [show, setShow] = useState('none');
  
  const iconMouseOver = () => {
    setShow('block');
  }

  const onMouseOver = (event) => {
    if(show === 'block' && event.target.tagName !== 'IMG' && event.target.tagName !== 'A') {
      console.log(event.target);
      setShow('none');
    }
  }
  return(
    <div className={styles.previewModal}>
      <img className={styles.previewModal_img} src={src} />
      <div onMouseOver={onMouseOver} className={styles.previewModal_infoWrap}>
        <h3 className={styles.previewModal_title}>{title}</h3>
        <div onMouseOver={iconMouseOver} className={styles.previewModal_infoIconWrap}>
          <Link to={`/movie/${id}`}><img className={styles.previewModal_infoIcon} src="info.png"/></Link>
          <span className={styles.previewModal_infoText} style={{display: show}}>View Details</span>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('All');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImgSrc, setPreviewImgSrc] = useState('');
  const [movieId, setMovieId] =  useState('');
  const [coordinate, setCoordinate] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [modalMode, setModalMode] = useState(false);

  let state = useRef('');
  let notTimer = '';
  console.log(isHovered, modalMode);

  useEffect(() => {
    if(isHovered) {
      notTimer = setTimeout(() => {
        setModalMode(true);
      }, 1500);
      return () => clearTimeout(notTimer);
    } else if(!isHovered && state.current.includes('poster')) {
      setIsHovered(true);
    }
  }, [isHovered])


  const onMouseOver = (event) => {
    state.current = event.target.className;
    if(isHovered && !event.target.className.includes('previewModal')) {
      setIsHovered(false);
      setModalMode(false);
    }
  }

  // console.log(isHovered);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=download_count&limit=50`
      )
    ).json();
    // console.log(json.data.movies);
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div onMouseOver={onMouseOver} className="HomeComponent">
      <Nav genre={genre} setGenre={setGenre}/>
      {loading ? <LoadingAnimation />:
      genre === 'All' ?
      <div className={styles.wrap} onMouseOver={onMouseOver}>
        {movies.map((movie) => (
          <Movie 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            coverImg={movie.medium_cover_image}
            genres={movie.genres}
            setPreviewImgSrc = {setPreviewImgSrc}
            previewTitle = {previewTitle}
            setPreviewTitle = {setPreviewTitle}
            setMovieId = {setMovieId}
            setCoordinate = {setCoordinate}
            setIsHovered = {setIsHovered}
            isHovered = {isHovered}
            setModalMode = {setModalMode}
          />
      ))} 
        <div className={styles.previewModalWrapper} style={{left: `${coordinate[0]}px`, top: `${coordinate[1]-213.40000915527344}px`}}>
          {modalMode ? <Modal src={previewImgSrc} id={movieId} title={previewTitle} /> : null}
        </div>
      </div>
      : <FilterMovie 
          movies={movies} 
          genre={genre} 
          previewImgSrc={previewImgSrc}
          setPreviewImgSrc={setPreviewImgSrc}
          previewTitle={previewTitle}
          setPreviewTitle={setPreviewTitle}
          movieId={movieId}
          setMovieId={setMovieId}
          coordinate={coordinate}
          setIsHovered = {setIsHovered}
          // setModalMovie={setModalMovie}
          setModalMode = {setModalMode}
          setCoordinate={setCoordinate} 
        />  
      }
    </div>
  );
}

export default Home; 



// function AllMovie({movies, genre, modalMode, setModalMode, previewImgSrc, setPreviewImgSrc, previewTitle, setPreviewTitle, movieId, setMovieId, coordinate, setCoordinate}) {
//   return(
//     <div className={styles.wrap}>
//       {movies.map((movie) => (
//         <Movie 
//           key={movie.id}
//           id={movie.id}
//           title={movie.title}
//           coverImg={movie.medium_cover_image}
//           genres={movie.genres}
//           setModalMode = {setModalMode}
//           setPreviewImgSrc = {setPreviewImgSrc}
//           previewTitle = {previewTitle}
//           setPreviewTitle = {setPreviewTitle}
//           setMovieId = {setMovieId}
//           setCoordinate = {setCoordinate}
//         />
//     ))} 
//       <div className={styles.previewModalWrapper} style={{left: `${coordinate[0]}px`, top: `${coordinate[1]-213.40000915527344}px`}}>
//         {modalMode ? <Modal src={previewImgSrc} id={movieId} title={previewTitle} /> : null}
//       </div>
//     </div>
//   )
// }

// function Home() {
//   const [loading, setLoading] = useState(true);
//   const [movies, setMovies] = useState([]);
//   const [genre, setGenre] = useState('All');
//   const [modalMode, setModalMode] = useState(false);
//   const [previewTitle, setPreviewTitle] = useState('');
//   const [previewImgSrc, setPreviewImgSrc] = useState('');
//   const [movieId, setMovieId] =  useState('');
//   const [coordinate, setCoordinate] = useState([]);

//   const onMouseOver = (event) => {
//     if(modalMode && !event.target.className.includes('previewModal') && !event.target.className.includes('poster')) {
//       setModalMode(false);
//     }
//   }

//   console.log(previewTitle);
//   const getMovies = async () => {
//     const json = await (
//       await fetch(
//         `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=download_count&limit=50`
//       )
//     ).json();
//     console.log(json.data.movies);
//     setMovies(json.data.movies);
//     setLoading(false);
//   };
//   useEffect(() => {
//     getMovies();
//   }, []);
//   return (
//     <div onMouseOver={onMouseOver} className="HomeComponent">
//       <Nav genre={genre} setGenre={setGenre}/>
//       {loading ? <LoadingAnimation />:
//       genre === 'All' ?
//       <AllMovie
//         movies={movies} 
//         genre={genre} 
//         modalMode={modalMode}
//         setModalMode={setModalMode}
//         previewImgSrc={previewImgSrc}
//         setPreviewImgSrc={setPreviewImgSrc}
//         previewTitle={previewTitle}
//         setPreviewTitle={setPreviewTitle}
//         movieId={movieId}
//         setMovieId={setMovieId}
//         coordinate={coordinate}
//         setCoordinate={setCoordinate}
//       />: 
//       <FilterMovie 
//           movies={movies} 
//           genre={genre} 
//           modalMode={modalMode}
//           setModalMode={setModalMode}
//           previewImgSrc={previewImgSrc}
//           setPreviewImgSrc={setPreviewImgSrc}
//           previewTitle={previewTitle}
//           setPreviewTitle={setPreviewTitle}
//           movieId={movieId}
//           setMovieId={setMovieId}
//           coordinate={coordinate}
//           setCoordinate={setCoordinate} 
//         />  
//       }
//     </div>
//   );
// }

// export default Home; 

//{<FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>}
