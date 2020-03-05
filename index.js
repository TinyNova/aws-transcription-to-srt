const async = require('async');

function getPreviousEndTime(json, index) {
    const maxLookBehind = 3;
    let stopAt;
    let i;
    let returnTime = undefined;
    
    if(index < maxLookBehind)
        stopAt = 0;
    else
        stopAt = index - maxLookBehind;
        
    for(i = index; i > stopAt; i--) {
        if(json.results.items[i].end_time == undefined)
            continue;
        else
            returnTime = json.results.items[i].end_time;
            break;
    }

    if(returnTime == undefined) {
            throw('Could not find a usable previous timestamp! The transcription JSON may be corrupted.');
    }
    
    return returnTime;
}

function convertToSrt(json) {
    if (json.results.items.length === 0) {
        return '';
    }

    let convertedOutput = '';
    let subtitleIndex = 1;
    let currentStart = json.results.items[0].start_time;
    let formattedStart;
    let formattedEnd;
    let nextLine = '';

    async.eachOf(json.results.items, function(item, index) {
        if (item.type === 'punctuation') {
            nextLine = nextLine.slice(0, -1); //Remove the space before punctuation
            nextLine += item.alternatives[0].content;
            formattedStart = secondsToMinutes(currentStart);
            formattedEnd = secondsToMinutes(getPreviousEndTime(json, index));
            convertedOutput += `${subtitleIndex++}\n`;
            convertedOutput += formattedStart + ' --> ' + formattedEnd + '\n';
            convertedOutput += nextLine + '\n\n';
            nextLine = '';
            let nextItem = json.results.items[index + 1];
            if (nextItem) {
                currentStart = json.results.items[index + 1].start_time;
            }
        } else if (item.end_time - currentStart > 5 && json.results.items[index - 1]) {
            previousEndTime = getPreviousEndTime(json, index);
            formattedStart = secondsToMinutes(currentStart);
            formattedEnd = secondsToMinutes(previousEndTime);
            convertedOutput += `${subtitleIndex++}\n`;
            convertedOutput += formattedStart + ' --> ' + formattedEnd + '\n';
            convertedOutput += nextLine + '\n\n';
            nextLine = item.alternatives[0].content + ' ';
            currentStart = item.start_time;
        } else {
            nextLine += item.alternatives[0].content + ' ';
        }
    });

    formattedStart = secondsToMinutes(currentStart);
    if (json.results.items[json.results.items.length - 1].type !== 'punctuation') {
        formattedEnd = secondsToMinutes(json.results.items[json.results.items.length - 1].end_time);
    } else {
        formattedEnd = secondsToMinutes(json.results.items[json.results.items.length - 2].end_time);
    }

    if (nextLine) {
        convertedOutput += `${subtitleIndex++}\n`;
        convertedOutput += formattedStart + ' --> ' + formattedEnd + '\n';
        convertedOutput += nextLine; //Add any leftover words to the end
    }

    return convertedOutput;
}

function padString(string, length) {
    return (new Array(length + 1).join('0') + string).slice(-length);
}

function secondsToMinutes(seconds) {
    let hours;
    let minutes;
    let seconds_int;
    let seconds_frac;
    let seconds_srt;

    hours = Math.floor(seconds / 3600);
    seconds = seconds - (hours * 3600);
    minutes = Math.floor(seconds / 60);
    seconds = (seconds - (minutes * 60));
    seconds_int = Math.floor(seconds);
    seconds_frac = (seconds - seconds_int).toFixed(3).substring(2);
    seconds_srt = seconds_int + ',' + seconds_frac;
    
    return padString(hours, 2) + ':' + padString(minutes, 2) + ':' + padString(seconds_srt, 6);
}

module.exports = convertToSrt;
