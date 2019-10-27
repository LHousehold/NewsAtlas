import React from 'react';

const NewsElement = ({article}) => {
  const {title, description, content, author, source, publishedAt, url} = article;
  const date = new Date(publishedAt).toDateString();

  const styles = {
    containers: {
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      margin: '5px 15px',
      boxShadow: '2px 2px 3px 0px #ddd',
      cursor: 'pointer',
      backgroundColor: '#fcfcfc',
    },
    title: {
      fontSize: '1.5em',
    },
    description: {
      fontsize: '1em',
      fontWeight: 'bold',
    },
    content: {
      fontsize: '1em',
    },
    subtext: {
      fontSize: '0.75em',
    },
    row: {
      padding: 5,
      textAlign: 'left',
    },
  };
  
  return (
    <div className='NewsElement' style={styles.containers} onClick={() => window.open(url, '_blank')}>
      <div style={{...styles.title, ...styles.row}}>
        {title}
      </div>
      {description && <div style={{...styles.description, ...styles.row}}>{description}</div>}
      {content && <div style={{...styles.content, ...styles.row}}>{content.substring(0,260)}</div>}
      <div style={{...styles.subtext, ...styles.row}}>
        {
          (author && !author.includes('http') && `${author}, ${source.name} - ${date}`)
          ||
          `${source.name} - ${date}`
        }
      </div>
    </div>
  );
};

const NewsBoard = ({width, news, country}) => {
  const styles = {
    container: {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100vh',
      maxWidth: width,
      width: '600px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      backgroundColor: 'transparent',
    },
    header: {
      fontSize: '1.8em',
      backgroundColor: '#fcfcfc',
      boxShadow: '2px 2px 3px 0px #ddd',
      padding: 10,
      margin: '15px 15px 5px 15px',
    },
    articles: {
      display: 'flex',
      flexDirection: 'column',
    },
    credit: {
      backgroundColor: '#fcfcfc',
      boxShadow: '2px 2px 3px 0px #ddd',
      padding: 10,
      margin: '5px 15px',
      marginBottom: 50,
      cursor: 'pointer',
    }
  };

  return (
    <div className='NewsBoard' style={styles.container}>
      <div style={styles.header}>{country}</div>
      <div style={styles.articles}>
        {
          news.articles
          && news.articles.map(a => {
            return <NewsElement article={a} key={a.author + a.publishedAt}/>
          })
        }
      </div>
      <div style={styles.credit} onClick={() => window.open('https://newsapi.org/', '_blank')}>
        Special thanks to News API for providing the news for this resource
      </div>
    </div>
  )
};

export default NewsBoard;
