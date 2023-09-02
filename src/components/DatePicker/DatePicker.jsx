import dayjs from "dayjs";
import 'dayjs/locale/uk';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

dayjs.extend(customParseFormat)

export const DatePickerComponent = ({ control, date }) => {
  const parsedDate = dayjs(date, 'DD/MM/YYYY');

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Controller
        control={control}
        name="date"
        defaultValue={parsedDate.isValid() ? parsedDate : dayjs(new Date())}
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