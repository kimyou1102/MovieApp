import { useState } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import styles from "../Movie.module.css";

function Movie({id, coverImg, title, setModalMode, setPreviewImgSrc, previewTitle, setPreviewTitle, setMovieId, setCoordinate}) {
  const onMouseOver = (event) => {
    let defaultX = 99;
    setModalMode(true);
    let target = event.target;
    if(target.tagName === 'IMG') {
      console.log('movie컴포넌트 프리뷰타이틀  ' + title);
      const x = event.target.getBoundingClientRect().left;
      const y = window.pageYOffset + event.target.getBoundingClientRect().top;
      console.log(x, y);
      setPreviewImgSrc(target.src);
      setPreviewTitle(target.parentNode.dataset.value);
      setMovieId(target.parentNode.dataset.id);
      setCoordinate([x-defaultX, y]);
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

export default Movie;