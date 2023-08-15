// LEav
export interface TPCMinimumProducerInputs {
  L?: number;
  F?: number;
  T: number;
  P: number;
}

export interface TPCMinimumConsumerInputs {
  L?: number;
  F?: number;
  T: number;
  C: number;
}

export interface TPCAdjustedMinimumProducerInputs {
  L?: number;
  F?: number;
  T: number;
  P: number;
  B: number;
}

export interface TPCAdjustedMinimumConsumerInputs {
  L?: number;
  F?: number;
  T: number;
  C: number;
  B: number;
}

export interface TPCNumberOfPartitionsInputs {
  /** Load factor, default 0.8 */
  /** this is a ratio or proportion of the usage of the available resource capacity (cpu, network, etc.) */
  L?: number;
  /** Failure tolerance, default 0.99 */
  /** this is the ratio of uptime that most companies use for their systems as it's mostly what cloud providers give their users. */
  F?: number;
  /** Topic desired average throughput (m/s) */
  T: number;
  /** Average producer processing time per message (s/m) */
  P: number;
  /** Average consumer processing time per message (s/m) */
  C: number;
  /** Number of Kafka Brokers */
  B: number;
}

export interface TPCLoadFactorInputs {
  /** Topic desired average throughput (m/s) */
  T: number;
  /** Average consumer processing time per message (s/m) */
  C: number;
}
