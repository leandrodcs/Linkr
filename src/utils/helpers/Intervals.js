import useInterval from 'use-interval'

function SetInterval(repeatingFunction, intervalInMs) {
    useInterval(() => {
        repeatingFunction();
    },intervalInMs);
}

export {
    SetInterval,
}