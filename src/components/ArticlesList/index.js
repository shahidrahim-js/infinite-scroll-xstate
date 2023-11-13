import React, {useCallback, useEffect, useState} from 'react';
import {useMachine} from '@xstate/react';
import {fetchArticlesMachine} from '../../state/articlesMachine';
import ArticleCard from '../ArticleCard';
import InfiniteScroll from '../InfiniteScroll';
import styles from './ArticlesList.module.css';

const ArticlesList = () => {
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

  const handleIsSend = useCallback(function() {
    send('FETCH');
  }, []);

  return (
    <div className={styles.listContainer}>
      <h1>Articles</h1>
      <InfiniteScroll
        handleIsSend={handleIsSend}
        loading={loading}
      >
        {articles?.map((article, key) => (
          <ArticleCard article={article} key={key} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArticlesList;
