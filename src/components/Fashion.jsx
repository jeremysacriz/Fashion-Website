import { useState, useEffect, forwardRef } from 'react';
import { fashionArr } from "../carouselData.js";

export const Fashion = forwardRef((props, ref) => {
  const [ prevIndex, setPrevIndex ] = useState()
  const [ activeIndex, setActiveIndex ] = useState(1)
  const [ overlay, setOverlay ] = useState()
  const [ img, setImg ] = useState()

  let index = fashionArr.length / 5;

  const leftClick = () => {
    setPrevIndex(activeIndex)

    if (activeIndex === 1) setActiveIndex(index + 1)
    setActiveIndex(prev => prev - 1)
  }

  const rightClick = () => {
    setPrevIndex(activeIndex)

    if (activeIndex === (index)) setActiveIndex(0)
    setActiveIndex(prev => prev + 1)
  }

  const imgOverlay = (item) => {
    setOverlay(true)
    setImg(item.src)
  }

  return (
    <section id="fashion" ref={ref}>
      <ul className="fashion-carousel">
        {
          fashionArr.map((item) => {
            if (item.index === activeIndex) {
              return (
                <li key={item.id} className="carousel-item">
                  <button type="button" className="carousel-btn" onClick={(item) => imgOverlay(item)}>
                    <img src={item.src} alt={item.alt} />
                    <div className="img-overlay">
                      <h1>View Item?</h1>
                    </div>
                  </button>
                </li>
                )
            }
          })
        }
      </ul>
      {
        overlay === true &&
        <div className="fashion-overlay">
          <img src="\img\logo.jpg" alt="img" />
          <div className="overlay-btns">
            <button type="button" className="overlay-btn-left">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button type="button" className="overlay-btn-right">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="close-overlay">
            <button type="button" className="close-overlay-btn" onClick={() => setOverlay(false)}>
            <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      }
      <div className="carousel-btns">
        <button className="left-btn" onClick={leftClick} disabled={activeIndex === 1 ? true : null}>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="right-btn" onClick={rightClick} disabled={activeIndex === index ? true : null}>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  )
})
