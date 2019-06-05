import React, { useState, useEffect } from 'react';
import Articles from '../components/Articles';
import Loading from '../components/Loading'
import { withRouter } from 'react-router-dom'

const ArticlesContainer = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const getCategory = () => {
    let category = props.location.pathname.split('/')[2]
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  useEffect(() => {
    setLoading(true)
    fetch('https://newsflash-backend.herokuapp.com/articles/' + getCategory())
    .then(res => res.json())
    .then(articles => {
      setArticles(articles.articles)
      setLoading(false)
    })
  }, [])

  return ( 
    loading ? 
    <Loading />
    : 
    <React.Fragment>
      <h2>Browsing {getCategory()}</h2>
      <div className="ui grid container">
        <div className="three column wide centered">
          <div className="ui three stackable cards">
            {articles.map((article, i) => <Articles key={i} article={article} />)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ArticlesContainer);