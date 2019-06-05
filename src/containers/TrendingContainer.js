import React, { useState, useEffect, useContext } from 'react';
import TrendingItem from '../components/TrendingItem';
import { Item } from 'semantic-ui-react'
import TrendingMenu from '../components/TrendingMenu';
import Loading from '../components/Loading'
import ShopContext from '../context/shop-context';

const TrendingContainer = () => {
  const [trendingArticles, setTrendingArticles] = useState(null)
  const [loading, setLoading] = useState(false)
  const context = useContext(ShopContext)

  useEffect(() => {
    setLoading(true)
    fetch('/articles/get_trending')
    .then(res => res.json())
    .then(articles => {
      setTrendingArticles(articles)
      setLoading(false)
    })
  }, [])
  
  //decides which of the 10 articles to display
  const handleActiveArticles = () => {
    let articles = []
    if (trendingArticles){
      if(context.activeItem === 'likes'){
        articles = trendingArticles.likes
      }
      else if(context.activeItem === 'dislikes'){
        articles = trendingArticles.dislikes
      }
      else {
        articles = trendingArticles.controversial
      }}
    return articles
  }
   
  return ( 
    loading ?
    <Loading />
    :
    <div className='trending-container'>
      <TrendingMenu />
      <Item.Group divided>
        {handleActiveArticles().map((article, index) => <TrendingItem key={index} article={article} /> )}
      </Item.Group>
    </div>
  );
}
 
export default TrendingContainer;