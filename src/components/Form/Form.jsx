"use client"
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import {TextField, FormControl, InputLabel, MenuItem, Select, IconButton, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

import {DatePickerComponent} from "@/components/DatePicker/DatePicker";
import Loading from "@/app/loading";

import {setCurrData, setData} from "@/redux/features/slices";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import styles from './index.module.scss';

export const Form = ({ toggle }) => {
  let autocompleteRef = useRef(null);

  const { register, handleSubmit, control } = useForm();

  const data = useSelector(state => state.table);
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if(pathname !== '/requests') {
      dispatch(setCurrData(null));
    }
  }, []);

  const options = {
    fields: ["address_components", "geometry"],
    types: ["address"],
    strictBounds: false,
    language: "en",
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ["places"]
  });

  const handlePlaceChange = () => {
    const place = autocompleteRef.current.getPlace();
    console.log(place);
  }

  const onSubmit = (data) => {
    if(!localStorage['parcels']) {
      localStorage.setItem('parcels', JSON.stringify([]));
    }

    const obj = {
      origin: data.origin,
      destination: data.destination,
      type: data.type,
      date: data.date.$d.toLocaleDateString("en-GB"),
      description: data.description,
    }

    if(pathname === '/requests') {
      handleEditSave(obj);
      toggle();
    }
    else {
      obj.creation_date = new Date().toLocaleDateString("en-GB");
      obj.req_type = pathname === '/create/order' ? 'order' : 'delivery'

      const arr = JSON.parse(localStorage.getItem('parcels'));
      arr.push(obj);
      localStorage.setItem('parcels', JSON.stringify(arr));

      router.push('/requests');
    }
  }

  const handleEditSave = (obj) => {
    obj.req_type = data.currData.req_type;
    obj.creation_date = data.currData.creation_date;

    const initialData = [...data.data];
    const index = data.currData.index;

    initialData.splice(index, 1, obj);
    dispatch(setData(initialData));

    localStorage.setItem('parcels', JSON.stringify(initialData));
  }

  return(
    <>
      {
        isLoaded ?
          <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)} style={pathname === '/requests' ? { flexDirection: 'column' } : null}>
                <div className={styles.fields}>
                  {
                    (pathname === '/create/order' || pathname === '/create/delivery') &&
                    <h1>Create request</h1>
                  }
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handlePlaceChange}
                    options={options}
                  >
                    <TextField
                      id="origin"
                      label="Origin address"
                      variant="outlined"
                      style={{ width: '100%' }}
                      required
                      {...register("origin")}
                      defaultValue={data.currData?.origin || ''}
                    />
                  </Autocomplete>

                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handlePlaceChange}
                    options={options}
                  >
                    <TextField
                      id="destination"
                      label="Destination address"
                      variant="outlined"
                      style={{ width: '100%' }}
                      required
                      {...register("destination")}
                      defaultValue={data.currData?.destination || ''}
                    />
                  </Autocomplete>

                  {
                    (pathname === '/create/order' || (pathname === '/requests' && data.currData.req_type === 'order')) &&
                    <FormControl fullWidth >
                      <InputLabel id="parcel-type">Type of parcel</InputLabel>
                      <Select
                        labelId="parcel-type"
                        id="parcel-type"
                        label="Type of parcel"
                        inputProps={register('type')}
                        required
                        defaultValue={data.currData?.type || ''}
                      >
                        <MenuItem value='Gadgets'>Gadgets</MenuItem>
                        <MenuItem value='Drinks'>Drinks</MenuItem>
                        <MenuItem value='Clothes'>Clothes</MenuItem>
                        <MenuItem value='Medicines'>Medicines</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                      </Select>
                    </FormControl>
                  }

                  <DatePickerComponent control={control} date={data.currData?.date} />

                  {
                    (pathname === '/create/order' || (pathname === '/requests' && data.currData.req_type === 'order')) &&
                    <TextField
                      label="Parcel description"
                      multiline
                      rows={5}
                      maxRows={5}
                      {...register("description")}
                      defaultValue={data.currData?.description || ''}
                    />
                  }
                </div>
                {
                  (pathname === '/create/order' || pathname === '/create/delivery') &&
                  <IconButton variant="contained" type='submit' className={styles.button}>
                    <ArrowForwardIcon />
                  </IconButton>
                }
                {
                  pathname === '/requests' &&
                  <Button variant='contained' type='submit' className={styles.buttonEdit}>
                    Save
                  </Button>
                }
              </form>
          </div>  :
          <Loading />
      }
    </>
  )
}