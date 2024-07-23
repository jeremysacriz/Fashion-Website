import { useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { fashionArr } from "../carouselData.js";
import { increase, decrease, increment, decrement, start, end, setCarouselIndex } from '../Redux/actions/actions';


export const Fashion = forwardRef((props, ref) => {
  const [ overlay, setOverlay ] = useState()
  const [ direction, setDirection ] = useState()
  const [ indexDirection, setIndexDirection ] = useState()

  const dispatch = useDispatch()
  const prevIndex = useSelector(state => state.indexReducer.prevIndex)
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
    setIndexDirection(-1)
    dispatch(decrease())

    if (carouselIndex === 0) dispatch(end(fashionArr))
  }

  const rightIndex = () => {
    setIndexDirection(1)
    dispatch(increase())

    if (carouselIndex === fashionArr.length - 1) dispatch(start())
  }

  const imgOverlay = (item) => {
    setOverlay(true)
    dispatch(setCarouselIndex(item.id))
  }

  const overlayVariants = {
    initial: indexDirection => {
       return {
          y: indexDirection > 0 ? "200%" : "-200%",
       }
    },
    animate: {
       y: 0,
       transition: { duration: 0.6 },
    },
    exit: indexDirection => {
       return {
          y: indexDirection > 0 ? "-200%" : "200%",
          transition: { duration: 0.5 },
       }
    },
 }

  const dataSlides = (item) => {
    if (item.id === activeIndex && prevIndex === undefined) return "first"

    let slideRight = direction > 0
    let slideLeft = direction < 0

    if (slideRight && item.id === prevIndex) return "prevRight"
    if (slideRight && item.id === activeIndex) return "right"
    if (slideLeft && item.id === prevIndex) return "prevLeft"
    if (slideLeft && item.id === activeIndex) return "left"
  }

  let newArr = new Array(4)

  const containerArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = {'id': i, cName: 'container'}
    }
  }

  containerArr(newArr)

  const carouselItem = (index) => {
    let currIndex = index
    let newArr = fashionArr.filter(item => item.position === currIndex)
      
    return (
      <>
        {
          newArr.map(item => (
            <div key={item.id} type="button" className="carousel-item" onClick={() => imgOverlay(item)}>
              <button className="carousel-item-btn">
                <img src={item.src} alt={item.alt} />
                <div className="img-overlay">
                  <h1>View Item?</h1>
                </div>
              </button>
            </div>
          ))
        }
      </>
    )
  }

  return (
    <section id="fashion" ref={ref}>
        <ul className="fashion-carousel">
          <div className="carousel-item-container">
            {
              newArr.map((item, index) => {
                return (
                  <div className={item.cName} key={item.id} data-active={dataSlides(item)}>
                    {carouselItem(index + 1)}
                  </div>
                )
              })
            }
          </div>
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
              <AnimatePresence initial={false} custom={indexDirection}>
                <motion.h1 key={carouselIndex} variants={overlayVariants} initial="initial" animate="animate" exit="exit" custom={indexDirection}>{carouselIndex + 1}</motion.h1>
              </AnimatePresence>
              <div className="overlay-line" data-active={carouselIndex > 8 ? "active" : null}/>
              <h1 className="carousel-length">{fashionArr.length}</h1>
            </div>
          </div>
        </div>
      }
      <div className="carousel-btns">
        <button className="left-btn" onClick={leftClick} disabled={activeIndex === 0 ? true : null}>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="right-btn" onClick={rightClick} disabled={activeIndex === index - 1 ? true : null}>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  )
})
