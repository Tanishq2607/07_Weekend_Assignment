import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/Input/Input";
import Textarea from "../../Components/Textarea/Textarea";
import Button from "../../Components/Button/Button";
import { getEntries, postEntry } from "../../API/Entries/entries.js";
import { VALIDATION_MESSAGES, INITIAL_FORM_DATA, QUERY_KEYS } from "../../Constants/constant.js";

const Dashboard = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading: isEntriesLoading } = useQuery({
    queryKey: [QUERY_KEYS.entries],
    queryFn: getEntries,
  });

  const mutation = useMutation({
    mutationFn: postEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.entries] });
      setFormData(INITIAL_FORM_DATA);
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = VALIDATION_MESSAGES.name;
    if (!formData.technology)
      newErrors.technology = VALIDATION_MESSAGES.technology;
    if (!formData.company)
      newErrors.company = VALIDATION_MESSAGES.company;
    if (!formData.description || formData.description.length < 20)
      newErrors.description = VALIDATION_MESSAGES.description;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate(formData);
    }
  };

  const handleNameClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add User Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="Name">
              Name
            </label>
            <InputField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Fullname"
              error={errors.name}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-700"
              htmlFor="Technology"
            >
              Technology
            </label>
            <InputField
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              placeholder="Enter technology"
              error={errors.technology}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="Company">
              Company
            </label>
            <InputField
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company"
              error={errors.company}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-700"
              htmlFor="Description"
            >
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              error={errors.description}
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200 flex items-center justify-center"
            >
              {mutation.isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
             5.291A7.962 7.962 0 014 12H0c0 
             3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </Button>

          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Added Users</h2>

        {isEntriesLoading ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {Array.isArray(entries) && entries.length > 0 ? (
              entries.map((entry) => (
                <li
                  key={entry.id}
                  className="p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition duration-200 flex items-center justify-between group"
                  onClick={() => handleNameClick(entry.id)}
                >
                  <span className="font-medium text-gray-700">{entry.name}</span>
                  <span className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View details →
                  </span>
                </li>
              ))
            ) : (
              <li className="p-4 border border-gray-200 rounded-md text-gray-500 text-center">
                No users added yet
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;