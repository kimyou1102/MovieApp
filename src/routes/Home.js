import { useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
// import { debounce } from "lodash";
import Movie from "../components/Movie";
import styles from "../Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function LoadingAnimation() {
  return(
    <div className={styles.loading}></div>
  )
}

function Nav({setGenre}) {
  // const [show, setShow] = useState(false);
  const scrollRef = useRef(null);
  const right = useRef(12);
  const left = useRef(12);

  const onClick = (event) => {
    if(event.target.tagName === 'LI') {
      setGenre(event.target.innerText);
    }
  }

  const onRightClick = (event) => {
    let num = 350;
    scrollRef.current.scrollLeft += num;
    console.log(event.target);
    if(event.target.tagName === 'svg') {
      right.current -= num;
      left.current += num;
      event.target.parentNode.style.right = `${right.current}px`;
      event.target.parentNode.parentNode.children[0].style.left = `${left.current}px`;
    } else if(event.target.tagName === 'path') {
      right.current -= num;
      left.current += num;
      event.target.parentNode.parentNode.style.right = `${right.current}px`;
      event.target.parentNode.parentNode.parentNode.children[0].style.left = `${left.current}px`;
    }
  }
  const lastMouseOver = (event) => {
    console.log(event.target.getBoundingClientRect().right);
    console.log(window.pageXOffset + event.target.getBoundingClientRect().right);
  }
  return(
    <div className={styles.btnWrap} ref={scrollRef}>
      <div>
        <ul onClick={onClick}>
          <li className={styles.categoryBtn}>All</li>
          <li className={styles.categoryBtn}>Action</li>
          <li className={styles.categoryBtn} onMouseOver={lastMouseOver}>Adventure</li>
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
          <li className={styles.categoryBtn} onMouseOver={lastMouseOver}>Thriller</li>
          <li className={styles.categoryBtn} onMouseOver={lastMouseOver}>War</li>
          <li className={styles.categoryBtn} onMouseOver={lastMouseOver}>Western</li>
        </ul>
        <div className={styles.scrollWrap}>
          <div className={styles.leftIconWrap}>
              <FontAwesomeIcon icon={faChevronLeft} className={styles.leftIcon}/>
          </div>
          <div className={styles.rightIconWrap} onClick={onRightClick} style={{right: `${right.current}px`}}>
            <FontAwesomeIcon icon={faChevronRight} className={styles.rightIcon}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterMovie({movies, genre, modalMode, previewImgSrc, setPreviewImgSrc, previewTitle, setPreviewTitle, movieId, setMovieId, coordinate, setCoordinate, setIsHovered}) {
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
            // previewTitle = {previewTitle}
            setPreviewImgSrc = {setPreviewImgSrc}
            setPreviewTitle = {setPreviewTitle}
            setCoordinate = {setCoordinate}
            setMovieId = {setMovieId}
            setIsHovered = {setIsHovered}
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
      <img className={styles.previewModal_img} src={src} alt={title}/>
      <div onMouseOver={onMouseOver} className={styles.previewModal_infoWrap}>
        <h3 className={styles.previewModal_title}>{title}</h3>
        <div onMouseOver={iconMouseOver} className={styles.previewModal_infoIconWrap}>
          <Link to={`/movie/${id}`}><img className={styles.previewModal_infoIcon} src="info.png" alt="infoIcon"/></Link>
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
  console.log(isHovered, modalMode);

  useEffect(() => {
    if(isHovered) {
      const notTimer = setTimeout(() => {
        setModalMode(true);
      }, 1500);
      return () => clearTimeout(notTimer);
    } else if(!isHovered && state.current.includes('poster')) {
      setIsHovered(true);
    }
  }, [isHovered])

  const onMouseOver = (event) => {
    // console.log('마우스오버');
    state.current = event.target.className;
    if(isHovered && !event.target.className.includes('previewModal')) {
      setIsHovered(false);
      setModalMode(false);
    }
  }

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
      <Nav setGenre={setGenre}/>
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
            // previewTitle = {previewTitle}
            setPreviewImgSrc = {setPreviewImgSrc}
            setPreviewTitle = {setPreviewTitle}
            setMovieId = {setMovieId}
            setCoordinate = {setCoordinate}
            setIsHovered = {setIsHovered}
            // isHovered = {isHovered}
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
          previewTitle={previewTitle}
          setPreviewImgSrc={setPreviewImgSrc}
          setPreviewTitle={setPreviewTitle}
          setMovieId={setMovieId}
          setIsHovered = {setIsHovered}
          setCoordinate={setCoordinate} 
          movieId={movieId}
          coordinate={coordinate}
          modalMode = {modalMode}
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


/* <div className={styles.arrowWrap}> */
/* <FontAwesomeIcon icon={faChevronRight} className={styles.rightIcon}/> */
// </div>