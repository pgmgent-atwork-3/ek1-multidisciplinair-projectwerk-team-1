"use client"
import { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadExcellFile = () => {

    const [excelData, setExcelData] = useState(null);
    const [file, setfile] = useState(null);
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    setfile(file)
  };


  const submit = () => {
    if(!file) return alert('File not uploaded');
    handleFileUpload(file);
  }

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Assuming you want data from the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button
      onClick={submit}
        className="mt-4 p-2 bg-indigo-500 text-white rounded-md"
      >Upload</button>

{excelData && (
        <div>
          <h2>Extracted Data:</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadExcellFile;