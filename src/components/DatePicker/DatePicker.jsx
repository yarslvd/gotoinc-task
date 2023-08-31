import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import 'dayjs/locale/uk';
import {useState} from "react";

export const DatePickerComponent = ({ control }) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value }, fieldState }) => (
            <DatePicker
              label="Date of dispatch"
              value={(value == undefined ? null : value)}
              onChange={onChange}
              sx={{ width: '100%' }}
              disablePast
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              textField={(inputProps) => (
                <TextField
                  {...inputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
        )}
      />
    </LocalizationProvider>
  )
}