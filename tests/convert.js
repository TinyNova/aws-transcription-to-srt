const assert = require('assert');
const fs = require('fs');
const path = require('path');
const converter = require('../index.js');
const zoidbergTranslation = require('./futurama');
const srtTxt = fs.readFileSync(path.join(__dirname, 'srt.txt'));

describe('Test converter', function () {
    it('Will translate the JSON correctly', function () {
        const translation = converter(zoidbergTranslation);
        assert.strictEqual(translation, srtTxt.toString());
    });
});
