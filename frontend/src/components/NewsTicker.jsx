import './NewsTicker.css'; // Importamos los estilos

function NewsTicker() {
  return (
    <div className="breaking-news-bar">
      <div className="breaking-news-content">
        <span>ÚLTIMA HORA:</span> <a href="#">Noticia importante 1 que está pasando en este momento.</a>
        <span>•</span> <a href="#">Titular de última hora 2 con información relevante.</a>
        <span>•</span> <a href="#">Breve resumen de la noticia 3 para mantenerte informado.</a>
      </div>
    </div>
  );
}

export default NewsTicker;