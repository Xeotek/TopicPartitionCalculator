# Contributing / Dev Setup

## Source Code Structure

Source code can be found in the src/ directory. In order for any functions, models, etc., to be available to 
consumers for this package, they must be included in the exports of the index.ts file.

The `lib` directory is created with `npm run build`, and this is what the projects that consume this library will
be accessing when importing any functions or models.

## Contributing

Any changes or additions to this library should have an associated GitHub issue and be thoroughly tested.

Tests can be run by using the command: 
```shell
$ npm run test
```

The demo application is found in the demo directory. It uses a standard import from the `node_modules` to
access the packages. Because of this, it's required that you run
```shell
$ npm run build
$ npm link
$ npm link @xeotekofficial/topic-partition-calculator
```
before running the demo app to test any changes to the library via the demo UI.

Optionally, you can test the changes other applications by running these commands after each set of changes:
```shell
$ npm run build
$ npm link
$ cd ../path/to/your/project
$ npm link @xeotekofficial/topic-partition-calculator
```
and importing the library as usual: 
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

*Important*: The command, `npm link @xeotekofficial/topic-partition-calculator`, must be redone if you have ran the 
`npm install` command since the last time you did `npm link`. The install overwrites any changes in `node_modules` 
that are not represented in the `package.json` file.
