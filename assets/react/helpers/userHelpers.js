export const RolesTable = {
    ROLE_USER: 'Utilisateur',
    ROLE_ADMIN: 'Administrateur'
}

export const userOptions = [
    {
        label: "Utilisateur",
        value: "ROLE_USER",
    },
    {
        label: "Administrateur",
        value: "ROLE_ADMIN",
    }
];

export function roleOptions(object) {
    let table = [];
    for (const key in object) {
        table.push(`<option value='${key}'>${object[key]}</option>`);
    }
    return table.join('');
}