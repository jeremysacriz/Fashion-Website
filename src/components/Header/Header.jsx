import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <section id="header">
        <div className="header-container">
            <Link to="/" className="header-img">
                <img className="header-logo" src="\img\logo.jpg" alt="logo" />
            </Link>
        </div>
    </section>
  )
}
