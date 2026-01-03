import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Insert from './pages/Insert';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
      <Link className="navbar-brand text-white" to="#">React Laravel CURD</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link text-white active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Insert-Data">Insert</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Insert-Data" element={<Insert />} />
        <Route path="/Edit-Details" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
