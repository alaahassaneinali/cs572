const dns = require('dns');
const { promisify } = require('util');
const resolve4_Async = promisify(dns.resolve4);

dns.resolve4('www.mum.edu', (err, addresses) => {
    if (err) throw err;

    console.log(`IP Address: ${addresses}`);
});

// promise
resolve4_Async('www.mum.edu')
    .then((addresses) => console.log( addresses))
    .catch((err) => console.log(err));

// async/wait
async function resolve() {
    try {
        const text = await resolve4_Async('www.mum.edu');
        console.log( text);
    } catch (err) {
        console.log(err)
    }
}

resolve();