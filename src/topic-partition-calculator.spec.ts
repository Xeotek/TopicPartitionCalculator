import {
  calculateAdjustedMinimumConsumerCount,
  calculateAdjustedMinimumProducerCount,
  calculateLoadFactor,
  calculateMinimumConsumerCount,
  calculateMinimumProducerCount,
  calculatePartitionForTopicCount,
  calculateRecommendedNumberOfConsumers,
  calculateRecommendedNumberOfPartitions
} from "./topic-partition-calculator";

describe("TPC", () => {
  test("calculateMinimumProducerCount", () => {
    //ceiling(1000 m/s * 0.001 s/m / 0.8 / 0.99) = 2 MP
    expect(calculateMinimumProducerCount({ T: 1000, P: 0.001, L: 0.8, F: 0.99 })).toBe(2);

    //ceiling(1000 m/s * 0.1 s/m / 0.8 / 0.99) = 127 MP
    expect(calculateMinimumProducerCount({ T: 1000, P: 0.1, L: 0.8, F: 0.99 })).toBe(127);
  });

  test("calculateMinimumConsumerCount", () => {
    //ceiling(1000 m/s * 0.001 s/m / 0.8 / 0.99) = 2 MP
    expect(calculateMinimumConsumerCount({ T: 1000, C: 0.001, L: 0.8, F: 0.99 })).toBe(2);

    //ceiling(1000 m/s * 0.1 s/m / 0.8 / 0.99) = 127 MP
    expect(calculateMinimumConsumerCount({ T: 1000, C: 0.1, L: 0.8, F: 0.99 })).toBe(127);
  });
  test("calculateAdjustedMinimumProducerCount", () => {
    //((3 + 2 - 1) // 2) * 2 = 4
    expect(calculateAdjustedMinimumProducerCount({ T: 1000, P: 0.001, L: 0.8, F: 0.99, B: 2 })).toBe(4);

    //((3 + 5 - 1) // 5) * 5 = 5
    expect(calculateAdjustedMinimumProducerCount({ T: 1000, P: 0.002, L: 0.8, F: 0.99, B: 15 })).toBe(5);
  });

  test("calculateAdjustedMinimumConsumerCount", () => {
    //((3 + 2 - 1) // 2) * 2 = 4
    expect(calculateAdjustedMinimumConsumerCount({ T: 1000, C: 0.001, L: 0.8, F: 0.99, B: 2 })).toBe(4);

    expect(calculateAdjustedMinimumConsumerCount({ T: 1000, C: 0.002, L: 0.8, F: 0.99, B: 12 })).toBe(4);

    //((3 + 5 - 1) // 5) * 5 = 5
    expect(calculateAdjustedMinimumConsumerCount({ T: 1000, C: 0.002, L: 0.8, F: 0.99, B: 15 })).toBe(5);
  });

  test("calculateLoadFactor", () => {
    expect(calculateLoadFactor({ T: 2, C: 2 })).toBe(4);
  });

  test("calculatePartitionForTopicCount", () => {
    // B = 12, RMP = 4, RMC = 3 → 4
    expect(calculatePartitionForTopicCount({ T: 1000, P: 0.002, C: 0.001, L: 0.8, F: 0.99, B: 12 })).toBe(4);
  });

  test("calculateRecommendedNumberOfPartitions", () => {
    // small throughput -  0.00001
    expect(calculateRecommendedNumberOfPartitions({ T: 0.00001, P: 50, C: 1, B: 2 })).toBe(2);
    // medium throughput -  0.0003
    expect(calculateRecommendedNumberOfPartitions({ T: 0.0003, P: 50, C: 1, B: 3 })).toBe(3);
    // large throughput -  0.006
    expect(calculateRecommendedNumberOfPartitions({ T: 0.006, P: 50, C: 1, B: 3 })).toBe(3);
  });

  test("calculateRecommendedNumberOfConsumers", () => {
    // small throughput -  0.00001
    expect(calculateRecommendedNumberOfConsumers({ T: 0.00001, P: 50, C: 1, B: 2 })).toBe(2);
    // medium throughput -  0.0003
    expect(calculateRecommendedNumberOfConsumers({ T: 0.0003, P: 50, C: 1, B: 3 })).toBe(3);
    // large throughput -  0.006
    expect(calculateRecommendedNumberOfConsumers({ T: 0.006, P: 50, C: 1, B: 3 })).toBe(3);
  });
});
