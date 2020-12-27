import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Header from './components/Header';
import Home from './pages/Home';
import CreateEdit from './pages/CreateEdit';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <div className="container mx-auto px-4">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create-edit" component={CreateEdit} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
