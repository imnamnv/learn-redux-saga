import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  title: string;
  children: any;
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(2),

    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Widget = ({ title, children }: Props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <Box>{children}</Box>
    </Paper>
  );
};

export default Widget;
