const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function group(str, size) {
    const reversed = str.split('').reverse();

    const spaced = [];
    for (let i = 0; i < reversed.length; ++i) {
        if (i > 0 && i % size == 0) {
            spaced.push(' ');
        }
        spaced.push(reversed[i]);
    }

    return spaced.reverse().join('');
};

function to_utf8_array(str) {
    const utf8 = unescape(encodeURIComponent(str))

    res = []
    for (let i = 0; i < utf8.length; ++i) {
        res.push(utf8.codePointAt(i));
    }
    return res;
}

function askCalcNumbers() {
    return new Promise((res) => {
        rl.question('Calculate the binary and decimal numbers (press a key when ready)',
                    () => res());
    });
}

function askCalcUtf() {
    return new Promise((res) => {
        rl.question('Calculate the utf8 representations in binary and hexadecimal (press a key when ready)',
                    () => res());
    });
}

const num = Math.floor(Math.random() * 10000 + 1);
// const num = parseInt('1f4fb', 16);
const str = String.fromCodePoint(num);

console.log(str);
console.log(`U + ${group(num.toString(16), 2)}`);
console.log();

askCalcNumbers()
    .then(() => {
        console.log();
        console.log('Answer:');
        console.log();
        console.log(`${group(num.toString(2), 4)}₍₂₎`);
        console.log(`${group(num.toString(), 3)}₍₁₀₎`);
        console.log();
    })
    .then(askCalcUtf)
    .then(() => {
        console.log();
        console.log('Answer:');
        console.log();

        const a = to_utf8_array(str);
        console.log('utf8')
        a.forEach(x => console.log(`    ${group(x.toString(2), 4)}₍₂₎`));
        console.log();
        console.log(`    ${a.map(x => x.toString(16)).join(' ')}₍₁₆₎`);
    })
    .then(() => {
        rl.close();
    });
