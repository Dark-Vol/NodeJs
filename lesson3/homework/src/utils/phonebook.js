const phonebook = [];

// Добавление нового контакта
const addContact = (contact) => {
    phonebook.push(contact);
};

// Удаление контакта по имени
const deleteContact = (name) => {
    const index = phonebook.findIndex(contact => contact.name === name);
    if (index !== -1) {
        phonebook.splice(index, 1);
        return true;
    }
    return false;
};

// Обновление номера телефона контакта
const updateContact = (name, newPhone) => {
    const contact = phonebook.find(contact => contact.name === name);
    if (contact) {
        contact.phone = newPhone;
        return true;
    }
    return false;
};

// Получение всех контактов
const getAllContacts = () => {
    return phonebook;
};

// Получение контактов в алфавитном порядке
const getSortedContacts = () => {
    return phonebook.slice().sort((a, b) => a.name.localeCompare(b.name));
};

// Получение контакта по имени
const getContactByName = (name) => {
    return phonebook.find(contact => contact.name === name);
};

module.exports = {
    addContact,
    deleteContact,
    updateContact,
    getAllContacts,
    getSortedContacts,
    getContactByName
};