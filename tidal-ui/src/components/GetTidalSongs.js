import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

// Skrillex artist ID = 3853703

function GetTidalSongs() {
  let PORT = 8080;
  const api_url = `http://localhost:8080/search?&artistID=3853703&songCount=12`;
  const get_data = async () => {
    const res = await fetch(api_url);
    return res.json();
  };

  const { data, error, isLoading } = useQuery(["data"], get_data);

  console.log(data);

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div></div>;
}
export default GetTidalSongs;
