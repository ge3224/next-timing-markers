import { assert, describe, it, beforeEach } from "vitest";
import {
  calculateMarkers,
  hoursToSeconds,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
} from "./conversions";
import { Time } from "./context/timing_context";

describe("hoursToSeconds", () => {
  it("should handle fractional hours", () => {
    assert.equal(hoursToSeconds(0.5), 1800);
    assert.equal(hoursToSeconds(1.5), 5400);
  });

  it("should handle negative numbers", () => {
    assert.equal(hoursToSeconds(-1), -3600);
    assert.equal(hoursToSeconds(-2.5), -9000);
  });

  it("should handle edge cases like very large numbers", () => {
    assert.equal(hoursToSeconds(1e6), 3600e6);
    assert.equal(hoursToSeconds(-1e6), -3600e6);
  });

  it("should return 0 when input is 0", () => {
    assert.equal(hoursToSeconds(0), 0);
  });

  it("should work with very small fractional hours", () => {
    assert.closeTo(hoursToSeconds(0.0001), 0.35, 2);
  });
});

describe("minutesToSeconds", () => {
  it("should correctly convert minutes to seconds", () => {
    assert.equal(minutesToSeconds(1), 60);
    assert.equal(minutesToSeconds(0), 0);
    assert.equal(minutesToSeconds(0.5), 30);
    assert.equal(minutesToSeconds(15), 900);
  });

  it("shold handle negative inputs", () => {
    assert.equal(minutesToSeconds(-1), -60);
    assert.equal(minutesToSeconds(-0.5), -30);
  });

  it("should handler large values", () => {
    assert.equal(minutesToSeconds(1e6), 60e6);
  });
});

describe("secondsToMinutes", () => {
  it("should correctly convert seconds to minutes", () => {
    assert.equal(secondsToMinutes(60), 1);
    assert.equal(secondsToMinutes(0), 0);
    assert.equal(secondsToMinutes(30), 0.5);
    assert.equal(secondsToMinutes(120), 2);
  });

  it("should handle negative numbers", () => {
    assert.equal(secondsToMinutes(-60), -1);
    assert.equal(secondsToMinutes(-30), -0.5);
  });

  it("should handle large values", () => {
    assert.equal(secondsToMinutes(60e6), 1e6);
  });
});

describe("secondsToHours", () => {
  it("should correctly convert seconds to hours", () => {
    assert.equal(secondsToHours(3600), 1);
    assert.equal(secondsToHours(0), 0);
    assert.equal(secondsToHours(1800), 0.5);
    assert.equal(secondsToHours(7200), 2);
  });

  it("should handle negative numbers", () => {
    assert.equal(secondsToHours(-3600), -1);
    assert.equal(secondsToHours(-1800), -0.5);
  });

  it("should handle large values", () => {
    assert.equal(secondsToHours(3600e6), 1e6);
  });
});

describe("calculateMarkers", () => {
  let total: Time;
  let introduction: Time;
  let conclusion: Time;
  let sections: number;

  beforeEach(() => {
    total = { hours: 1, minutes: 0, seconds: 0 };
    introduction = { hours: 0, minutes: 1, seconds: 30 };
    conclusion = { hours: 0, minutes: 1, seconds: 30 };
    sections = 20;
  });

  it("should return array starting with zero time", () => {
    const result = calculateMarkers(total, introduction, sections, conclusion);

    assert.equal(result[0].hours, 0);
    assert.equal(result[0].minutes, 0);
    assert.equal(result[0].seconds, 0);
  });

  it("should return array with introduction as the second element", () => {
    const result = calculateMarkers(total, introduction, sections, conclusion);

    assert.equal(result[1].hours, 0);
    assert.equal(result[1].minutes, 1);
    assert.equal(result[1].seconds, 30);
  });

  it("should return the correct number of markers", () => {
    const result = calculateMarkers(total, introduction, sections, conclusion);

    assert.equal(result.length, sections + 3);
  });

  it("should return the correct section markers for mock params", () => {
    const result = calculateMarkers(total, introduction, sections, conclusion);

    const tests: Array<Time> = [
      { hours: 0, minutes: 0, seconds: 0 },
      { hours: 0, minutes: 1, seconds: 30 },
      { hours: 0, minutes: 4, seconds: 21 },
      { hours: 0, minutes: 7, seconds: 12 },
      { hours: 0, minutes: 10, seconds: 3 },
      { hours: 0, minutes: 12, seconds: 54 },
      { hours: 0, minutes: 15, seconds: 45 },
      { hours: 0, minutes: 18, seconds: 36 },
      { hours: 0, minutes: 21, seconds: 27 },
      { hours: 0, minutes: 24, seconds: 18 },
      { hours: 0, minutes: 27, seconds: 9 },
      { hours: 0, minutes: 30, seconds: 0 },
      { hours: 0, minutes: 32, seconds: 51 },
      { hours: 0, minutes: 35, seconds: 42 },
      { hours: 0, minutes: 38, seconds: 33 },
      { hours: 0, minutes: 41, seconds: 24 },
      { hours: 0, minutes: 44, seconds: 15 },
      { hours: 0, minutes: 47, seconds: 6 },
      { hours: 0, minutes: 49, seconds: 57 },
      { hours: 0, minutes: 52, seconds: 48 },
      { hours: 0, minutes: 55, seconds: 39 },
      { hours: 0, minutes: 58, seconds: 30 },
      { hours: 1, minutes: 0, seconds: 0 },
    ];

    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i].hours, tests[i].hours);
      assert.equal(result[i].minutes, tests[i].minutes);
      assert.equal(result[i].seconds, tests[i].seconds);
    }
  });
});
