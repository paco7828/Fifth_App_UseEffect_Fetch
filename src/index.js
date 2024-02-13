import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Buttons({ content, onClick }) {
  return <button onClick={() => onClick(content)}>{content}</button>
}

function Comp() {
  const [reqQuery, setReqQuery] = useState("");
  const [response, setResponse] = useState("");
  const [queryId, setQueryId] = useState("");
  const buttonContents = ["users", "posts", "albums"];

  const initQuery = (content) => {
    setReqQuery(content);
  }

  const handleChange = (e) => {
    setQueryId(e.target.value);
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${reqQuery + (queryId === "" ? "" : `?id=${queryId}`)}`)
      .then(res => res.json())
      .then(data => {
        JSON.stringify(data) === "[]" || JSON.stringify(data) === "{}" ? setResponse("No available requested data") : setResponse(data);
      })
      .catch(err => setResponse(err));
  }, [reqQuery, queryId]);

  return (
    <div>
      <h1>Choose what to request:</h1>
      {buttonContents.map((btnContent, index) => <Buttons key={index} content={btnContent} onClick={initQuery} />)}
      <br />
      <input type="number" placeholder="ID... (optional)" value={queryId} onChange={handleChange} />
      <h2>Requested data:</h2>
      <p>{JSON.stringify(response)}</p>
    </div>
  );

}

ReactDOM.createRoot(document.getElementById("root")).render(<Comp />);