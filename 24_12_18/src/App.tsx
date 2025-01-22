import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Strona Główna</Link>
                        </li>
                        <li>
                            <Link to="/post-detail">Szczegóły Posta</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/post-detail" element={<PostPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

