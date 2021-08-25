import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

/*
  React.lazy() is used to lazy load components.
  It takes a function which then resolves to dynamic import.
  This function which we pass to React.lazy() will be executed by React 
  when this 'NewQuote' component is needed.
  So It will not be executed in advance to download the code in advance, but only when it's needed.
  And that will therefore create a separate code chunk 
  which is only downloaded when this NewQuote page is visited.

  Now the problem we have here is that we are downloading this code only when it's needed.
  But the problem with that, this download can take a couple of milliseconds or even seconds maybe.
  Now, whilst we're downloading this code, React is of course not able to continue, 
  as we can't load this component yet until the download completed.
  And that's why we need to define a fallback UI, some fallback content which can be shown
  if this download takes a bit longer. To solve this, we need to use 'Suspense' component.
  We need to wrap this Suspense component around the code where we use React lazy.
*/
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

function App() {
  return (
    <Layout>
      {/* To solve the problem with lazy loading, that is to show fallback UI, 
        we need to use 'Suspense' component. We need to wrap this Suspense component around the code where we use React lazy.
        For this Suspense component, we need to set a 'fallback' prop which is some JS X code as a value,
        which is shown as a fallback till the lazy loaded component is downloaded and loaded.
        */}
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes />
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetail />
          </Route>
          <Route path='/new-quote'>
            <NewQuote />
          </Route>
          {/* If no matching path found */}
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
