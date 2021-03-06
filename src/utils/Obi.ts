import { Obi } from "@bandprotocol/bandchain.js";
import { ObiMode, TargetType } from ".";

const resultReturnHelper = (result: any) => {
  if (Buffer.isBuffer(result)) {
    return result.toString("hex");
  } else if (typeof result === "object") {
    return JSON.stringify(
      result,
      (_, value) => (typeof value === "bigint" ? Number(value) : value),
      2
    );
  } else {
    return result;
  }
};

interface ObiProps {
  schema: string;
  mode: ObiMode;
  targetString: string;
  targetType: TargetType;
}

export const getObiResult = ({
  schema,
  mode,
  targetString,
  targetType,
}: ObiProps) => {
  const obi = new Obi(schema);
  const getObiFunction = {
    [ObiMode.encodeInput]: (value: any) => obi.encodeInput(value),
    [ObiMode.encodeOutput]: (value: any) => obi.encodeOutput(value),
    [ObiMode.decodeInput]: (value: Buffer) => obi.decodeInput(value),
    [ObiMode.decodeOutput]: (value: Buffer) => obi.decodeOutput(value),
  };

  switch (mode) {
    case ObiMode.encodeInput:
    case ObiMode.encodeOutput:
      if (targetType === TargetType.json) {
        try {
          const target = JSON.parse(targetString);
          const result = getObiFunction[mode](target);
          return resultReturnHelper(result);
        } catch (err: any) {
          return err.message;
        }
      } else {
        try {
          const result = getObiFunction[mode](targetString);
          return resultReturnHelper(result);
        } catch (err: any) {
          return err.message;
        }
      }
    case ObiMode.decodeInput:
    case ObiMode.decodeOutput:
      if (targetType === TargetType.base64 || targetType === TargetType.hex) {
        try {
          const buffer = Buffer.from(targetString, targetType);
          const result = getObiFunction[mode](buffer);
          return resultReturnHelper(result);
        } catch (err: any) {
          return err.message;
        }
      } else {
        try {
          const buffer = Buffer.from(targetString, "utf-8");
          const result = getObiFunction[mode](buffer);
          return resultReturnHelper(result);
        } catch (err: any) {
          return err.message;
        }
      }
  }
};
