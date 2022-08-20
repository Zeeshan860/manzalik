import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextareaAutosize,FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextArea.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextArea({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextareaAutosize
            {...field}
            aria-label="empty textarea"
            minRows={3}
            style={{ width: 200 }}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            helperText={error?.message}
            {...other}
          />
          <FormHelperText error variant="filled">
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}
