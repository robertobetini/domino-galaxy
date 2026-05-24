const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const randomNumber = ({ min=undefined, max=undefined } = {}) => {
    if (min === undefined || min === null) {
        min = 0;
    }
    if (max === undefined || max === null) {
        max = Number.MAX_SAFE_INTEGER;
    }

    const result = min + Math.random() * (max - min)
    return Math.floor(result);
}

const shuffle = (arr, { iterations=100 }) => {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const range = { min: 0, max: arr.length - 1 };

    for (let i = 0; i < iterations; i++) {
        const index = randomNumber(range);
        let anotherIndex = randomNumber(range);

        while (index === anotherIndex) {
            anotherIndex = randomNumber(range);
        }

        swap(arr, index, anotherIndex);
    }

    return arr;
}

export default { swap, randomNumber, shuffle };
