export interface TPCDataStreamInput {
  /** Load factor, default 0.8 */
  /** this is a ratio or proportion of the usage of the available resource capacity (cpu, network, etc..) */
  L?: number;
  /** Failure tolerance, default 0.99 */
  /** this is the ratio of uptime that most companies use for their systems as it's mostly what cloud providers give their users. */
  F?: number;
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

export interface TPCAdjustedMinimumProducerInputs
  extends TPCDataStreamInput,
    TPCThroughputInput,
    TPCProducerInput,
    TPCBrokerInputs {}

export interface TPCAdjustedMinimumConsumerInputs
  extends TPCDataStreamInput,
    TPCThroughputInput,
    TPCConsumerInput,
    TPCBrokerInputs {}

export type TPCNumberOfPartitionsInputs = TPCAdjustedMinimumProducerInputs & TPCAdjustedMinimumConsumerInputs;

export interface TPCLoadFactorInputs extends TPCThroughputInput, TPCConsumerInput {}
