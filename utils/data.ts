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