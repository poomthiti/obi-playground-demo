import { getObiResult, TargetType, ObiMode } from "../src/utils";

const schema =
  "{symbol:string, px: u64, w: {a: u8, b: u8}, tb: [string]} / string";

describe("Expect Obi custom function to work correctly", () => {
  test("should return encoded input correctly", () => {
    const payload = {
      schema,
      mode: ObiMode.encodeInput,
      targetString:
        '{"symbol": "BTC", "px": 9000, "w": { "a": 1, "b": 2 }, "tb": ["a", "b"]}',
      targetType: TargetType.json,
    };
    expect(getObiResult(payload)).toBe(
      "00000003425443000000000000232801020000000200000001610000000162"
    );
  });

  test("should return encoded output correctly", () => {
    const payload = {
      schema,
      mode: ObiMode.encodeOutput,
      targetString: "test",
      targetType: TargetType.string,
    };
    expect(getObiResult(payload)).toBe("0000000474657374");
  });

  test("should return decoded input correctly", () => {
    const payload = {
      schema,
      mode: ObiMode.decodeInput,
      targetString:
        "00000003425443000000000000232801020000000200000001610000000162",
      targetType: TargetType.hex,
    };
    expect(getObiResult(payload)).toBe({
      symbol: "BTC",
      px: 9000,
      w: { a: 1, b: 2 },
      tb: ["a", "b"],
    });
  });

  test("should return decoded output correctly", () => {
    const payload = {
      schema,
      mode: ObiMode.decodeOutput,
      targetString: "0000000474657374",
      targetType: TargetType.hex,
    };
    expect(getObiResult(payload)).toBe("test");
  });
});
