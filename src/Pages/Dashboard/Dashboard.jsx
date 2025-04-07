import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/Input/Input";
import Textarea from "../../Components/Textarea/Textarea";
import Button from "../../Components/Button/Button";

import { getEntries, postEntry } from "../../API/Entries/entries.js"

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    company: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: entries = [] } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  const mutation = useMutation({
    mutationFn: postEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["entries"]);
      setFormData({
        name: "",
        technology: "",
        company: "",
        description: "",
      });
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters long.";
    if (!formData.technology)
      newErrors.technology = "Technology is required.";
    if (!formData.company) newErrors.company = "Company is required.";
    if (!formData.description || formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters.";
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
    <div className="min-h-screen p-6 bg-gray-100 flex gap-6">
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add User Details</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-1" htmlFor="Name">
            Name
          </label>
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Fullname"
            error={errors.name}
          />
          <label
            className="block text-sm font-medium mb-1"
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
          <label className="block text-sm font-medium mb-1" htmlFor="Company">
            Company
          </label>
          <InputField
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company"
            error={errors.company}
          />
          <label
            className="block text-sm font-medium mb-1"
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
          <Button type="submit">
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Added Users</h2>
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="p-3 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleNameClick(entry.id)}
            >
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
