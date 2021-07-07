import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Boddy from './app/components/boddy/Boddy';

import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <>
      <App />
      <div className="contentCard">
        <Boddy />
      </div>
    </>
  </ApolloProvider>,
  document.getElementById('root')
);


