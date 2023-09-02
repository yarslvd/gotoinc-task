import {TableHead, TableRow, TableCell, TableSortLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

export const TableHeadComponent = ({handleSortingChange, columns}) => {
  const state = useSelector(state => state.table);

  return(
    <>
      <TableHead>
        <TableRow>
          {
            columns.map(({ label, accessor, sortable }) => {
              return (
                <TableCell key={accessor}>
                  <TableSortLabel
                    active={accessor === state.sortField}
                    direction={accessor === state.sortField && state.order === "asc" ? "desc" : "asc"}
                    onClick={sortable ? () => handleSortingChange(accessor) : null}
                    hideSortIcon={!sortable}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              )
            })
          }
          <TableCell>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  )
}