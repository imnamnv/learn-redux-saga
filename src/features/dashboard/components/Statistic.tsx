import { Box, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

type Props = {
  icon: React.ReactElement;
  label: string;
  value: string | number;
};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(1, 2),

    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
  },
}));

const Statistic = ({ icon, label, value }: Props) => {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption" align="right">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default Statistic;
