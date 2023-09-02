import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {setCurrData} from "@/redux/features/slices";

import { useSelector, useDispatch } from "react-redux";

import {setData} from "@/redux/features/slices";

export const TableBodyComponent = ({ toggle, columns}) => {
  const state = useSelector(state => state.table);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    if(confirm('Do you really want to delete request?')) {
      const data = [...state.data];
      data.splice(index, 1);
      dispatch(setData(data));
      localStorage.setItem('parcels', JSON.stringify(data));
    }
  }

  const handleEdit = (index) => {
    dispatch(setCurrData({...state.data[index], index: index}));
    toggle();
  }

  return(
    <>
      <TableBody>
        {
          state.data && state.data.map((el, index) => (
            <TableRow key={index} sx={{ position: 'relative' }}>
              {
                columns.map(({accessor}) => (
                  <TableCell key={accessor}>{el[accessor] || '-'}</TableCell>
                ))
              }
              <TableCell>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <IconButton aria-label="delete" onClick={() => handleEdit(index)} sx={{ display: 'flex', gap: '5px', height: '100%' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </>
  )
}