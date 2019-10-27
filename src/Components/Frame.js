import React, { useState, useEffect } from 'react';

import Map from './Map';
import NewsBoard from './NewsBoard';

const Banner = () => {
  const styles = {
    container: {
      width: 250,
      position: 'absolute',
      top: 10,
      left: '50%',
      marginLeft: '-125px',
      backgroundColor: '#fcfcfc',
      padding: 10,
      fontSize: '1.75em',
      boxShadow: '2px 2px 3px 0px #ddd',
    }
  };
  
  return (
    <div className='Banner' style={styles.container}>
      Choose a Country
    </div>
  );
};

const Loader = () => {
  const styles = {
    loader: {
      position: 'absolute',
      left: '50%',
      top: '35%',
      width: 100,
      height: 100,
      marginLeft: '-50px',
      fontSize: '2em',
    }
  };

  return (
    <div style={styles.loader}>
      <img id='loader' src='./loading.svg' alt='Loading...'/>
    </div>
  );
};

const Frame = () => {
  const [windowSize, setWindowSize] = useState([window.innerHeight, window.innerWidth]);
  const [boardWidth, setBoardWidth] = useState(0);
  const [news, setNews] = useState({});
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWindowSize([window.innerHeight, window.innerWidth]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerHeight, window.innerWidth]);
    });
  }, []);

  useEffect(() => {
    if(country) {
      setBoardWidth(windowSize[1] - windowSize[0]);
    } else {
      setBoardWidth(0);
    }
  }, [windowSize, country]);

  useEffect(() => {
    if(!country) return;
    setIsLoading(true);
    fetch('https://kw9k3r8ar7.execute-api.us-west-2.amazonaws.com/api/news?k=' + country)
      .then(r => r.json())
      .then(json => {
        setNews(json);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
      });
  }, [country]);

  const styles = {
    container: {}
  };

  return (
    <div className='Frame' style={styles.container}>
      <Map setCountry={setCountry}/>
      {country && !isLoading && <NewsBoard width={boardWidth} news={news} country={country}/>}
      {isLoading && <Loader/>}
      {!country && <Banner/>}
    </div>
  );
};

export default Frame;
