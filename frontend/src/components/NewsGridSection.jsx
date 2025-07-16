import { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsGridSection.css';
import NewsCard from './NewsCard';

function NewsGridSection({ title, skip = 0, limit = 6, columns = 3 }) {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/noticias/?skip=${skip}&limit=${limit}`);

        if (response.data.length > 0) {
          setNoticias(response.data);
        } else {
          // Si no hay noticias, creamos datos de relleno (lorem ipsum)
          const dummyNews = Array.from({ length: limit }, (_, i) => ({
            id: `dummy-${title}-${i}`,
            titulo: `${title} - Noticia de Relleno ${i + 1}`,
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          }));
          setNoticias(dummyNews);
        }

      } catch (error) {
        console.error(`Error al obtener ${title}:`, error);
      }
    };

    fetchNews();
  }, [title, skip, limit]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '20px'
  };

  return (
    <section className="section">
        <div className="section-header">
            <h2>{title}</h2>
            <a href="#" className="view-more">VER MÁS <i className="fas fa-arrow-right"></i></a>
        </div>
        <div style={gridStyle}>
          {noticias.map(noticia => (
            <NewsCard 
              key={noticia.id}
              title={noticia.titulo}
              summary={noticia.contenido.substring(0, 100) + '...'}
              category={title} 
              imageUrl={`https://placehold.co/400x250/E91E63/FFFFFF?text=${noticia.titulo.split(' ')[0]}`}
            />
          ))}
        </div>
    </section>
  );
}

export default NewsGridSection;