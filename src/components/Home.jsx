import { useState, useEffect } from 'react';

export const Home = ({ resultRef }) => {
  const scrollDown = () => {
    resultRef.current.scrollIntoView({ behavior: "smooth"});
  }

  return (
    <>
      <section id="home">
        <div className="home-title">
          <h1>Welcome to Fashion!</h1>
        </div>
        <div className="scroll">
          <button className="scroll-down" onClick={scrollDown}>
            <span className="material-symbols-outlined arrow-down">keyboard_arrow_down</span>
          </button>
        </div>
      </section>
    </>
  )
}
