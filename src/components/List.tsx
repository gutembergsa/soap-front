import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Contact } from "../App";
import "../App.css";

const contactsFilter = (contact: Contact, filter: string) => {
  if (filter === "" || (filter.length && contact.lastName.includes(filter))) {
    return contact;
  }
};

interface List {
  contacts: Contact[];
  filter: string;
  editMode: (contact: Contact) => void;
  remove: (id: string) => void;
}

const List = ({ contacts, filter, editMode, remove }: List) => {
  return (
    <ul className="list">
      {contacts
        .filter((value) => contactsFilter(value, filter))
        .map((contact) => (
          <li
            key={contact.id}
            className="listItemContainer"
            onClick={() => editMode(contact)}
          >
            <span className="textWrapper">
              <span>
                {contact.name} {contact.lastName}
              </span>
              <span>
                <FaPhoneAlt size={10} /> {contact.phoneNumber}
              </span>
            </span>
            <button className="button" onClick={() => remove(contact.id!)}>
              <FaRegTrashCan className="trashIcon" />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default List;
