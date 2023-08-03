import { calculateMinimumProducerCount } from './topic-partition-calculator';

export interface TPCDataStreamInput {
  /** Load factor, default 0.8 */
  /** this is a ratio or proportion of the usage of the available resource capacity (cpu, network, etc..) */
  L: number;
  /** Failure tolerance, default 0.99 */
  /** this is the ratio of uptime that most companies use for their systems as it's mostly what cloud providers give their users. */
  F: number;
}


export interface TPCThroughputInput {
  /** Topic desired average throughput (m/s) */
  T: number;
}

export interface TPCProducerInput {
  /** Average producer processing time per message (s/m) */
  P: number;
}

export interface TPCConsumerInput {
  /** Average consumer processing time per message (s/m) */
  C: number;
}

export interface TPCBrokerInputs {
  /** Number of Kafka Brokers */
  B: number;
}

export interface TPCMinimumProducerInputs extends TPCDataStreamInput, TPCThroughputInput, TPCProducerInput {}

export interface TPCMinimumConsumerInputs extends TPCDataStreamInput, TPCThroughputInput, TPCConsumerInput {}

export interface TPCInputs {
  /** Topic desired average throughput (m/s) */
  T: number;
  /** Average producer processing time per message (s/m) */
  P: number;
  /** Average consumer processing time per message (s/m) */
  C: number;
  /** Number of Kafka Brokers */
  B: number;
}

export interface TPCIntermediateValues {
  /** Minimum number of producers to achieve T */
  MP: number;
  /** Minimum number of consumers to achieve T */
  MC: number;
  /** Adjusted MP as a multiple or divisor of B */
  RMP: number;
  /** Adjusted MC as a multiple or divisor of B */
  RMC: number;
}

export interface TPCOutputs {
  L: number;
  RP: number;
  RC: number;
  NP: number;
}
