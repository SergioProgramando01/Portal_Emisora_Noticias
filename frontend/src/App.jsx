import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import SubNav from './components/SubNav';
import Footer from './components/Footer';
import RadioPlayer from './components/RadioPlayer';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import CategoryPage from './pages/CategoryPage'; // <-- Importar

function App() {
  return (
    <Router>
      <div>
        <Header />
        <NewsTicker />
        <SubNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticia/:noticiaId" element={<NewsDetailPage />} />
          <Route path="/categoria/:categoryName" element={<CategoryPage />} /> {/* <-- Añadir Ruta */}
        </Routes>
        <Footer />
      </div>
      <RadioPlayer />
    </Router>
  );
}

export default App;