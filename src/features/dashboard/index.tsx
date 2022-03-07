import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { People } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import Statistic from './components/Statistic';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardAction,
  selectDashboardLoading,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
  selectStatistics,
} from './dashboardSlice';

type Props = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

const Dashboard = (props: Props) => {
  const dispath = useAppDispatch();
  const classes = useStyle();

  const loading = useAppSelector(selectDashboardLoading);
  console.log('loading', loading);
  const statistics = useAppSelector(selectStatistics);
  console.log('statistics', statistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  console.log('highestStudentList', highestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  console.log('lowestStudentList', lowestStudentList);
  const rankingByCity = useAppSelector(selectRankingByCityList);
  console.log('rankingByCity', rankingByCity);

  useEffect(() => {
    console.log('DASH BROARD');
    dispath(dashboardAction.fetchData());
  }, [dispath]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Statistic
            icon={<People fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistic
            icon={<People fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistic
            icon={<People fontSize="large" color="primary" />}
            label="mark > 8"
            value={statistics.hightMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistic
            icon={<People fontSize="large" color="primary" />}
            label="mark < 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      {/* Student Ranking List */}
      <Box mt={2}>
        <Typography variant="h3">Student ranking</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student list with highest mark">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student list with lowest mark">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* Ranking By City */}
      <Box mt={2}>
        <Typography variant="h3">Rankings by city</Typography>
        <Grid container spacing={3}>
          {rankingByCity.map((city, idx) => (
            <Grid key={city.cityId} item xs={12} md={6} lg={3}>
              <Widget title={city.name}>
                <StudentRankingList studentList={city.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
