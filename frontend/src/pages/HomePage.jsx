import FeaturedNews from '../components/FeaturedNews';
import NewsGridSection from '../components/NewsGridSection';
import Sidebar from '../components/Sidebar';
import '../components/MainContent.css';

function HomePage() {
  return (
    <div className="main-container">
      <main className="main-content-area">
        
        <div className="banner-ad banner-leaderboard">
          <img src="https://placehold.co/970x90/4A0070/FFFFFF?text=BANNER+SUPERIOR+970x90" alt="Banner Publicitario Superior" />
        </div>

        <FeaturedNews />

        <div className="banner-ad banner-leaderboard">
          <img src="https://placehold.co/970x90/8f00ff/FFFFFF?text=BANNER+INTERMEDIO+1" alt="Banner Publicitario Intermedio 1" />
        </div>

        <NewsGridSection title="Últimas Noticias" skip={4} limit={6} columns={3} />

        <div className="banner-ad banner-leaderboard">
          <img src="https://placehold.co/970x90/2dd3c9/FFFFFF?text=BANNER+INTERMEDIO+2" alt="Banner Publicitario Intermedio 2" />
        </div>
        
        <NewsGridSection title="Entretenimiento" skip={10} limit={2} columns={2} />
        
        <div className="banner-ad banner-leaderboard">
            <img src="https://placehold.co/970x90/E91E63/FFFFFF?text=BANNER+INTERMEDIO+3" alt="Banner Publicitario Intermedio 3" />
        </div>

        <NewsGridSection title="Deportes" skip={12} limit={3} columns={3} />

      </main>
      
      <Sidebar />

    </div>
  );
}

export default HomePage;