import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import styles from "../Movie.module.css";

function Movie({id, coverImg, title, summary, genres}) {
    console.log(summary.length);
    return (
      <div>
        <img src={coverImg} alt={title}/>
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p className={styles.title}>
          {summary.length > 156 ? `${summary.substr(0, 156)}...` : summary}
          {summary.length > 156 ? <Link to={`/movie/${id}`} style={{color: 'blue'}} className={styles.more}>더보기</Link> : null}
        </p>
        <ul>
          {genres.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;