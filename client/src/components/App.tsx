import React, { FunctionComponent } from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateListPage from './pages/CreateListPage';
import ViewListPage from './pages/ViewListPage';
import NotFoundPage from './pages/NotFoundPage';

interface RouteInterface {
  path: string;
  name: string;
  component: FunctionComponent;
}

const App = () => {
  const routes: Array<RouteInterface> = [
    { path: '/', name: 'Root', component: () => <Redirect to="/home" /> },
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/create/list', name: 'Create List', component: CreateListPage },
    { path: '/view/lists', name: 'View Lists', component: ViewListPage },
    { path: '/*', name: 'Not Found', component: NotFoundPage },
  ];

  return (
    <div className="page-wrapper">
      <Switch>
        {routes.map(({ path, component }) => {
          return <Route exact key={path} path={path} component={component} />;
        })}
      </Switch>
    </div>
  );
};

export default App;
