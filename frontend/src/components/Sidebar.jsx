import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="banner-ad banner-medium-rectangle">
        <img src="https://placehold.co/300x250/8f00ff/FFFFFF?text=BANNER+LATERAL+1" alt="Banner Lateral 1" />
      </div>
      <div className="banner-ad banner-skyscraper">
        <img src="https://placehold.co/160x600/3c00a3/FFFFFF?text=BANNER+VERTICAL+LARGO" alt="Banner Lateral Largo" />
      </div>
      <div className="banner-ad banner-medium-rectangle">
        <img src="https://placehold.co/300x250/2dd3c9/FFFFFF?text=BANNER+LATERAL+2" alt="Banner Lateral 2" />
      </div>
    </aside>
  );
}

export default Sidebar;