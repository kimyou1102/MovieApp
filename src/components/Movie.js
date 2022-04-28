import { useState } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import styles from "../Movie.module.css";

function Movie({id, coverImg, title, setModalMode, setPreviewImgSrc, previewTitle, setPreviewTitle, setMovieId, setCoordinate, isHovered, setIsHovered, debouncedHandleMouseEnter}) {
  // const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 2000);

  // if(modalMode && !event.target.className.includes('previewModal')) {
  //   setIsHovered(false);
  //   debouncedHandleMouseEnter.cancel();
  // }
  
  const onMouseOver = (event) => {
    console.log(isHovered);
    let defaultX = 99;
    // setModalMode(true);
    if(isHovered) {
      setIsHovered(false);
    }
    debouncedHandleMouseEnter();
    let target = event.target;
    if(target.tagName === 'IMG') {
      // console.log('movie컴포넌트 프리뷰타이틀  ' + title);
      const x = event.target.getBoundingClientRect().left;
      const y = window.pageYOffset + event.target.getBoundingClientRect().top;
      // console.log(x, y);
      setPreviewImgSrc(target.src);
      setPreviewTitle(target.parentNode.dataset.value);
      setMovieId(target.parentNode.dataset.id);
      setCoordinate([x-defaultX, y]);
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