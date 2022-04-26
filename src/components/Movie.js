import { useState } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import styles from "../Movie.module.css";

function Movie({id, coverImg, title, setModalMode, setPreviewImgSrc, setPreviewTitle, setMovieId, setCoordinate}) {
  const onMouseOver = (event) => {
    let defaultY = 213.40000915527344;
    let defaultX = 99;
    
    // console.log(event.pageX, event.pageY);
    setModalMode(true);
    let target = event.target;
    if(target.tagName === 'IMG') {
      const x = event.target.getBoundingClientRect().left;
      const y = window.pageYOffset + event.target.getBoundingClientRect().top;
      setPreviewImgSrc(target.src);
      setPreviewTitle(target.parentNode.dataset.value);
      setMovieId(target.parentNode.dataset.id);
      setCoordinate([x-defaultX, y-defaultY]);
    }
  }
  return (
    <div onMouseOver={onMouseOver} className={styles.div}>
      <Link to={`/movie/${id}`} data-id={id} data-value={title}><img className={styles.poster} src={coverImg} alt={title}/></Link>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
}

// function Movie({id, coverImg, title, summary, genres}) {
//   console.log(summary.length);
//   return (
//     <div>
//       <img src={coverImg} alt={title}/>
//       <h2>
//         <Link to={`/movie/${id}`}>{title}</Link>
//       </h2>
//       <p className={styles.title}>
//         {summary.length > 156 ? `${summary.substr(0, 156)}...` : summary}
//         {summary.length > 156 ? <Link to={`/movie/${id}`} style={{color: 'blue'}} className={styles.more}>더보기</Link> : null}
//       </p>
//       <ul>
//         {genres.map((element, index) => (
//           <li key={index}>{element}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// Movie.propTypes = {
//     id: PropTypes.number.isRequired,
//     coverImg: PropTypes.string.isRequired,
//     title:PropTypes.string.isRequired,
//     summary:PropTypes.string.isRequired,
//     genres: PropTypes.arrayOf(PropTypes.string).isRequired,
// }

export default Movie;