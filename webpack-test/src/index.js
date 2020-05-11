/*
  index.js: webpack 入口起点文件

  webpack ./src/index.js -o ./dev/build.js --mode=development

  webpack ./src/index.js -o ./dist/build.js --mode=production

*/

function add (a, b) {
  return a + b
}
import data from './data.json'
import './css/index.css'
import './less/index.less'

console.log(add(1, 2))
console.log(data);
