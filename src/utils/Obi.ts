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
    [ObiMode.encodeInput]: obi.encodeInput,
    [ObiMode.encodeOutput]: obi.encodeOutput,
    [ObiMode.decodeInput]: obi.decodeInput,
    [ObiMode.decodeOutput]: obi.decodeOutput,
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
