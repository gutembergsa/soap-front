import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TfiAgenda } from "react-icons/tfi";
import { del, get, post, put } from "./services";
import Form from "./components/Form";
import List from "./components/List";
import "./App.css";

export interface Contact {
  id?: string;
  name: string;
  lastName: string;
  phoneNumber: string;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
  })
  .required();

type FormFields = yup.InferType<typeof schema>;

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [editId, setEditId] = useState("");

  const form = useForm<FormFields>({
    resolver: yupResolver(schema),
  });
  const { setValue, reset } = form;

  useEffect(() => {
    getAll();
    return () => {
      setContacts([]);
    };
  }, []);

  const submit = (fields: FormFields) => {
    editId?.length
      ? put(editId, fields).then((data) => {
          setContacts(data);
          setShowForm(false);
        })
      : post(fields).then((data) => {
          setContacts(data);
          setShowForm(false);
        });
  };

  const remove = (id: string) => {
    del(id).then((data) => {
      setContacts(data);
      setShowForm(false);
    });
  };

  const getAll = () => {
    get().then((res) => {
      setContacts(res);
    });
  };

  const editMode = (contact: Contact) => {
    setShowForm(true);
    setEditId(contact.id!);

    setValue("name", contact.name);
    setValue("lastName", contact.lastName);
    setValue("phoneNumber", contact.phoneNumber);
  };

  return (
    <main>
      <div className="mainContainer">
        <h1 className="title">
          <TfiAgenda size={20} /> Phone Book App
        </h1>
        <div className="actionContainer">
          <div>
            <span>Contacs</span>
            <button
              onClick={() => {
                reset();
                setEditId("");
                setShowForm(true);
              }}
            >
              + Add contact
            </button>
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search for contact by last name"
            onChange={({ target: { value } }) => setFilter(value)}
          />
        </div>
        {contacts.length ? (
          <List
            contacts={contacts}
            filter={filter}
            remove={remove}
            editMode={editMode}
          />
        ) : null}
      </div>
      {showForm ? (
        <FormProvider {...form}>
          {" "}
          <Form editId={editId} setShowForm={setShowForm} submit={submit} />
        </FormProvider>
      ) : null}
    </main>
  );
};

export default App;
