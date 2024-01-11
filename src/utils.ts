import {
  getContacts,
  createContact,
  getContact,
  updateContact,
} from "./components/Contacts";
import { redirect } from "react-router-dom";

export async function rootLoader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function rootAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function contactLoader({ params }: any) {
  const contact = await getContact(params?.contactId ?? "");
  return { contact };
}

export async function editContactAction({ request, params }: any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
