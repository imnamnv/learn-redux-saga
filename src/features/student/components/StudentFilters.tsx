import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

type Props = {
  filter: ListParams;
  cityList: City[];
  onSearchChange?: (newFilter: ListParams) => void;
  onChange?: (newFilter: ListParams) => void;
};

const StudentFilters = ({ filter, cityList, onChange, onSearchChange }: Props) => {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onSearchChange) return;
    const newFilter = { ...filter, _page: 1, name_like: event.target.value };
    onSearchChange(newFilter);
  };

  const handleFilterChange = (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    if (!onChange) return;

    const newFilter = { ...filter, _page: 1, city: event.target.value || undefined };
    onChange(newFilter);
  };

  const handleSortChange = (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    if (!onChange) return;

    const value = event.target.value;

    const [_sort, _order] = (value as string).split('.');

    const newFilter = {
      ...filter,
      _order: (_order as 'asc' | 'desc') || undefined,
      _sort: _sort || undefined,
    };

    onChange(newFilter);
  };

  const handleClear = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _order: undefined,
      _sort: undefined,
      name_like: undefined,
      city: undefined,
    };

    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="student-filter-text">Search by name</InputLabel>
            <OutlinedInput
              id="student-filter-text"
              onChange={handleSearchChange}
              endAdornment={<Search />}
              labelWidth={60}
              label="Search by name"
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-simple-select-outlined"
              value={filter.city || ''}
              onChange={handleFilterChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="filterByCity">Sort</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-simple-select-outlined"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button fullWidth variant="contained" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentFilters;
