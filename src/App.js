import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
