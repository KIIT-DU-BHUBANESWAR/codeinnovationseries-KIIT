import React, { useEffect, useState } from 'react';
import { Cube } from 'styled-loaders-react';
// import './plugins/jQuery/jquery.min.js'
// import './plugins/bootstrap/bootstrap.min.js'
// import './plugins/slick/slick.min.js'
// import './plugins/plugins/aos/aos.js'
// import './venobox/venobox.min.js'
// import './plugins/filterizr/jquery.filterizr.min'
// import './js/script.js'
// import './plugins/google-map/gmap.js'

import Home from './components/Home';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
  return (
    <div className="App">
      {loading ? (
        <Cube color="red" size="60px" duration="5s"></Cube>
      ) : (
        <>
          <Home></Home>
        </>
      )}
    </div>
  );
}

export default App;
