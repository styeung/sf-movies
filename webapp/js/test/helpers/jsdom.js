require('@babel/register')
const jsdom = require('jsdom')
const JSDOM = jsdom.JSDOM

const dom = new JSDOM('<html><body></body></html>');
window = dom.window;
document = dom.window.document;
navigator = dom.window.navigator;
window.Date = Date;