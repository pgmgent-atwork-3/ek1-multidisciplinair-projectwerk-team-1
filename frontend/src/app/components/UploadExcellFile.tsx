"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { fetchAllUsers } from "@/app/api/api";
import { updateUser } from "@/app/api/api";

const UploadExcellFile = () => {
  const [excelData, setExcelData] = useState(null);
  const [file, setfile] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await fetchAllUsers();
      if (users) {
        setUsers(users);
      } else {
        return (
          <>
            <h1>Er is iets misgelopen</h1>
          </>
        );
      }
    };

    getAllUsers();
  }, [excelData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };

  const submit = () => {
    if (!file) return alert("File not uploaded");
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Assuming you want data from the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const updateUserLid = async (id, lid) => {
    try {
      const userUpdate = {
        id: id,
        lid: lid,
      };
      console.log(userUpdate);
      const { data } = await updateUser(userUpdate);
      if (data && data.register) {
        console.log("update successful");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelLidUpdate = async () => {
    if (excelData) {
      try {
        await Promise.all(
          excelData.map((user: any) => {
            const id = users.find((u) => u.attributes.stamNr === user[0]).id;
            if (user[1] == "ja") {
              return updateUserLid(id, true);
            } else {
              return updateUserLid(id, false);
            }
          })
        );
        console.log("Alle gebruikers zijn bijgewerkt!");
      } catch (error) {
        console.error(
          "Er is een fout opgetreden bij het bijwerken van gebruikers:",
          error
        );
      }
    }
    alert("De leden zijn bijgewerkt");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded-md mr-4"
      />
      <button
        onClick={submit}
        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300 mr-4"
      >
        Upload
      </button>

      {excelData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Extracted Data:</h2>
          <pre className="bg-white p-4 border border-gray-300 rounded-md">
            {JSON.stringify(excelData, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={handelLidUpdate}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Update de leden
      </button>
    </div>
  );
};

export default UploadExcellFile;
