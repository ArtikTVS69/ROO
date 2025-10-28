export default function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export { getRandomInt };

let counter = 0;
export function incrementCounter() {
    counter++;
    return counter;
}
