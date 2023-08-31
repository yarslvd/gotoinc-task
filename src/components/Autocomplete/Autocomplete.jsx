import {TextField} from "@mui/material";

export const Autocomplete = () => {
  return(
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
      />
    </Autocomplete>
  )
}