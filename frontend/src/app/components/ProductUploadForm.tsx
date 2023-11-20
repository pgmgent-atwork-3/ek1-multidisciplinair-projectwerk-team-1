"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
// import JSONPretty from "react-json-pretty";
import {
  CREATE_PRODUCT_MUTATION,
  UPLOAD_MEDIA_MUTATION,
} from "@/lib/mutations/products";
import { on } from "events";

const ProductUploadForm = ({ userId }: { userId: string }) => {
  
  const [createProduct, createProductState] = useMutation(
    CREATE_PRODUCT_MUTATION
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [response, setResponse] = useState({});
  const [user, setUserId] = useState(userId); // Add userId state
  const [name, setName] = useState(""); // Add name state
  const [availability, setAvailability] = useState(false); // Initialize with false
  const [uploadMediaMutation, uploadMediaState] = useMutation(
    UPLOAD_MEDIA_MUTATION,
    {
      onCompleted: (data, options) => {
        createProduct({
          variables: {
            imageId: data.upload.data.id,
            userId: user,
            productName: name,
            available: availability,
          },
        });
      },
    }
  );
  if (uploadMediaState.loading || createProductState.loading)
    return <div>loading...</div>;
  const fetchImageFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const imageExtention = url.split(".").pop();
      const file = new File([blob], "image.png", { type: "image/png" });
      setSelectedFile(
        new File([blob], url, {
          type: `image/${imageExtention}`,
          lastModified: new Date().getTime(),
        })
      );
    } catch (error) {
      console.log("Error fetching image from url: ", error);
    }
  };

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!(event.target as HTMLInputElement).files![0]) return;
    const file = (event.target as HTMLInputElement).files![0];
    setSelectedFile(file);
  };

  // const addProduct = async (id: string) => {
  //   try {
  //     await createProduct({
  //       variables: {
  //         imageId: id,
  //         userId: user,
  //         productName: name,
  //         available: availability,
  //       },
  //     });

  //     const { data } = await createProductState;
  //     setResponse(JSON.stringify(data.createProduct.data));
  //     // console.log("Response: ", data.createProduct.data);
  //   } catch (error) {
  //     console.log("Error uploading image: ", error);
  //   }
  // };

  const handleAddProduct = async () => {
    if (selectedFile) {
      uploadMedia(selectedFile);
    }
  };

  const uploadMedia = async (file: File): Promise<string> => {
    console.log("Selected File: ", file);
    try {
      uploadMediaMutation({
        variables: {
          file,
        },
      });
      const { data } = await uploadMediaState;
      console.log(data.upload.data.id);
      return data.upload.data.id;
    } catch (error) {
      console.log("Error uploading media: ", error);
      return "";
    }
  };
  if (uploadMediaState.loading || createProductState.loading)
    return <div>failed to load</div>;
  return (
    <div className="p-8 bg-gray-400 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-white mb-6">
        Upload Your Product
      </h2>
      <div className="border border-dashed border-white rounded-lg p-6 mb-6 bg-opacity-50 backdrop-blur-3xl">
        <div className="mb-6">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 inline-block"
          >
            📁 Choose a File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
        </div>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-500 text-white bg-opacity-70 backdrop-blur-lg"
          placeholder="🖼️ Enter Image URL"
        />
        <button
          onClick={() => fetchImageFromUrl(imageUrl)}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600"
        >
          🌟 Get Image From URL 🌟
        </button>
        <p className="text-white text-sm mt-4">
          {selectedFile
            ? `📸 Selected File: ${selectedFile.name}`
            : "🚫 No file selected"}
        </p>
        <div className="mb-4">
          <label htmlFor="name" className="text-white">
            📝 Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-white bg-opacity-70 backdrop-blur-lg"
          />
        </div>
        <div className="mb-4">
          <label className="text-white">
            ☑️ Availability:
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="ml-2 text-white"
            />
          </label>
        </div>
      </div>
      <button
        onClick={handleAddProduct}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600"
      >
        🚀 Add Your Product 🚀
      </button>
      {Object.keys(response).length > 0 && (
        <div className="mt-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            📬 Response 📬
          </h2>
          {/* <JSONPretty data={response} className="text-white" /> */}
        </div>
      )}
    </div>
  );
};

export default ProductUploadForm;
