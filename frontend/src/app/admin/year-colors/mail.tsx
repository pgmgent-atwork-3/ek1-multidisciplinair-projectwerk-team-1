"use client";
import {
  CREATE_MAIL,
  UPDATE_MAIL,
  DELETE_MAIL,
} from "@/lib/mutations/mail";
import { GET_MAILS } from "@/lib/queries/mail";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const Mail = () => {
  const { data, loading, error } = useQuery(GET_MAILS);
  const [mails, setMails] = useState<Mails>([]);
  const [updateMail] = useMutation(UPDATE_MAIL);
  const [createMail] = useMutation(CREATE_MAIL);
  const [deleteMail] = useMutation(DELETE_MAIL);
  const [newMail, setNewMail] = useState<Mail>({
    id: "",
    attributes: {
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.mails);
      setMails(data.mails.data);
    }
  }, [data]);

  const handleChange = (e: any, id: string, field: string) => {
    const newMails = mails.map((mail: Mail) => {
      if (mail.id === id) {
        return {
          ...mail,
          attributes: {
            ...mail.attributes,
            [field]:
              field === "price" ? parseFloat(e.target.value) : e.target.value,
          },
        };
      }
      return mail;
    });
    setMails(newMails);
  };

  const handleUpdate = () => {
    mails.forEach((mail: Mail) => {
      updateMail({
        variables: {
          id: mail.id,
          name: mail.attributes.name,
          price: mail.attributes.price,
        },
      });
    });
  };

  const handleNewChange = (e: any, field: string) => {
    setNewMail({
      ...newMail,
      attributes: {
        ...newMail.attributes,
        [field]:
          field === "price" ? parseFloat(e.target.value) : e.target.value,
      },
    });
  };

  const handleCreate = () => {
    setMails([...mails, newMail]);
    createMail({
      variables: {
        name: newMail.attributes.name,
        price: newMail.attributes.price,
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteMail({
      variables: {
        id: id,
      },
    });
    setMails(mails.filter((mail: Mail) => mail.id !== id));
  };

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error :{error.message}</p>;
  if (!data) return <p>Geen data gevonden</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post prijzen</h2>
      {mails.map((mail: Mail) => (
        <div key={mail.id} className="mb-4">
          <input
            type="text"
            className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
            value={mail.attributes.name}
            onChange={(e) => handleChange(e, mail.id, "name")}
          />
          <input
            type="number"
            className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
            value={mail.attributes.price}
            step={0.01}
            onChange={(e) => handleChange(e, mail.id, "price")}
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(mail.id)}>Verwijderen</button>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdate}>Opslaan</button>
      <div className="mt-4">
        <input
          type="text"
          className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
          value={newMail.attributes.name}
          onChange={(e) => handleNewChange(e, "name")}
        />
        <input
          type="number"
          className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
          value={newMail.attributes.price}
          step={0.01}
          onChange={(e) => handleNewChange(e, "price")}
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2" onClick={handleCreate}>Nieuwe toevoegen</button>
    </div>
  );
};

export default Mail;
