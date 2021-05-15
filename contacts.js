const fs = require('fs').promises
const path = require('path')
const shortid = require('shortid')



// Создаем переменную contactsPath

const contactsPath = path.join(__dirname, './db/contacts.json')


// Добавляем функции для работы с коллекцией

const listContacts = async() => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)

    console.log('List of contacts')
    console.table(contacts)

    return contacts
  } catch(err) {
    return console.log('Error:', err.message);
  }
}

const  getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const contactById = contacts.find(
      ({id}) => id === contactId
    )

    if(!contactById) {
      return console.log(`Contact with id: ${contactById} is not found`);
    }

    console.log(`Contact with id ${contactId}`)
    console.table(contactById)

    return contactId
  } catch(err) {
    return console.log('Error:', err.message);
  }
}

const  removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const filteredContacts = contacts.filter(
      ({id}) => id !== contactId)

      if(contacts.length === filteredContacts.length) {
        return console.log(`Contact with id: ${contactId} is not found`);
      }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), "utf-8")

    console.log(`Contact was removed`)
    console.table(filteredContacts)

    return filteredContacts
  } catch(err) {
    return console.log('Error:', err.message);
  }
}

const addContact = async(name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)

    if (contacts.find(contact => contact.name === name)) {
      return console.log('This name is in the contact list');
    }

    if (contacts.find(contact => contact.email === email)) {
      return console.log('This email is in the contact list');
    }

    if (contacts.find(contact => contact.phone === phone)) {
      return console.log('This phone is in the contact list');
    }

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    }
  
    const contactList = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2), 'utf-8')

    console.log(`Contact was added`)
    console.table(contactList)
    
    return contactList
  } catch(err) {
    return console.log('Error:', err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}




