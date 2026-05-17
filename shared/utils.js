const randomNumber = ({ min, max }) => {
    if (min === undefined) {
        min = 0;
    }
    if (max === undefined) {
        max = Number.MAX_SAFE_INTEGER;
    }

    const result = min + Math.random() * (max - min)
    return Math.floor(result);
}

export default { randomNumber };
