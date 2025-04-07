import React, { useState } from "react";
import axios from "axios";
import { FaSave, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const FileUpload = ({ fetchFiles }) => {
  const [files, setFiles] = useState([]);
  //   const [uploadProgress, setUploadProgress] = useState({});
  //   const [uploadedFiles, setUploadedFiles] = useState([]);

  console.log(files);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {}
      );

      //   setUploadedFiles(response.data.files);
      setFiles([]);
      toast.success("Images uploaded successfully! 📸");
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error();
      toast.error("Error uploading files ❌");
    }
  };

  function handleRemove(fileName) {
    setFiles((prevFiles) => prevFiles.filter((item) => item.name !== fileName));
  }

  return (
    <div className="justify-end p-[20px] max-w-[800px] m-[0_auto]">
      <div className="mb-5 p-5 ">
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          multiple
          hidden
        />
        <label
          htmlFor="fileUpload"
          className="bg-blue-400 px-14 py-5 rounded-md text-white text-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          📤 Upload Images
        </label>

        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          style={{ marginLeft: "10px" }}
        >
          <FaSave />
        </button>

        {files.length > 0 && (
          <div className="my-3">
            <h3 className="text-green-600 font-semibold mt-7 mb-5">
              Preview images
            </h3>

            {files.map((file) => {
              const imageUrl = URL.createObjectURL(file);
              //   selectedImages.push(imageUrl);
              return (
                <div key={file.name}>
                  <button
                    key={file.name}
                    onClick={() => handleRemove(file.name)}
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                  <img
                    src={imageUrl}
                    alt="preview before upload"
                    key={imageUrl}
                    className=""
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
