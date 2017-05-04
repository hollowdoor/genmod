import copy from 'copy';
import path from 'path';
const cwd = process.cwd();
const root = path.join(__dirname, 'files');

export default function cp(pattern){
    return new Promise((resolve, reject)=>{
        copy(path.join(root, pattern), cwd, (err, file)=>{
            if(err) return reject(err);
            resolve(file);
        });
    });
}
