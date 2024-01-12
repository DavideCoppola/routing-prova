import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  rootActionHandler,
  editContactActionHandler,
  destroyContactHandler
} from "./utils.ts";
import ContactStore from "./store/ContactStore.ts";
import Root from "./routes/Root.tsx";
import Contact from "./routes/Contact.tsx";
import EditContact from "./routes/EditContact.tsx";
import Index from "./routes/Index";
import ErrorPage from "./components/errorPage.tsx";

// MobX Store
const contactStore = new ContactStore();

// Routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root contactStore={contactStore} />,
    errorElement: <ErrorPage />,
    action: () => rootActionHandler(contactStore),
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact contactStore={contactStore} />,
        /* loader: contactLoader, */
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact contactStore={contactStore} />,
        /* loader: contactLoader, */
        action: ({request, params}: any) => editContactActionHandler(request, params, contactStore),
      },
      {
        path: "contacts/:contactId/destroy",
        action: ({ params }: any) => destroyContactHandler(params, contactStore),
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  /* {
    path: "contacts/:contactId",
    element: <Contact />,
  }, */
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
