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
    expect(getObiResult(payload)).toBe(
      JSON.stringify(
        {
          symbol: "BTC",
          px: 9000,
          w: { a: 1, b: 2 },
          tb: ["a", "b"],
        },
        (_, value) => (typeof value === "bigint" ? Number(value) : value),
        2
      )
    );
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

  test("should decode base64 result from BandChain's request crypto price correctly", () => {
    const payload = {
      schema: "{symbols:[string],multiplier:u64}/{rates:[u64]}",
      mode: ObiMode.decodeOutput,
      targetString: "AAAAAQAAAAAAAKTT",
      targetType: TargetType.base64,
    };
    expect(getObiResult(payload)).toBe(
      JSON.stringify(
        {
          rates: [42195n],
        },
        (_, value) => (typeof value === "bigint" ? Number(value) : value),
        2
      )
    );
  });
});
