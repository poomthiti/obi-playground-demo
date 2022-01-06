import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FieldContainer, InputLabel } from ".";

const CustomFormControlLabel = styled(FormControlLabel)`
  margin-left: 0;
  font-size: 12px;

  & .MuiFormControlLabel-label {
    font-weight: 600;
    font-size: 14px;
  }
`;
interface RadioObject {
  value: any;
  label: string;
}

interface RadioProps {
  dataArray: RadioObject[];
  handleChange: (value: any) => void;
  groupLabel: string;
  formValue: string;
}

export const RadioGroupInput = ({
  dataArray,
  handleChange,
  groupLabel,
  formValue,
}: RadioProps) => {
  return (
    <FieldContainer>
      <FormControl component="fieldset">
        <InputLabel>{groupLabel}</InputLabel>
        <RadioGroup
          row
          aria-label={groupLabel}
          name="row-radio-buttons-group"
          value={formValue}
          onChange={(event) => handleChange(event.target.value)}
        >
          {dataArray.map((item) => (
            <CustomFormControlLabel
              value={item.value}
              label={item.label}
              control={
                <Radio size="small" sx={{ padding: 0, marginRight: "4px" }} />
              }
              key={item.value}
              id={item.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FieldContainer>
  );
};
