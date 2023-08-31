"use client"
import {useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {TextField, FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Loading from "@/app/loading";
import {DatePickerComponent} from "@/components/DatePicker/DatePicker";

import styles from './index.module.scss';

export const Form = () => {
  let autocompleteRef = useRef(null);
  const [type, setType] = useState("");

  const { register, handleSubmit, control } = useForm();

  const pathname = usePathname();
  const router = useRouter();

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
      description: data.description
    }

    const arr = JSON.parse(localStorage.getItem('parcels'));
    arr.push(obj);
    localStorage.setItem('parcels', JSON.stringify(arr));

    router.push('/requests');
  }

  return(
    <>
      {
        isLoaded ?
          <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                  <h1>Order request</h1>
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
                    />
                  </Autocomplete>

                  {
                    pathname === '/create/order' &&
                    <FormControl fullWidth >
                      <InputLabel id="parcel-type">Type of parcel</InputLabel>
                      <Select
                        labelId="parcel-type"
                        id="parcel-type"
                        value={type}
                        label="Type of parcel"
                        onChange={(e) => setType(e.target.value)}
                        inputProps={register('type')}
                        required
                      >
                        <MenuItem value='Gadgets'>Gadgets</MenuItem>
                        <MenuItem value='Drinks'>Drinks</MenuItem>
                        <MenuItem value='Clothes'>Clothes</MenuItem>
                        <MenuItem value='Medicines'>Medicines</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                      </Select>
                    </FormControl>
                  }

                  <DatePickerComponent control={control} />

                  {
                    pathname === '/create/order' &&
                    <TextField
                      label="Parcel description"
                      multiline
                      rows={5}
                      maxRows={5}
                      {...register("description")}
                    />
                  }
                </div>
                <IconButton variant="contained" type='submit' className={styles.button}>
                  <ArrowForwardIcon />
                </IconButton>
              </form>
          </div>  :
          <Loading />
      }
    </>
  )
}