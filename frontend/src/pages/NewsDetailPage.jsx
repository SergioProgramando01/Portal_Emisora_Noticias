import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para leer parámetros de la URL
import axios from 'axios';
import './NewsDetailPage.css';

function NewsDetailPage() {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const { noticiaId } = useParams(); // Obtenemos el ID de la noticia desde la URL

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/noticias/${noticiaId}`);
        setNoticia(response.data);
      } catch (error) {
        console.error("Error al obtener la noticia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [noticiaId]); // Se ejecuta cada vez que el ID de la noticia cambie

  if (loading) {
    return <div>Cargando noticia...</div>;
  }

  if (!noticia) {
    return <div>No se encontró la noticia.</div>;
  }

  return (
    <div className="main-container">
        <main className="main-content-area">
            <article className="single-article-container">
                <div className="article-header">
                    <h1>{noticia.titulo}</h1>
                    <div className="article-meta">
                        <span>Publicado el: {new Date(noticia.fecha_creacion).toLocaleDateString()}</span>
                    </div>
                </div>

                <img src={`https://placehold.co/1000x500/4A0070/FFFFFF?text=${noticia.titulo.split(' ')[0]}`} alt={noticia.titulo} className="article-hero-image" />

                <div className="article-body">
                    <p>{noticia.contenido}</p>
                </div>
            </article>
        </main>
        {/* Aquí podríamos poner una sidebar si quisiéramos */}
    </div>
  );
}

export default NewsDetailPage;