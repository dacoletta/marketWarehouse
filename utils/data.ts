export function isEmptyObjectValues(obj: any)  {
    if (Object.values(obj).every(value => value === '')) {
        return true;
    }
    return false;
}
export function getGender(gender: string) {
    return gender == 'male' ? 'M' : 'F';
}

export function parseJson(val: string | null) {
    return JSON.parse(val || '{}');
}

export function getNewId(arr: any[]) {
    let maxId = arr.reduce((max, p) => (p.id > max ? p.id : max), 0);
    if(maxId < 100) maxId = 100;
    return maxId + 1;
}

export function getRandomNumber() {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
}