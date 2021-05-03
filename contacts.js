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
    console.table(contacts)
  } catch(err) {
    console.log(err);
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
      console.log(`Contact with id ${contactById} is not found`);
    }

    console.table(contactById)
  } catch(err) {
    console.log(err);
  }
}

const  removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const filteredContact = contacts.filter(
      ({id}) => id !== contactId)
    console.table(filteredContact)

    await fs.writeFile(contactsPath, JSON.stringify(filteredContact, null, 2))
    console.log(`Contact with id ${contactId} was removed`);
  } catch(err) {
    console.log(err);
  }
}

const addContact = async(name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    }
    // console.log(newContact);
    const contactList = [...contacts, newContact]
    console.log(contactList);
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))
    console.log(`Contact was added`)

  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}




// async function readFiles(patch) {
//   try {
//     const file = await fs.readFile(patch, 'utf-8')
//     const list = JSON.parse(file)
//     return list
//   } catch(err) {
//     console.log(err);
//   }
  
// }

// async function writeFiles(patch, data) {
//   try {
//     await fs.writeFile(patch, JSON.stringify(data), 'utf-8')
//   } catch(err) {
//     console.log(err);
//   }
// }
