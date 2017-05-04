import rll from 'readline-literal';
import fs from 'fs-promise';
import path from 'path';
const cwd = process.cwd();
const rl = rll();
const root = path.join(__dirname, 'files');

export function read(name){

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
