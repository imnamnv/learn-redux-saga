import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
type StudentFormProps = {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Enter name')
    .test('two-word', 'Enter 2 word', (value) => {
      if (!value) return true;
      return value.split(' ').filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup.number().required('Enter number').positive('>0').typeError('Enter right number'),
  mark: yup.number().required('Enter mark').typeError('Enter right number'),
  gender: yup.string().required('Enter gender').oneOf(['male', 'female'], 'select gender'),
  city: yup.string().required('Select a city'),
});

const StudentForm = ({ initialValue, onSubmit }: StudentFormProps) => {
  const history = useHistory();
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValue: Student) => {
    if (!onSubmit) return;
    try {
      setError('');
      await onSubmit(formValue);
      history.push('/admin/students');
    } catch (error) {
      if (error instanceof Error) {
        setError(error?.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="name" control={control} label="Name" />
      <InputField name="age" control={control} label="Age" type={'number'} />
      <InputField name="mark" control={control} label="Mark" type={'number'} />

      <RadioGroupField
        name="gender"
        control={control}
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
      />
      {Array.isArray(cityOptions) && cityOptions.length > 0 && (
        <SelectField name="city" control={control} label="City" options={cityOptions} />
      )}

      <Typography color="secondary">{error}</Typography>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting && <CircularProgress size={16} />} &nbsp;CLICK
        </Button>
      </Box>
    </form>
  );
};

export default StudentForm;
