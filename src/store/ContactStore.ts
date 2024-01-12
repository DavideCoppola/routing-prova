import { action, makeObservable, observable } from "mobx";
import { matchSorter } from "match-sorter";
import { Contact } from "../types/ContactStoreTypes";

export interface IContactStore {
  contacts: Contact[],
  getContacts: (query?: string) => Contact[],
  createContact: () => Contact,
  getContact: (id: string) => Contact | null,
  updateContact: (id: string, updates: {[key: string]: any}) => Contact,
  deleteContact: (id: string) => boolean,
}

class ContactStore implements IContactStore {
  contacts: Contact[] = [];
  
  constructor() {
    makeObservable(this, {
      contacts: observable,
      getContacts: action,
      createContact: action,
      getContact: action,
      updateContact: action,
      deleteContact: action
    })
  }

  getContacts(query?: string) {
    if (query) {
      this.contacts = matchSorter(this.contacts, query, { keys: ["first", "last"] });
    }
    return this.contacts.sort();
  }

  createContact() {
    const id = Math.random().toString(36).substring(2, 9);
    const contact: Contact = { id, createdAt: Date.now() };
    const updatedContacts = this.getContacts(id);
    updatedContacts.unshift(contact);
    this.contacts = updatedContacts;
    return contact;
  }

  getContact(id: string) {
    const contact = this.contacts.find((contact: Contact) => contact.id === id);
    return contact ?? null;
  }

  updateContact(id: string, updates: {[key: string]: any}) {
    const contact = this.contacts.find((contact: any) => contact.id === id);
    const contactIndex = this.contacts.findIndex((contact: any) => contact.id === id);
    if (!contact) throw new Error("No contact found for" + id);
    Object.assign(contact, updates);
    this.contacts[contactIndex] = contact;
    return contact;
  }

  deleteContact(id: string) {
    const index = this.contacts.findIndex((contact: any) => contact.id === id);
    if (index > -1) {
      this.contacts.splice(index, 1);
      return true;
    }
    return false;
  }

}

export default ContactStore;