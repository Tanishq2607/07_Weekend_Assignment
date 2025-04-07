import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../../API/Entries/entries";

const Details = () => {
  const { id } = useParams();

  const { data: entry, isLoading, isError } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getDetails(id),
  });

  if (isLoading) return <div className="p-6 text-lg">Loading...</div>;
  if (isError) return <div className="p-6 text-lg text-red-600">Error loading details</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white border border-gray-300 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Detail Page</h2>
        <p><span className="font-semibold">Name:</span> {entry.name}</p>
        <p><span className="font-semibold">Technology:</span> {entry.technology}</p>
        <p><span className="font-semibold">Company:</span> {entry.company}</p>
        <p><span className="font-semibold">Description:</span> {entry.description}</p>
      </div>
    </div>
  );
};

export default Details;
