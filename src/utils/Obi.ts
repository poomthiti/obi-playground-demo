import { Obi } from "@bandprotocol/bandchain.js";
import { ObiMode, TargetType } from ".";

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
      return getObiFunction[mode](targetString);
    case ObiMode.decodeInput:
    case ObiMode.decodeOutput:
      if (targetType === TargetType.base64 || targetType === TargetType.hex) {
        const buffer = Buffer.from(targetString, targetType);
        return getObiFunction[mode](buffer);
      } else {
        const buffer = Buffer.from(targetString, "utf-8");
        return getObiFunction[mode](buffer);
      }
  }
};
