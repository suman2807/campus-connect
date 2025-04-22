import { useState } from "react";

/**
 * A React component for creating sports requests.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.closeForm - Function to close the form.
 * @returns {JSX.Element} - The rendered SportsForm component.
 */
const SportsForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sportType: "",
    teamSize: "",
  });

  /**
   * Handles input change events by updating form data.
   *
   * @param {Event} e - The input event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission by preventing default action, logging formData to console, and closing the form.
   *
   * @param {Event} e - The event object representing the form submission.
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
      <h2 className="text-2xl text-white font-bold mb-4">Create a Sports Request</h2>
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
        <label className="block text-white font-bold mb-2">Sport Type</label>
        <input
          type="text"
          name="sportType"
          value={formData.sportType}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block text-white font-bold mb-2">Team Size</label>
        <input
          type="number"
          name="teamSize"
          value={formData.teamSize}
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

export default SportsForm;
