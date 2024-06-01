import { TextField } from '@mui/material';

interface SqlQueryTextProps {
  defaultValue: string
  onChange(text: string): void
}
export default function SqlQueryText({defaultValue, onChange} : SqlQueryTextProps) {
  return (
    <TextField fullWidth multiline rows={4} placeholder='SQL text here' defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
  );
}