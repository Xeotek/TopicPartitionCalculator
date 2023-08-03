import { TPCMinimumConsumerInputs, TPCMinimumProducerInputs } from './topic-partition-calculator.models';

/**
 * - Minimum number of producers to achieve T
 * Calculates the minimum number of producers needed to achieve the
 * desired throughput. -> MP
 * */
export function calculateMinimumProducerCount({T, P, L, F}: TPCMinimumProducerInputs): number {
  /** ceiling(T * P / L / F) */
  return Math.ceil((T * P) / L / F);
}

/**
 * - Minimum number of consumers to achieve T
 * Calculates the minimum number of consumers needed to achieve the
 * desired throughput. -> MC
 * */
export function calculateMinimumConsumersCount({T, C, L, F}: TPCMinimumConsumerInputs): number {
  /** ceiling(T * C / L / F) */
  return Math.ceil((T * C) / L / F);
}

/**
 * - Adjusted MP as a multiple or divisor of B (Brokers)
 * */
export function calculateAdjustedMinimumConsumersCount({T, C, L, F}: TPCMinimumConsumerInputs): number {
  /** ceiling(T * C / L / F) */
  return Math.ceil((T * C) / L / F);
}
