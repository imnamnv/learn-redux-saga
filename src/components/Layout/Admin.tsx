import { Box, makeStyles, Theme } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

type AdminProps = {};

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '230px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    gridTemplateRows: 'auto 1fr',

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,

    padding: theme.spacing(2, 3),
  },
}));

export const Admin = (props: AdminProps) => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path={'/admin/dashboard'}>
            <Dashboard />
          </Route>
          <Route path={'/admin/students'}>
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};
