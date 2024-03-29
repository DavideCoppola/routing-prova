import { observer } from "mobx-react";
import { Form, useParams, useFetcher } from "react-router-dom";
import { IContactStore } from "../store/ContactStore";
import { Contact as ContactType } from "../types/ContactStoreTypes";

interface ContactProps {
  contactStore: IContactStore
}

const Contact = observer((props: ContactProps) => {

  const { contactStore } = props;
  const { contactId } = useParams();
  const contact = contactStore.getContact(contactId ?? '');

  return (
    ( contact ? 
      (<div id="contact">
        <div>
          <img
            key={contact.avatar}
            src={contact.avatar || ''}
          />
        </div>

        <div>
          <h1>
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
          </h1>

          {contact.twitter && (
            <p>
              <a
                target="_blank"
                href={`https://twitter.com/${contact.twitter}`}
              >
                {contact.twitter}
              </a>
            </p>
          )}

          {contact.notes && <p>{contact.notes}</p>}

          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>) 
        : 
      <p>No Contact found</p>
    )
  );
})

interface FavoriteProps {
  contact: ContactType
}

function Favorite({ contact }: FavoriteProps) {
  const fetcher = useFetcher();
  const favorite = contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

export default Contact;