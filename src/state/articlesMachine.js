import { createMachine, assign } from 'xstate';
import {fetchArticles} from '../api/fetchArticles';

const getArticles = async (context) => {
  try {
    const nodes = await fetchArticles(context.page)
    return nodes;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}

export const fetchArticlesMachine = createMachine({
  id: 'articles',
  initial: 'idle',
  context: {
    page: 1,
    results: [],
    error: null
  },
  states: {
    idle: {
      on: { FETCH: 'loading' },
    },
    loading: {
      invoke: {
        src: getArticles,
        onDone: {
          target: 'success',
          actions: assign({
            results: (_, event) => event.data,
            page: (context) => context.page + 1,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    success: {
      on: { FETCH: 'loading' },
    },
    failure: {
      on: { FETCH: 'loading' },
    },
  },
});
