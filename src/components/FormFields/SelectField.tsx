import React from 'react';
import { Control, useController } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';

type SelectOption = {
  label: string;
  value: string | number;
};

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: SelectOption[];
  disable?: boolean;
}

export const SelectField = ({ name, control, label, options, disable }: SelectFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    formState: { isValid, errors },
  } = useController({ name, control });

  return (
    <FormControl
      fullWidth
      margin="normal"
      component="fieldset"
      variant="outlined"
      error={!isValid && errors[name]?.message}
    >
      <InputLabel id="filterByCity">{label}</InputLabel>
      <Select
        labelId="filterByCity"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label="Sort"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {!isValid && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
};
