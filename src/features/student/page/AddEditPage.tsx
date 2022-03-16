import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

import yup from 'yup';

type Props = {};

const AddEditPage = (props: Props) => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    (async () => {
      if (!Boolean(studentId)) return;
      const data = await studentApi.getById(studentId);
      setStudent(data);
    })();
  }, [studentId]);

  console.log('student', student);

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValue: Student) => {
    console.log('formValue', formValue);

    if (isEdit) {
      await studentApi.update(formValue);
    } else {
      await studentApi.add(formValue);
    }
  };

  return (
    <Box>
      <Link to={'/admin/students'}>
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> &nbsp; Back to students page
        </Typography>
      </Link>

      <Typography variant="h4">{!isEdit ? 'Add' : 'Edit'}</Typography>

      {/* FORM */}
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage;
