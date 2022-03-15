import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
type StudentFormProps = {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
};

const StudentForm = ({ initialValue, onSubmit }: StudentFormProps) => {
  const { control, handleSubmit } = useForm<Student>({ defaultValues: initialValue });

  const handleFormSubmit = (formValue: Student) => {
    if (!onSubmit) return;
    onSubmit(formValue);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="name" control={control} label="Name" />

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          CLICK
        </Button>
      </Box>
    </form>
  );
};

export default StudentForm;
