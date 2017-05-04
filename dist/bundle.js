#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rll = _interopDefault(require('readline-literal'));
var fs = _interopDefault(require('fs-promise'));
var path = _interopDefault(require('path'));
var mkdirp = _interopDefault(require('mkdirp-promise'));
var copy = _interopDefault(require('copy'));

const cwd = process.cwd();
const rl = rll();
const root = path.join(__dirname, 'files');

function read(name){

    let result = fs.readFile(path.join(root, name), 'utf8')
    .then(f=>{
        return rl.compile(f);
    });

    return {
        write(){
            return result.then(contents=>{
                console.log(`Generating ${name} in ${cwd}.`);
                return fs.writeFile(path.join(cwd, name), contents);
            });

        }
    };
}

const cwd$1 = process.cwd();
const root$1 = path.join(__dirname, 'files');

function cp(pattern){
    return new Promise((resolve, reject)=>{
        copy(path.join(root$1, pattern), cwd$1, (err, file)=>{
            if(err) return reject(err);
            resolve(file);
        });
    });
}

const dirs = ['dist', 'src', 'docs', 'proto', 'test']
.map(name=>mkdirp(name));

const dots = ['.npmignore']
.map(name=>cp(name));

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
