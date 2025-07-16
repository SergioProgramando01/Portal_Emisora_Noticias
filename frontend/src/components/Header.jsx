import './Header.css';
import { Link } from 'react-router-dom'; // 1. Importar Link

function Header() {
  return (
    <>
      <header className="header-top">
        <div className="content">Un CGM que trabaja - tan rápido como tú.</div>
      </header>

      <div className="header-main">
        {/* 2. Envolver el logo en un Link que lleva al home ("/") */}
        <Link to="/" className="logo-link">
          <div className="logo">Tu Voz Emisora</div>
        </Link>

        <div className="right-section">
          <div className="social-icons-header">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="live-radio-indicator">
            <span className="dot"></span>
            <span>EN VIVO</span>
            <i className="fas fa-play"></i>
          </div>
        </div>
      </div>

      <nav className="main-navbar">
        <ul>
          {/* 3. Convertir los elementos del menú en Links */}
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/categoria/Noticias">Noticias</Link></li>
          <li><Link to="/categoria/Programacion">Programación</Link></li>
          <li><Link to="/categoria/Podcasts">Podcasts</Link></li>
          <li><Link to="/contacto">Contacto</Link></li> {/* Este enlace aún no tendrá página */}
          <li><i className="fas fa-search search-icon" aria-label="Buscar"></i></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;