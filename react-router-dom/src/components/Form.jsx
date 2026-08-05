import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <div>
        <form className="flex justify-center items-center flex-col" onSubmit={(e) => {
            e.preventDefault()
            console.log(name)
        }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              handleSubmit(e);
            }}
            
            className="border px-2 py-2 rounded"
          />
          <input type="text" />
          <button className="border px-4 py-2 rounded" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Form;
