import React, { useState } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";

const FileUpload = ({ setServerFiles }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        {
          //   onUploadProgress: (progressEvent) => {
          //     const percentCompleted = Math.round(
          //       (progressEvent.loaded * 100) / progressEvent.total
          //     );
          //     setUploadProgress((prev) => ({
          //       ...prev,
          //       [progressEvent.target.fileName]: percentCompleted,
          //     }));
          //   },
        }
      );

      setUploadedFiles(response.data.files);
      setServerFiles([...response.data.files]);
      alert("Files uploaded successfully!");
      //   fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    }
  };

  function handleRemove(fileName) {
    setFiles((prevFiles) => prevFiles.filter((item) => item.name !== fileName));
  }

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/files/${filename}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file");
    }
  };

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
          <div className="my-3" key={files.length + Math.random}>
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
                    Remove
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

      {/* <div style={{ marginTop: "30px" }}>
        <h2>Server Files</h2>
        <button onClick={fetchFiles} style={{ marginBottom: "10px" }}>
          Refresh File List
        </button>

        {serverFiles.length === 0 ? (
          <p>No files on server yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  File Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Size (KB)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Upload Date
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serverFiles.map((file, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {file.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {Math.round(file.size / 1024)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(file.createdAt).toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button onClick={() => handleDownload(file.name)}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>*/}
    </div>
  );
};

export default FileUpload;
