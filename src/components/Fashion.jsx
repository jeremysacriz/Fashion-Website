import { useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { fashionArr } from "../carouselData.js";
import { increase, decrease, increment, decrement, start, end, setCarouselIndex } from '../Redux/actions/actions';

export const Fashion = forwardRef((props, ref) => {
  const [ overlay, setOverlay ] = useState()
  const [ direction, setDirection ] = useState()

  const dispatch = useDispatch()

  const activeIndex = useSelector(state => state.indexReducer.activeIndex)
  const carouselIndex = useSelector(state => state.indexReducer.carouselIndex)

  let index = fashionArr.length / 5;

  const leftClick = () => {
    setDirection(-1)
    dispatch(decrement())
  }

  const rightClick = () => {
    setDirection(1)
    dispatch(increment())
  }

  const leftIndex = () => {
    setDirection(-1)
    dispatch(decrease())

    if (carouselIndex === 0) dispatch(end(fashionArr))
  }

  const rightIndex = () => {
    setDirection(1)
    dispatch(increase())

    if (carouselIndex === fashionArr.length - 1) dispatch(start())
  }

  const imgOverlay = (item) => {
    setOverlay(true)
    dispatch(setCarouselIndex(item.id))
  }

  const overlayVariants = {
    initial: direction => {
       return {
          y: direction > 0 ? "200%" : "-200%",
          opacity: 0,
       }
    },
    animate: {
       y: 0,
       transition: { duration: 0.5 },
       opacity: 1,
    },
    exit: direction => {
       return {
          y: direction > 0 ? "-200%" : "200%",
          transition: { duration: 0.5 },
          opacity: 0,
       }
    },
 }

  return (
    <section id="fashion" ref={ref}>
        <ul className="fashion-carousel">
            {
              fashionArr.map((item) => {
                if (item.position === (activeIndex)) {
                  return (
                    <li key={item.id} className="carousel-item">
                      <button type="button" className="carousel-btn" onClick={() => imgOverlay(item)}>
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
          <img src={fashionArr[carouselIndex].src} alt="img" />
          <div className="overlay-btns">
            <button type="button" className="overlay-btn-left" onClick={leftIndex}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button type="button" className="overlay-btn-right" onClick={rightIndex}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="close-overlay">
            <button type="button" className="close-overlay-btn" onClick={() => setOverlay(false)}>
            <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="overlay-index-container">
            <div className="overlay-index">
              <AnimatePresence initial={false} custom={direction}>
                <motion.h1 key={carouselIndex} variants={overlayVariants} initial="initial" animate="animate" exit="exit" custom={direction}>{carouselIndex + 1}</motion.h1>
              </AnimatePresence>
              <div className="overlay-line" data-active={carouselIndex > 8 ? "active" : null}/>
              <h1 className="carousel-length">{fashionArr.length}</h1>
            </div>
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
