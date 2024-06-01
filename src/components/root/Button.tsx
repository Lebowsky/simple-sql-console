import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface ButtonSendProps{
  onClick(): void
}
export default function ButtonSend({onClick}: ButtonSendProps) {
  return (
    <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
      Send
    </Button>
  );
}