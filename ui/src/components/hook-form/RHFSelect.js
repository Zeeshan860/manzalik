import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
};

export default function RHFSelect({ name, label, defaultValue, value, execfunction, children, ...other }) {
  const { control } = useFormContext();
  const labelId = `${name}-label`;
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId} >{label}</InputLabel>
      <Controller
        render={({ field, fieldState: { error } }) => (
          <>
            <Select 
            label={label} 
            labelId={labelId} 
            value={value} {...field} {...other}
            onChange={(e)=> {
              field.onChange(e)
              execfunction(e)
            }}
            >
              {children}
            </Select>
            <FormHelperText error variant="filled">
              {error?.message}
            </FormHelperText>
          </>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}
