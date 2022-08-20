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

export default function RHFSelect({ name, label, defaultValue,value, children, ...other }) {
  const { control } = useFormContext();
  const labelId = `${name}-label`;
  return (
    <FormControl control={control} style={{ marginLeft: '-2px' }} sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId} >{label}</InputLabel>
      <Controller
        render={({ field, fieldState: { error } }) => (
          <>
            <Select {...field} label={label} native labelId={labelId} value={value} {...other}>
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
