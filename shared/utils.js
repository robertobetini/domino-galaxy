const randomNumber = ({ min=undefined, max=undefined }) => {
    if (min === undefined || min === null) {
        min = 0;
    }
    if (max === undefined || max === null) {
        max = Number.MAX_SAFE_INTEGER;
    }

    const result = min + Math.random() * (max - min)
    return Math.floor(result);
}

export default { randomNumber };
