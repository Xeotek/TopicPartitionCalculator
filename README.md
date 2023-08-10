# TopicPartitionCalculator
The Topic Partition Calculator allows you to calculate the number of Apache Kafka Topics for a given use case.

## Installation 

Using npm:
```shell
$ npm i --save @xeotekofficial/topic-partition-calculator
```

## Usage
In project:
```js
import { 
  calculateRecommendedNumberOfPartitions, 
  TPCNumberOfPartitionsInputs 
} from '@xeotekofficial/topic-partition-calculator';

function someFn({ T, P, C, B }: TPCNumberOfPartitionsInputs) {
  const results = calculateRecommendedNumberOfPartitions({ T, P, C, B });
  return `Recommended number of partitions: ${results}`;
}
```

## Demo

To view the demo app run: 
```shell
$ git clone https://github.com/Xeotek/TopicPartitionCalculator.git
$ cd TopicPartitionCalculator
$ npm install
$ npm run demo
```
Then open `http://localhost:4200/` inside your browser.

See the [package source](https://github.com/Xeotek/TopicPartitionCalculator) for more details.
