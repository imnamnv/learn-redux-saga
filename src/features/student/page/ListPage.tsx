import { Box, Button, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { Pagination } from '@material-ui/lab';
import { selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams } from 'models';

type Props = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

const ListPage = (props: Props) => {
  const classes = useStyle();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  const cityMap = useAppSelector(selectCityMap);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('filter', filter);
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h5">Student Management</Typography>
        <Button variant="contained" color="primary">
          Add new Student
        </Button>
      </Box>

      <Box mt={3}>
        <StudentFilters filter={filter} onSearchChange={handleSearchChange} />
      </Box>

      <StudentTable cityMap={cityMap} studentList={studentList} />

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePaginationChange}
        />
      </Box>
    </Box>
  );
};

export default ListPage;
