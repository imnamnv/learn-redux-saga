import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const InputField = ({ name, control, label, ...inputProps }: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    formState: { isValid, errors },
  } = useController({ name, control });

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={!isValid}
      helperText={errors.message}
      inputProps={inputProps}
    />
  );
};
