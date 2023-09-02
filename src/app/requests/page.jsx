"use client"
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Table, TableContainer, Paper} from '@mui/material';

import {TableHeadComponent} from "@/components/Table/TableHead/TableHead";
import {TableBodyComponent} from "@/components/Table/TableBody/TableBody";
import Loading from "@/app/loading";

import { setData, setSortField, setOrder } from "@/redux/features/slices";

import styles from './index.module.scss';
import {EditModal} from "@/components/EditModal/EditModal";
import useModal from "@/hooks/useModal";

const Requests = () => {
  const {isOpen, toggle} = useModal();
  const state = useSelector(state => state.table);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem('parcels');
    if (storedData) {
      dispatch(setData(JSON.parse(storedData)));
    }
  }, []);

  const columns = [
    { label: "Request type", accessor: "req_type", sortable: true },
    { label: "Origin city", accessor: "origin", sortable: true },
    { label: "Destination city", accessor: "destination", sortable: true },
    { label: "Type of parcel", accessor: "type", sortable: false },
    { label: "Date of dispatch", accessor: "date", sortable: true },
    { label: "Parcel description", accessor: "description", sortable: false },
    { label: 'Creation date', accessor: "creation_date", sortable: true }
  ];

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === state.sortField && state.order === "asc" ? "desc" : "asc";

    dispatch(setSortField(accessor));
    dispatch(setOrder(sortOrder));
    handleSorting(accessor, sortOrder);
  }

  const handleSorting = (field, sortOrder) => {
    if(field) {
      const data = state.data;
      const sorted = [...data].sort((a, b) => {
        if (a[field] === null) return 1;
        if (b[field] === null) return -1;
        if (a[field] === null && b[field] === null) return 0;
        console.log(a[field]);
        return (
          a[field].toString().localeCompare(b[field].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      dispatch(setData(sorted))
    }
  }

  return(
    <div className={styles.container}>
      <h1>Requests</h1>
      {
        state.data ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="Parcels table">
              <TableHeadComponent columns={columns} handleSortingChange={handleSortingChange} />
              <TableBodyComponent columns={columns} toggle={toggle} />
            </Table>
          </TableContainer>
        : <Loading />
      }
      <EditModal isOpen={isOpen} toggle={toggle} />
    </div>
  )
}

export default Requests;