import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { ObiMode, TargetType, getObiResult } from "../utils";
import { TextInput, RadioGroupInput } from "../components";

const Container = styled.div`
  width: 50%;
  height: 90%;
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid black;

  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const Title = styled(Typography)`
  border-bottom: 1px solid black;
  font-size: 20px;
  font-weight: 600;
  padding: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  text-transform: capitalize;
`;

interface RadioObject {
  value: any;
  label: string;
}

const modeRadioArr: RadioObject[] = [
  { value: ObiMode.encodeInput, label: "Encode Input" },
  { value: ObiMode.encodeOutput, label: "Encode Output" },
  { value: ObiMode.decodeInput, label: "Decode Input" },
  { value: ObiMode.decodeOutput, label: "Decode Output" },
];
const typeRadioArr: RadioObject[] = [
  { value: TargetType.base64, label: "base64" },
  { value: TargetType.hex, label: "hex" },
  { value: TargetType.string, label: "string" },
];

export const HomePage = () => {
  const [schema, setSchema] = useState<string>(
    "{symbol:string, px: u64, w: {a: u8, b: u8}, tb: [string]} / string"
  );
  const [obiMode, setObiMode] = useState<ObiMode>(ObiMode.encodeInput);
  const [targetType, setTargetType] = useState<TargetType>(TargetType.base64);
  const [targetString, setTargetString] = useState<string>("");

  console.log({ schema, obiMode, targetType, targetString });
  return (
    <Container>
      <Title>OBI Playground</Title>
      <Content>
        <TextInput
          label="Schema"
          testId="input-schema"
          value={schema}
          handleChange={(value: string) => setSchema(value)}
        />
        <RadioGroupInput
          dataArray={modeRadioArr}
          groupLabel="Obi Mode"
          handleChange={(value: ObiMode) => setObiMode(value)}
          formValue={obiMode}
        />
        <RadioGroupInput
          dataArray={typeRadioArr}
          groupLabel="String type"
          handleChange={(value: TargetType) => setTargetType(value)}
          formValue={targetType}
        />
        <TextInput
          label={
            obiMode === ObiMode.encodeInput || obiMode === ObiMode.encodeOutput
              ? "String to encode"
              : "String to decode"
          }
          testId="input-target-string"
          value={targetString}
          handleChange={(value: any) => setTargetString(value)}
        />
        <StyledButton variant="contained">Get Result</StyledButton>
      </Content>
    </Container>
  );
};
