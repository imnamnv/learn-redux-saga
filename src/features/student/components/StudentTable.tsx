import {
  Box,
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

type Props = {
  studentList: Student[];
  cityMap: { [key: string]: City };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
};

const StudentTable = ({ studentList, cityMap, onEdit, onRemove }: Props) => {
  const [open, setOpen] = useState(false);
  const [studentSelected, setStudentSelected] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCLick = (student: Student) => {
    setOpen(true);

    setStudentSelected(student);
  };

  return (
    <>
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
                <TableCell>{cityMap[student.city]?.name}</TableCell>
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
                      handleRemoveCLick(student);
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

      {/* REMOVE STUDENT */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove "{studentSelected?.name}"<br />
            Can't undo <br />
            &apos; === '
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onRemove?.(studentSelected as Student);
              setOpen(false);
            }}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentTable;
