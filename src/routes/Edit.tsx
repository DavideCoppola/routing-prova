import { Form/* , useLoaderData */, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { IContactStore } from "../store/ContactStore";

interface EditContactProps {
  contactStore: IContactStore,
}

const EditContact = observer((props: EditContactProps) => {
  // const { contact }: any = useLoaderData();
  const { contactStore } = props;
  const { contactId } = useParams();
  const contact = contactStore.getContact(contactId ?? '');

  return (
    ( contact ? <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
      : 
      <p>No contact found</p>
    )
  );
})

export default EditContact;