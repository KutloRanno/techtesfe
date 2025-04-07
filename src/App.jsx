import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import FileUpload from "./FileUpload";

const data = [
  { image: "/images/1.jpg" },
  { image: "/images/2.jpg" },
  { image: "/images/3.jpg" },
  { image: "/images/4.jpg" },
  { image: "/images/5.jpg" },
  { image: "/images/6.jpg" },
  { image: "/images/7.jpg" },
  { image: "/images/8.jpg" },
  { image: "/images/9.jpg" },
];

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function App() {
  const [serverFiles, setServerFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (serverFiles.length > 0) {
      window.dispatchEvent(new Event("resize")); // Triggers Slick to re-render layout
    }
  }, [serverFiles]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setServerFiles([...response.data]);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  console.log(serverFiles);

  return (
    <>
      <div className=" bg-gray-100 flex md:inset-0 md:items-center md:justify-center">
        <div className="flex flex-col  rounded-2xl bordeer-red-600 border-2 w-[30rem]">
          <div className="bg-white flex flex-col">
            <p className="py-5 px-5 text-lg text-blue-950">
              HP OMEN GAMING LAPTOP
            </p>
          </div>
          <div className="bg-white">
            <div className="bg-white flexx m-auto w-[29rem] h-96  pxx-5 py-5 border-t border-gray-100 ">
              {serverFiles.length > 0 ? (
                <Slider {...settings} className="w-[29rem] h-96 object-fill">
                  {serverFiles.map((pic) => (
                    <div key={pic.path}>
                      <img
                        alt="our product"
                        src={`http://localhost:5000/files/image/${pic.name}`}
                        className=" object-fill w-[29rem] h-96"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-[29rem] h-96 flex items-center justify-center text-gray-500 bg-gray-100 rounded-xl border border-dashed">
                  <p>No product images uploaded yet</p>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-xl w-full mx-auto mt-3 bg-white p-6 rounded-2xl shadow-md space-y-4">
            {/* <h2 className="text-2xl font-medium text-gray-800 mb-2">
            Product Details
          </h2> */}

            <FileUpload fetchFiles={fetchFiles} />

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Wireless Keyboard"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the product"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Apparel">Apparel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 99.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SKU12345"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
