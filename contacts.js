const fs = require('fs').promises;
// const { nanoid } = require("nanoid");
const path = require('path');

// import { nanoid } from 'nanoid';

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    console.table(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(c => c.id === String(contactId));
    console.log(contact);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(c => c.id !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(`Contact with id ${contactId} has been removed`);
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: `${contacts.length + 1}`,
      name,
      email,
      phone
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with name ${name} has been added`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};