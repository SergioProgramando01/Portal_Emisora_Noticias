import './SubNav.css';
import { Link } from 'react-router-dom';

function SubNav() {
  const categories = ["Nación", "Mundo", "Deportes", "Entretenimiento", "Tecnología", "Salud", "Cultura", "Economía"];
  const subCategories = ["Análisis", "Entrevistas", "Columnistas", "Reportajes", "Opinión", "Eventos", "Especiales", "Archivo"];

  return (
    <>
      <nav className="secondary-navbar">
        <ul>
          {categories.map(cat => (
            <li key={cat}><Link to={`/categoria/${cat}`}>{cat}</Link></li>
          ))}
        </ul>
      </nav>
      <nav className="tertiary-navbar">
        <ul>
          {subCategories.map(subCat => (
            <li key={subCat}><Link to={`/categoria/${subCat}`}>{subCat}</Link></li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SubNav;