import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import '../components/MainContent.css';

function CategoryPage() {
  const [noticias, setNoticias] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/noticias/?category=${categoryName}`);
        setNoticias(response.data);
      } catch (error) {
        console.error(`Error al obtener noticias de ${categoryName}:`, error);
      }
    };

    fetchNewsByCategory();
  }, [categoryName]);

  return (
    <div className="main-container">
      <main className="main-content-area">
        <section className="section">
          <div className="section-header">
            <h2>Categoría: {categoryName}</h2>
          </div>
          <div className="news-grid-3-col" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {noticias.length > 0 ? (
              noticias.map(noticia => (
                <NewsCard 
                  key={noticia.id}
                  id={noticia.id}
                  title={noticia.titulo}
                  summary={noticia.contenido.substring(0, 100) + '...'}
                  category={noticia.category}
                  imageUrl={`https://placehold.co/400x250/4A0070/FFFFFF?text=${noticia.titulo.split(' ')[0]}`}
                />
              ))
            ) : (
              <p>No hay noticias en esta categoría.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CategoryPage;