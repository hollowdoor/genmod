const copy = require('copy');

copy('test/code*', 'docs', v=>{
    console.log(v)
});
copy('test/*.html', 'docs', v=>{});
