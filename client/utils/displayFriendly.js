function displayFriendly(str) {
    return str.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

function displayFriendlyUnderscore(s) {
    return s.charAt(0) + s.toLowerCase().slice(1).replace(/_/g, ' ');
}

function toAllCaps(s) {
    return s.toUpperCase().replace(' ', '_');
}

export default displayFriendly;
export {displayFriendlyUnderscore, toAllCaps};