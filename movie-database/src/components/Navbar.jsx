import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="/k-drama">K-Drama</Link></li>
        <li><Link to="/series">Series</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
