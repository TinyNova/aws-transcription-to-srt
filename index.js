const async = require('async');

function convertToSrt(json) {
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
            formattedEnd = secondsToMinutes(json.results.items[index - 1].end_time);
            convertedOutput += `${subtitleIndex++}\n`;
            convertedOutput += formattedStart + ' --> ' + formattedEnd + '\n';
            convertedOutput += nextLine + '\n\n';
            nextLine = '';
            let nextItem = json.results.items[index + 1];
            if (nextItem) {
                currentStart = json.results.items[index + 1].start_time;
            }
        } else if (item.end_time - currentStart > 5 && json.results.items[index - 1]) {
            formattedStart = secondsToMinutes(currentStart);
            console.log(json.results.items[index]);
            console.log(json.results.items[index - 1]);
            formattedEnd = secondsToMinutes(json.results.items[index - 1].end_time);
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
    hours = Math.floor(seconds / 3600);
    seconds = seconds - (hours * 3600);
    minutes = Math.floor(seconds / 60);
    seconds = (seconds - (minutes * 60)).toFixed(3);
    return padString(hours, 2) + ':' + padString(minutes, 2) + ':' + padString(seconds, 6);
}

module.exports = convertToSrt;
