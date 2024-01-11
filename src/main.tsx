import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  rootLoader,
  rootAction,
  contactLoader,
  editContactAction,
} from "./utils.ts";
import Root from "./routes/Root.tsx";
import Contact from "./routes/Contact.tsx";
import EditContact from "./routes/Edit.tsx";
import ErrorPage from "./components/errorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editContactAction
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
