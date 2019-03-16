const v8 = require('v8')

exports.getMemUsage = () => v8.getHeapStatistics()

console.log(v8.getHeapStatistics())