import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from '../authSlice';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: theme.spacing(3),
  },
}));
const LoginPage = () => {
  const classes = useStyle();
  const dispath = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const handleLoggin = () => {
    dispath(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.box} elevation={3}>
        <Typography>STUDENT MANAGAMENT LOGIN</Typography>
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoggin}
          >
            {isLogging && <CircularProgress size={20} color={'inherit'} />}
            &nbsp; LOGIN
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
