import * as React from 'react';
// import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useDispatch, useSelector } from 'react-redux';
// import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { hideMessage } from '../../store/reducers/messageSlice';

export default function Notification() {
  const { notification } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={3500}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={() => {
        dispatch(hideMessage());
      }}
    >
      <Alert
        onClose={() => dispatch(hideMessage())}
        sx={{ width: '100%' }}
        severity={notification.type}
      >
        <AlertTitle>{notification.type.toUpperCase()}</AlertTitle>
        {notification.content}
      </Alert>
    </Snackbar>
  );
}
