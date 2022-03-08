import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Student } from 'models';
import { capitalizeString, getMarkColor } from 'utils';

type Props = {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
};

const StudentTable = ({ studentList, onEdit, onRemove }: Props) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList?.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell>
                <Box fontWeight="bold" color={getMarkColor(student.mark)}>
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    onEdit?.(student);
                  }}
                  style={{ marginRight: 8 }}
                  size="small"
                >
                  Update
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    onRemove?.(student);
                  }}
                  size="small"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
