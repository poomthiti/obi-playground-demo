import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { ObiMode, TargetType, getObiResult } from "../utils";
import { TextInput, RadioGroupInput, InputLabel } from "../components";

const Container = styled.div`
  width: 50%;
  height: 90%;
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex-direction: column;

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
  padding: 32px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  text-transform: capitalize;
  margin-top: 12px;
  min-width: 180px;

  :nth-of-type(2) {
    margin-left: 8px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ResultContainer = styled.div`
  width: auto;
  flex: 1;
  margin: 0 32px 32px 32px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #eee;
  font-weight: 600;
  font-size: 14px;
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
  { value: TargetType.json, label: "json" },
];

export const HomePage = () => {
  const [schema, setSchema] = useState<string>(
    "{symbol:string, px: u64, w: {a: u8, b: u8}, tb: [string]} / string"
  );
  const [obiMode, setObiMode] = useState<ObiMode>(ObiMode.encodeInput);
  const [targetType, setTargetType] = useState<TargetType>(TargetType.json);
  const [targetString, setTargetString] = useState<string>(
    `{"symbol": "BTC", "px": 9000, "w": { "a": 1, "b": 2 }, "tb": ["a", "b"]}`
  );
  const [result, setResult] = useState<string>("");

  const clearAll = () => {
    setSchema("");
    setObiMode(ObiMode.encodeInput);
    setTargetType(TargetType.base64);
    setTargetString("");
    setResult("");
  };

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
        <ButtonDiv>
          <StyledButton
            variant="contained"
            onClick={() => {
              const result = getObiResult({
                schema,
                mode: obiMode,
                targetString,
                targetType,
              });
              setResult(result);
            }}
          >
            Get Result
          </StyledButton>
          <StyledButton variant="outlined" onClick={() => clearAll()}>
            X Clear
          </StyledButton>
        </ButtonDiv>
      </Content>
      <InputLabel style={{ marginLeft: "32px" }}>
        {obiMode === ObiMode.encodeInput || obiMode === ObiMode.encodeOutput
          ? "Result (hex)"
          : "Result (any)"}
      </InputLabel>
      <ResultContainer>{result}</ResultContainer>
    </Container>
  );
};
