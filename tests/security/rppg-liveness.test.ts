/**
 * rPPG liveness regressions retained from the former mixed WebAuthn suite.
 */

import { describe, expect, it } from "vitest";

type DegradedFlags = {
  lowLight: boolean;
  highCompression: boolean;
  motionBlur: boolean;
};

type LivenessResult = {
  verdict: "live" | "spoof" | "inconclusive";
  reason?: string;
};

function classifyLiveness(
  heartRate: number,
  quality: number,
  degradedFlags: DegradedFlags,
): LivenessResult {
  const activeDegradedCount = Object.values(degradedFlags).filter(Boolean).length;

  if (heartRate > 0 && (heartRate < 30 || heartRate > 220)) {
    return {
      verdict: "spoof",
      reason: `Physiologically inconsistent signal detected (HR: ${Math.round(heartRate)} bpm)`,
    };
  }

  if (heartRate === 0 && quality === 0 && activeDegradedCount >= 2) {
    return { verdict: "inconclusive", reason: "Multiple degradation factors" };
  }

  if (heartRate === 0 && quality === 0) {
    return { verdict: "spoof", reason: "No physiological pulse detected" };
  }

  if (quality < 0.15 && activeDegradedCount > 0) {
    return { verdict: "inconclusive", reason: "Signal quality too low" };
  }

  if (quality < 0.15) {
    return { verdict: "spoof", reason: "Signal below expected threshold" };
  }

  if (quality < 0.3 && activeDegradedCount > 0) {
    return { verdict: "inconclusive", reason: "Liveness analysis partially degraded" };
  }

  return { verdict: "live" };
}

describe("Low-Quality rPPG Handling", () => {
  it("returns inconclusive for low quality caused by compression", () => {
    const result = classifyLiveness(0, 0.05, {
      lowLight: false,
      highCompression: true,
      motionBlur: false,
    });

    expect(result.verdict).toBe("inconclusive");
    expect(result.reason).toBeDefined();
  });

  it("returns inconclusive for low light and compression", () => {
    const result = classifyLiveness(0, 0.05, {
      lowLight: true,
      highCompression: true,
      motionBlur: false,
    });

    expect(result.verdict).toBe("inconclusive");
  });

  it("returns spoof for a flat signal without degradation", () => {
    const result = classifyLiveness(0, 0, {
      lowLight: false,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("spoof");
  });

  it.each([250, 15])("returns spoof for impossible heart rate %s", (heartRate) => {
    const result = classifyLiveness(heartRate, 0.8, {
      lowLight: false,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("spoof");
  });

  it("returns live for a normal heart rate with good quality", () => {
    const result = classifyLiveness(72, 0.8, {
      lowLight: false,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("live");
  });

  it("returns inconclusive for multiple degradation factors", () => {
    const result = classifyLiveness(0, 0, {
      lowLight: true,
      highCompression: true,
      motionBlur: true,
    });

    expect(result.verdict).toBe("inconclusive");
  });

  it("returns inconclusive for borderline quality with degradation", () => {
    const result = classifyLiveness(60, 0.2, {
      lowLight: true,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("inconclusive");
  });
});

describe("High-Quality Deepfake rPPG Edge Cases", () => {
  function classifyWithFrameCount(
    heartRate: number,
    quality: number,
    frameCount: number,
    minFrames: number,
    degradedFlags: DegradedFlags,
  ): LivenessResult {
    if (frameCount < minFrames) {
      return { verdict: "inconclusive", reason: "Insufficient frames" };
    }

    const result = classifyLiveness(heartRate, quality, degradedFlags);
    if (
      result.verdict === "live" &&
      quality >= 0.5 &&
      heartRate >= 40 &&
      heartRate <= 150 &&
      Object.values(degradedFlags).some(Boolean)
    ) {
      return {
        verdict: "inconclusive",
        reason: "Physiological data partially degraded — manual review recommended",
      };
    }

    return result;
  }

  it("flags plausible heart rate with compression as inconclusive", () => {
    const result = classifyWithFrameCount(72, 0.7, 150, 100, {
      lowLight: false,
      highCompression: true,
      motionBlur: false,
    });

    expect(result.verdict).toBe("inconclusive");
    expect(result.reason).toContain("degraded");
  });

  it("passes a clean live signal as live", () => {
    const result = classifyWithFrameCount(72, 0.7, 150, 100, {
      lowLight: false,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("live");
  });

  it("flags plausible heart rate with motion artifacts as inconclusive", () => {
    const result = classifyWithFrameCount(68, 0.65, 150, 100, {
      lowLight: false,
      highCompression: false,
      motionBlur: true,
    });

    expect(result.verdict).toBe("inconclusive");
  });

  it("flags multiple subtle degradation signals as inconclusive", () => {
    const result = classifyWithFrameCount(75, 0.55, 150, 100, {
      lowLight: false,
      highCompression: true,
      motionBlur: true,
    });

    expect(result.verdict).toBe("inconclusive");
  });

  it("requires a minimum frame count", () => {
    const result = classifyWithFrameCount(72, 0.8, 30, 100, {
      lowLight: false,
      highCompression: false,
      motionBlur: false,
    });

    expect(result.verdict).toBe("inconclusive");
    expect(result.reason).toBe("Insufficient frames");
  });
});
