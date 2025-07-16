import { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedNews.css';
import NewsCard from './NewsCard';

function FeaturedNews() {
  const [mainNews, setMainNews] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [loading, setLoading] = useState(true); // Añadimos un estado de carga

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/noticias/?limit=4');
        const allNews = response.data;

        if (allNews.length > 0) {
          setMainNews(allNews[0]);
          setSecondaryNews(allNews.slice(1));
        }
      } catch (error) {
        console.error("Error al obtener las noticias destacadas:", error);
      } finally {
        // Esta línea se ejecuta siempre, haya o no error
        setLoading(false); 
      }
    };

    fetchFeaturedNews();
  }, []);

  // Si está cargando, muestra el mensaje
  if (loading) {
    return <div>Cargando noticias destacadas...</div>;
  }

  // Si terminó de cargar y no hay noticia principal, no muestra nada
  if (!mainNews) {
    return null; 
  }

  // Si todo está bien, muestra la sección
  return (
    <section className="section">
        <div className="section-header">
            <h2>Noticias Destacadas</h2>
            <a href="#" className="view-more">VER MÁS <i className="fas fa-arrow-right"></i></a>
        </div>
        <div className="news-grid news-layout-1">
            <div className="main-news-item">
                <NewsCard 
                  key={mainNews.id}
                  id={mainNews.id}
                  title={mainNews.titulo}
                  summary={mainNews.contenido.substring(0, 150) + '...'}
                  category="Destacado"
                  imageUrl={`https://placehold.co/800x450/4A0070/FFFFFF?text=${mainNews.titulo.split(' ')[0]}`}
                />
            </div>
            <div className="small-news-items">
                {secondaryNews.map(noticia => (
                    <NewsCard 
                        key={noticia.id}
                        id={noticia.id}
                        title={noticia.titulo}
                        summary=""
                        category="General"
                        imageUrl={`https://placehold.co/150x100/E91E63/FFFFFF?text=${noticia.titulo.split(' ')[0]}`}
                    />
                ))}
            </div>
        </div>
    </section>
  );
}

export default FeaturedNews;