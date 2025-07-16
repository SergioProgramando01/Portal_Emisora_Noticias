import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Nuestra Emisora</h4>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Trabaja con Nosotros</a></li>
            <li><a href="#">Historia</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Boletines</h4>
          <p>Recibe en tu correo las noticias más importantes.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Ingresa tu email" />
            <button type="submit">Suscribir</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Tu Voz Emisora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;