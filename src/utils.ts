import { redirect } from "react-router-dom";
import { IContactStore } from "./store/ContactStore";

// Test functions for actions with mobx
export function rootActionHandler(contactStore: IContactStore) {
  const contactId = contactStore.createContact();
  return redirect(`/contacts/${contactId}/edit`);
}

export async function editContactActionHandler(request: any, params: any, contactStore: IContactStore) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  contactStore.updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export function destroyContactHandler( params: any, contactStore: IContactStore) {
  contactStore.deleteContact(params.contactId);
  return redirect(`/`);
}

