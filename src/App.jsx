import './css/index.css'
import { Home, Header, Fashion } from './components';
import { useRef } from 'react';

const App = () => {
  const resultRef = useRef(null)

  return (
    <section id="app">
      <Header />
      <Home resultRef={resultRef} />
      <Fashion ref={resultRef} />
    </section>
  )
}

export default App