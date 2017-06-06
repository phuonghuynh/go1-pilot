const defaultDelimiter = ',';
const invalidSeparatorLineFormatError = new Error('Invalid separator line format');

function splitWithDelimiters(numbers, delimiters) {
    let words = [numbers];
    delimiters.forEach(delimiter => {
        let tmp = [];
        words.forEach(word => {
            tmp = tmp.concat(word.split(delimiter));
        });
        words = tmp;
    });
    return words;
}

function addWithDelimiters(numbers, delimiters) {
    let sum = 0;
    const words = splitWithDelimiters(numbers, delimiters);
    const negativeNumbers = [];
    words.forEach(word => {
        let number = parseInt(word);
        if (isNaN(number)) {
            throw new Error('Input is invalid');
        }

        if (number < 0) {
            negativeNumbers.push(number);
        } else {
            if (number > 1000) {
                number = 0;
            }
            sum += number;
        }
    });

    if (negativeNumbers.length > 0) {
        throw new Error('Negatives not allowed: ' + negativeNumbers.join(','));
    }

    return sum;
}

function parseSeparatorLine(numbers) {
    const index = numbers.indexOf('\n');
    if (index === -1) {
        throw invalidSeparatorLineFormatError;
    }

    const separatorLine = numbers.substring(0, index + 1);
    return separatorLine;
}

function parseDifferentDelimiters(separatorLine) {
    const delimiterLine = separatorLine.substring('//'.length, separatorLine.length - 1);
    if (delimiterLine.length === 0) {
        throw invalidSeparatorLineFormatError;
    } else if (delimiterLine.length === 1) {
        return [delimiterLine];
    } else {
        const isMultipleDelimiters = delimiterLine[0] === '[' &&
            delimiterLine[delimiterLine.length - 1] === ']';
        if (isMultipleDelimiters) {
            const delimiters = delimiterLine.substring(1, delimiterLine.length - 1);
            if (delimiters.length === 0) {
                throw invalidSeparatorLineFormatError;
            } else {
                return parseMultipleDelimiters(delimiterLine);
            }
        } else {
            throw invalidSeparatorLineFormatError;
        }
    }
}

function parseMultipleDelimiters(delimiterLine) {
    const length = delimiterLine.length;
    const delimiters = [];
    let startIndex = 0;
    let endIndex = 0;
    do {
        startIndex = delimiterLine.indexOf('[', endIndex);
        if (endIndex > 0 && startIndex !== endIndex + 1) {
            throw invalidSeparatorLineFormatError;
        }

        endIndex = delimiterLine.indexOf(']', startIndex);
        const delimiter = delimiterLine.substring(startIndex + 1, endIndex);
        delimiters.push(delimiter);
    } while (endIndex !== length - 1);

    return delimiters;
}

function add(numbers) {
    if (numbers === '') {
        return 0;
    }

    let delimiters = [defaultDelimiter];
    const isDifferentDelimiters = numbers.startsWith('//');
    if (isDifferentDelimiters) {
        const separatorLine = parseSeparatorLine(numbers);
        delimiters = parseDifferentDelimiters(separatorLine);
        numbers = numbers.substring(separatorLine.length);
    }

    delimiters.push('\n');
    return addWithDelimiters(numbers, delimiters);
}

export { add };