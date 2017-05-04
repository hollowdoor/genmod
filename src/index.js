import {read} from './lib/read.js';
import mkdirp from 'mkdirp-promise';
import copy from './lib/cp.js';

const dirs = ['dist', 'src', 'docs', 'proto', 'test']
.map(name=>mkdirp(name));

const dots = ['.npmignore']
.map(name=>copy(name));

Promise.all(dirs.concat(dots))
.then(v=>{
    return read('package.json')
    .write()
})
.then(v=>{
    return read('rollit.js')
    .write()
})
.catch(e=>console.error(e));
