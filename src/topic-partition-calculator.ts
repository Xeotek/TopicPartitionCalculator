import {
  TPCAdjustedMinimumConsumerInputs,
  TPCAdjustedMinimumProducerInputs,
  TPCLoadFactorInputs,
  TPCMinimumConsumerInputs,
  TPCMinimumProducerInputs,
  TPCNumberOfPartitionsInputs
} from './topic-partition-calculator.models';

/**
 * - Minimum number of producers to achieve T
 * Calculates the minimum number of producers needed to achieve the
 * desired throughput. -> MP
 * */
export function calculateMinimumProducerCount({ T, P, L = 0.8, F = 0.99 }: TPCMinimumProducerInputs): number {
  /** ceiling(T * P / L / F) */
  return Math.ceil((T * P) / L / F);
}

/**
 * - Minimum number of consumers to achieve T
 * Calculates the minimum number of consumers needed to achieve the
 * desired throughput. -> MC
 * */
export function calculateMinimumConsumerCount({ T, C, L, F }: TPCMinimumConsumerInputs): number {
  /** ceiling(T * C / L / F) */
  return calculateMinimumProducerCount({ T, P: C, L, F });
}

/**
 * - Adjusted MP as a multiple or divisor of B (Brokers)
 * */
export function calculateAdjustedMinimumProducerCount({
  T,
  P,
  L = 0.8,
  F = 0.99,
  B
}: TPCAdjustedMinimumProducerInputs): number {
  const MP = calculateMinimumProducerCount({ T, P, L, F });
  /** MC / L / F -> RMP’ */
  const MPPrime = Math.ceil(MP / L / F);

  if (MPPrime >= B) {
    /** ((RMP’ + B - 1) // B) * B */
    return Math.floor((MPPrime + B - 1) / B) * B;
  } else {
    let newMpPrime = MPPrime;
    let mod = B % newMpPrime;
    while (mod !== 0) {
      newMpPrime += 1;
      mod = B % newMpPrime;
    }
    return newMpPrime;
  }
}

/**
 * - Adjusted MC as a multiple or divisor of B (Brokers)
 * */
export function calculateAdjustedMinimumConsumerCount({ T, C, L, F, B }: TPCAdjustedMinimumConsumerInputs): number {
  return calculateAdjustedMinimumProducerCount({ T, P: C, L, F, B });
}

/**
 * - Expected lag on the topic
 * */
export function calculateLoadFactor({ T, C }: TPCLoadFactorInputs): number {
  // L → T * C
  return T * C;
}

/**
 * - Number of partition on the topic
 * */
export function calculatePartitionForTopicCount({ T, P, C, L, F, B }: TPCNumberOfPartitionsInputs): number {
  const RMP = calculateAdjustedMinimumProducerCount({ T, P, L, F, B });

  const RMC = calculateAdjustedMinimumConsumerCount({ T, C, L, F, B });

  const min = Math.min(RMC, RMP);
  const max = Math.max(RMC, RMP);
  let NPPrime1 = min;
  let multiple = 2;
  while (NPPrime1 < max) {
    NPPrime1 = min * multiple;
    multiple++;
  }

  const NPPrime3 = NPPrime1 - max;
  const NPPrime4 = max - min;
  if (NPPrime4 < NPPrime3) return max;
  if (NPPrime4 > NPPrime3) return NPPrime1;
  return min;
}

export function calculateRecommendedNumberOfPartitions({
  T,
  P,
  L = 0.8,
  F = 0.99,
  B,
  C
}: TPCNumberOfPartitionsInputs): number {
  /** mod(max(RMP, NP), min(RMP, NP)) */
  const RMP = calculateAdjustedMinimumProducerCount({ T, P, L, F, B });
  const NP = calculatePartitionForTopicCount({ T, P, C, L, F, B });
  const result = Math.max(RMP, NP) % Math.min(RMP, NP);
  return result === 0 ? RMP : NP;
}

export function calculateRecommendedNumberOfConsumers({
  T,
  P,
  L = 0.8,
  F = 0.99,
  B,
  C
}: TPCNumberOfPartitionsInputs): number {
  /** mod(max(RMP, NP), min(RMP, NP)) */
  const RMC = calculateAdjustedMinimumConsumerCount({ T, C, L, F, B });
  const NP = calculatePartitionForTopicCount({ T, P, C, L, F, B });
  const result = Math.max(RMC, NP) % Math.min(RMC, NP);
  return result === 0 ? RMC : NP;
}
