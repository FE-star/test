import Benchmark from 'benchmark';
import { addFloat, addFloatBySplitStr } from '../src/index';

const suite = new Benchmark.Suite();

suite
  .add('addFloat', function () {
    addFloat(123.456, 789.123);
  })
  .add('addFloatBySplitStr', function () {
    addFloatBySplitStr(123.456, 789.123);
  })
  .on('cycle', function (event) {
    console.log('循环执行: ', String(event.target));
  })
  .on('complete', function () {
    console.log('计算最快的是 ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
