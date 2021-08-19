
const l_Storage = window.localStorage;

const store = {
    retrieve : (field) => {
        return JSON.parse(l_Storage.getItem(field));
    },
    write : (field, value) => {
        l_Storage.setItem(field, JSON.stringify(value));
    },
    clear : () => {
        l_Storage.clear();
    },
    remove : (field) => {
        l_Storage.removeItem(field);
    }
}

export default store

