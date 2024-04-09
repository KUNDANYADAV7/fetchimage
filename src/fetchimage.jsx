import React, { useState } from "react";

const ImageUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    image_url: null,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "image_url") {
      setFormData({ ...formData, image_url: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("image_url", formData.image_url);

      const response = await fetch(
        "https://mihexem7.pythonanywhere.com/student/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      const responseData = await response.json();
      console.log("Upload successful:", responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        border: "1px solid black",
        maxWidth: "45%",
        borderRadius: "15px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 m-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Please Enter Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Please Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Please Enter Address"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image_url" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image_url"
                name="image_url"
                onChange={handleInputChange}
                accept="image/*"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
