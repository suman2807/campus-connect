import { useState } from "react";

/**
 * A functional component representing a form for submitting lost or found requests.
 *
 * @param {Object} props - The component's props.
 * @param {function} props.closeForm - A function to close the form.
 */
const LostFoundForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lostOrFound: "",
    location: "",
    contactInfo: "",
  });

  /**
   * Handles input change events to update form data.
   *
   * @param {Event} e - The input change event object.
   * @returns {void}
   *
   * @example
   * // Usage within a React component's handleChange method
   * handleInputChange(event);
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission by preventing the default action,
   * logging formData to the console, and closing the form.
   *
   * @param {Event} e - The event object representing the submit event.
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
      <h2 className="text-2xl text-white font-bold mb-4">Lost & Found Request</h2>
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
        <label className="block text-white font-bold mb-2">Lost or Found</label>
        <select
          name="lostOrFound"
          value={formData.lostOrFound}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
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

export default LostFoundForm;
