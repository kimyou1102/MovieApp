// import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import styles from "../Movie.module.css";

function Movie({id, coverImg, title, setPreviewImgSrc, setPreviewTitle, setMovieId, setCoordinate, setIsHovered}) {
  const onMouseOver = (event) => {
    let defaultX = 99;
    let target = event.target;
    // console.log(target);
    if(target.tagName === 'IMG') {
      const x = event.target.getBoundingClientRect().left;
      const y = window.pageYOffset + event.target.getBoundingClientRect().top;
      setPreviewImgSrc(target.src);
      setPreviewTitle(target.parentNode.dataset.value);
      setMovieId(target.parentNode.dataset.id);
      setCoordinate([x-defaultX, y]);
      setIsHovered(true);
    }
  }
  return (
    <div className={styles.div} onMouseOver={onMouseOver}>
      <Link to={`/movie/${id}`} data-id={id} data-value={title}><img className={styles.poster} src={coverImg} alt={title}/></Link>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
}

export default Movie;