import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ListParams } from 'models';
import React, { ChangeEvent } from 'react';

type Props = {
  filter: ListParams;
  onSearchChange?: (newFilter: ListParams) => void;
};

const StudentFilters = ({ filter, onSearchChange }: Props) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onSearchChange) return;
    const newFilter = { ...filter, name_like: event.target.value };
    delete newFilter._page;
    onSearchChange(newFilter);
  };
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="student-filter-text">Amount</InputLabel>
      <OutlinedInput
        id="student-filter-text"
        onChange={handleSearchChange}
        endAdornment={<Search />}
        labelWidth={60}
      />
    </FormControl>
  );
};

export default StudentFilters;
