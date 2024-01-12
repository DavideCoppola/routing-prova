import { Outlet, /* Link, */ Form, NavLink, } from "react-router-dom";
import CounterStore from '../store/CounterStore.ts';
import { IContactStore } from "../store/ContactStore.ts";
import { Contact } from "../types/ContactStoreTypes.ts";
import { observer } from "mobx-react";
import Counter from "../components/Counter";
interface RootProps {
  contactStore: IContactStore
}

const Root = observer((props: RootProps) => {
  
  const { contactStore } = props;
  const { contacts } = contactStore;

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <Counter counterStore={CounterStore}/>
        <nav>
          {contacts.length > 0 ? (
            <ul>
              {contacts.map((contact: Contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Contact name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
})

export default Root;
