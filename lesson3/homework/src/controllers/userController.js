const { 
    addContact, 
    deleteContact, 
    updateContact, 
    getAllContacts, 
    getSortedContacts, 
    getContactByName 
} = require('../modules/userModel');

const { getJson } = require('../utils/getJson');

const addUser = (request, response) => {
    console.log("Processing addUser request");
    getJson(request, (data, error) => {
        if (error || !data.name || !data.phone) {
            console.error("Invalid data received for addUser", error);
            response.statusCode = 400;
            response.end(JSON.stringify({ message: "Invalid data" }));
            return;
        }
        addContact(data);
        console.log(`Contact added: ${data.name}`);
        response.statusCode = 201;
        response.end(JSON.stringify({ message: "Contact added" }));
    });
};

const deleteUser = (request, response) => {
    const name = request.url.split('/')[2];
    console.log(`Processing deleteUser request for ${name}`);
    if (deleteContact(name)) {
        console.log(`Contact deleted: ${name}`);
        response.statusCode = 200;
        response.end(JSON.stringify({ message: "Contact deleted" }));
    } else {
        console.error(`Contact not found: ${name}`);
        response.statusCode = 404;
        response.end(JSON.stringify({ message: "Contact not found" }));
    }
};

const updateUser = (request, response) => {
    console.log("Processing updateUser request");
    getJson(request, (data, error) => {
        if (error || !data.name || !data.newPhone) {
            console.error("Invalid data received for updateUser", error);
            response.statusCode = 400;
            response.end(JSON.stringify({ message: "Invalid data" }));
            return;
        }
        if (updateContact(data.name, data.newPhone)) {
            console.log(`Contact updated: ${data.name}`);
            response.statusCode = 200;
            response.end(JSON.stringify({ message: "Contact updated" }));
        } else {
            console.error(`Contact not found for update: ${data.name}`);
            response.statusCode = 404;
            response.end(JSON.stringify({ message: "Contact not found" }));
        }
    });
};

const getAllUsers = (request, response) => {
    console.log("Processing getAllUsers request");
    response.statusCode = 200;
    response.end(JSON.stringify(getAllContacts()));
};

const getSortedUsers = (request, response) => {
    console.log("Processing getSortedUsers request");
    response.statusCode = 200;
    response.end(JSON.stringify(getSortedContacts()));
};

const getUserByName = (request, response) => {
    const name = request.url.split('/')[2];
    console.log(`Processing getUserByName request for ${name}`);
    const contact = getContactByName(name);
    if (contact) {
        console.log(`Contact found: ${name}`);
        response.statusCode = 200;
        response.end(JSON.stringify({ phone: contact.phone }));
    } else {
        console.error(`Contact not found: ${name}`);
        response.statusCode = 404;
        response.end(JSON.stringify({ message: "Contact not found" }));
    }
};

module.exports = { 
    addUser, 
    deleteUser, 
    updateUser, 
    getAllUsers, 
    getSortedUsers, 
    getUserByName 
};
