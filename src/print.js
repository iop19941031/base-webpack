import _ from 'lodash';

function printMe() {
    console.log('I get called from print.js!');

    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
}

export {
    printMe
}