# aws-transcription-to-srt
Convert AWS transcriptions to SRT

Takes the JSON from [Amazon AWS Transcribe](https://aws.amazon.com/transcribe/) and outputs a SRT file.


inspired by https://github.com/mreinstein/aws-transcription-to-vtt


## api

```javascript
const srt = srtConvert(json)
```

`json` is an object returned from Amazon's transcribe service

returns a string consisting of the json converted to `vtt` format.


## including

```javascript
import srtConvert from 'aws-transcription-to-srt'

// *OR*

const srtConvert = require('aws-transcription-to-srt')
```


## example
```javascript
const json = {
    results: {
        transcripts: [
            {
                transcript: "Wait."
            }
        ],
        items: [
            {
                start_time: "7.84",
                end_time: "12.87",
                alternatives: [
                    {
                        confidence: "0.4523",
                        content: "Wait"
                    }
                ],
                type: "pronunciation"
            },
            {
                alternatives: [
                    {
                        confidence: null,
                        content: "."
                    }
                ],
                type: "punctuation"
            }
        ]
    }
}

const srt = srtConvert(json)
```

`json` is an object returned from Amazon's transcribe service

returns a string consisting of the json converted to `vtt` format.


## testing
```javascript
npm test
```

