/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Xeotek GmbH. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export {
  calculateRecommendedNumberOfConsumers,
  calculateRecommendedNumberOfPartitions,
  calculateLoadFactor,
  calculatePartitionForTopicCount
} from './topic-partition-calculator';
export { TPCNumberOfPartitionsInputs, TPCLoadFactorInputs } from './topic-partition-calculator.models';
