import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import {fetchArticlesMachine} from '../../state/articlesMachine';
import ArticleCard from '../ArticleCard';

function InfiniteScroll() {
 const [state, send] = useMachine(fetchArticlesMachine);
 const [loading, setLoading] = useState(false);
 const [articles, setArticles] = useState([]);

 useEffect(() => {
    if (state.matches('loading')) {
      setLoading(true);
    }
    if (state.matches('success')) {
      setArticles((prevState) => [...prevState, ...state.context.results]);
    }
 }, [state]);

 useEffect(() => {
    send('FETCH');
 }, []);

 const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight) {
      send('FETCH');
  }
};

 useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
    <div>
      <h1>Infinite Scroll</h1>
      <div>
        {articles.map((article, key) => (
          <ArticleCard article={article} key={key} />
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
 );
}

export default InfiniteScroll;
