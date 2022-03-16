import React from 'react';
import { Control, useController } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormHelperText } from '@material-ui/core';

type RadioOption = {
  label: string;
  value: string | number;
};

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: RadioOption[];
  disable?: boolean;
}

export const RadioGroupField = ({
  name,
  control,
  label,
  options,
  disable,
}: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    formState: { isValid, errors },
  } = useController({ name, control });

  return (
    <FormControl
      fullWidth
      margin="normal"
      component="fieldset"
      error={!isValid && errors[name]?.message}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="gender" name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {!isValid && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
};
