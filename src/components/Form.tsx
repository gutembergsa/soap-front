import React from "react";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { Contact } from "../App";
import "../App.css";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
  })
  .required();

type FormFields = yup.InferType<typeof schema>;

interface Form {
  editId: string;
  setShowForm: (show: boolean) => void;
  submit: (fields: Contact) => void;
}

const Form = ({ editId, setShowForm, submit }: Form) => {
  const { register, handleSubmit } = useFormContext<FormFields>();
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <div className="formTopContent">
          <h2 className="title">
            {editId?.length ? "Edit Todo" : "+ New Todo"}
          </h2>
          <button className="button" onClick={() => setShowForm(false)}>
            X
          </button>
        </div>
        <label htmlFor="name">
          <input type="text" placeholder="First name" {...register("name")} />
        </label>

        <label htmlFor="lastName">
          <input
            type="text"
            placeholder="Last name"
            {...register("lastName")}
          />
        </label>

        <label htmlFor="phoneNumber">
          <input
            type="tel"
            placeholder="Phone number"
            {...register("phoneNumber")}
          />
        </label>

        <input type="submit" value={editId?.length ? "edit" : "submit"} />
      </form>
    </div>
  );
};

export default Form;
