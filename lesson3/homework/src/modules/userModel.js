
const phonebook = [];

const addContact = (contact) => {
    phonebook.push(contact);
};

const deleteContact = (name) => {
    const index = phonebook.findIndex(contact => contact.name === name);
    if (index !== -1) {
        phonebook.splice(index, 1);
        return true;
    }
    return false;
};

const updateContact = (name, newPhone) => {
    const contact = phonebook.find(contact => contact.name === name);
    if (contact) {
        contact.phone = newPhone;
        return true;
    }
    return false;
};

const getAllContacts = () => {
    return phonebook;
};

const getSortedContacts = () => {
    return phonebook.slice().sort((a, b) => a.name.localeCompare(b.name));
};

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
