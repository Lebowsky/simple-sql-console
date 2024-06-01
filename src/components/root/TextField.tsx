import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface SqlQueryParamsProps{
  host: string
  setHost(host: string): void
  baseName: string
  setBaseName(baseName: string): void
}

export default function SqlQueryParams({host, setHost, baseName, setBaseName}: SqlQueryParamsProps) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Host"
          id="outlined-size-small"
          defaultValue={host}
          size="small"
          onChange={e => setHost(e.target.value)}
        />
        <TextField
          label="Base name"
          id="outlined-size-small"
          defaultValue={baseName}
          size="small"
          onChange={e => setBaseName(e.target.value)}
        />
      </div>
    </Box>
  );
}