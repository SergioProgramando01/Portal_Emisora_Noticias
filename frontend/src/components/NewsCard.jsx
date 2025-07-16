import './NewsCard.css';
import { Link } from 'react-router-dom'; // 1. Importar Link

// 2. Recibir el 'id' de la noticia como prop
function NewsCard({ id, title, category, imageUrl, summary }) {
  return (
    // 3. Reemplazar <a> con <Link> y dirigirlo a la ruta correcta
    <Link to={`/noticia/${id}`} className="news-item-link">
      <article className="news-item">
        <span className="category">{category}</span>
        <img src={imageUrl} alt={title} />
        <div className="news-item-content">
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
      </article>
    </Link>
  );
}

export default NewsCard;