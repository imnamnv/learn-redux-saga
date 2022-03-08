import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './page/AddEditPage';
import ListPage from './page/ListPage';

const StudentFeature = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`} exact>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
};

export default StudentFeature;
