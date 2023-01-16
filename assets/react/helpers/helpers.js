

export default function dateHelper(phpCreateAt) {
    let date = new Date(phpCreateAt);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}