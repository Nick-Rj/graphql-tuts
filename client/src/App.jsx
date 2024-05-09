import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { gql, useQuery } from "@apollo/client";
import DisplayCard from "./DisplayCard";

//  Creating query with gql
const query = gql`
  query GetTodosWUser {
    getTodos {
      title
      completed
      owner {
        name
        username
        phone
        company
      }
    }
  }
`;

function App() {
  // Using useQuery hook for executing the query
  const { data, loading } = useQuery(query);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-slate-300">
        <h1 className="text-7xl font-extrabold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mt-8">All TODOS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center p-8">
        {data?.getTodos?.length > 0 &&
          data?.getTodos?.map((item) => <DisplayCard info={item} />)}
      </div>
    </div>
  );
}

export default App;
