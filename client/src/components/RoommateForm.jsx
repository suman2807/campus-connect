import { useState } from "react";

/**
 * A React component for creating a roommate request form.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.closeForm - A function to close the form modal.
 * @returns {JSX.Element} - The rendered RoommateForm component.
 */
const RoommateForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preferredGender: "",
    location: "",
    contactInfo: "",
  });

  /**
   * Handles input change events by updating the form data.
   *
   * @param {Event} e - The input event object.
   * @returns {void}
   *
   * Example:
   *   <input type="text" name="username" onChange={handleInputChange} />
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission event.
   *
   * @param {Event} e - The form submit event object.
   * @throws {Error} If the event is not a valid form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to Firebase
    console.log(formData);
    closeForm();
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-[#28430d] p-6">
      <button onClick={closeForm} className="text-white font-bold text-xl absolute top-4 right-4">
        &times;
      </button>
      <h2 className="text-2xl text-white font-bold mb-4">Roommate Request</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-white font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block text-white font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block text-white font-bold mb-2">Preferred Gender</label>
        <select
          name="preferredGender"
          value={formData.preferredGender}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Any">Any</option>
        </select>
        <label className="block text-white font-bold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block text-white font-bold mb-2">Contact Info</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RoommateForm;
