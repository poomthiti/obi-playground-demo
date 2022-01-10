import { TextField } from "@mui/material";
import { FieldContainer, InputLabel } from ".";

interface InputProps {
  testId: string;
  value: any;
  handleChange: (value: any) => void;
  label: string;
  placeholder?: string;
}

export const TextInput = ({
  testId,
  value,
  handleChange,
  label,
  placeholder = "",
}: InputProps) => {
  return (
    <FieldContainer>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={testId}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        value={value}
        color="primary"
        inputProps={{
          style: {
            padding: "8px 10px",
            fontSize: 14,
            height: "auto",
            fontWeight: 600,
          },
        }}
        sx={{ [`& fieldset`]: { borderRadius: "6px" } }}
        onChange={(event) => handleChange(event.target.value)}
      />
    </FieldContainer>
  );
};
