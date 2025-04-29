import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../../API/Entries/entries";
import { LOADING_TEXT, QUERY_KEYS } from "../../Constants/constant";

const Details = () => {
  const { id } = useParams();

  const { data: entry, isLoading, isError } = useQuery({
    queryKey: [...QUERY_KEYS.entries, id],
    queryFn: () => getDetails(id),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600 animate-pulse">{LOADING_TEXT}</p>
    </div>
  );
  
  if (isError) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <p className="text-xl font-semibold text-red-600">Error loading details</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200"
      >
        Try Again
      </button>
    </div>
  );  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Details</h2>
        
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
            <p className="text-lg font-medium text-gray-800">{entry.name}</p>
          </div>
          
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm font-medium text-gray-500 mb-1">Technology</p>
            <p className="text-lg font-medium text-gray-800">{entry.technology}</p>
          </div>
          
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm font-medium text-gray-500 mb-1">Company</p>
            <p className="text-lg font-medium text-gray-800">{entry.company}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
            <p className="text-gray-800">{entry.description}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition duration-200 flex items-center"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;