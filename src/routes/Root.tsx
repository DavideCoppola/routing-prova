import { Outlet, Form, NavLink, useSearchParams, useSubmit, useNavigation } from "react-router-dom";
import CounterStore from '../store/CounterStore.ts';
import { IContactStore } from "../store/ContactStore.ts";
import { Contact } from "../types/ContactStoreTypes.ts";
import { observer } from "mobx-react";
import Counter from "../components/Counter";
interface RootProps {
  contactStore: IContactStore
}

const Root = observer((props: RootProps) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const submit = useSubmit();
  
  const { contactStore } = props;
  const { contacts } = contactStore;

  const searchedFilter = searchParams.get("q");
  console.log('searchParams: ', searchParams);
  console.log('fake: ', setSearchParams);

  const onChangeSearchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    submit(event.currentTarget.form);
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form  id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={searchedFilter ?? ''}
              onChange={onChangeSearchHandler}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form >
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <Counter counterStore={CounterStore}/>
        <nav>
          {contacts.length > 0 ? (
            <ul>
              {contacts.filter((contact: Contact) => 
                contact?.first?.includes(searchedFilter ?? '') || 
                contact?.last?.includes(searchedFilter ?? ''))
              .map((contact: Contact) => (
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
      <div 
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
})

export default Root;
