import React, { useState } from "react";

const App = () => {
  const [Title, setTitle] = useState("");
  const [Notes, setNotes] = useState("");
  const [Tasks, setTasks] = useState([]);
  function submitNote() {
    if (Title === "" || Notes === "") {
      alert("Must Enter both Field..!");
      return;
    }
    console.log("Task Added...!", { Heading: Title, List: Notes });
    let newTasks = [...Tasks];
    setTasks(newTasks);
    newTasks.push({ Heading: Title, List: Notes });
    console.log(newTasks);
    setTitle("");
    setNotes("");
  }

  return (
    <>
      <section className="lg:flex items-center justify-center">
        {/* Submit form UI */}
        <div className=" lg:w-1/2 bg-teal-900 w-full h-screen flex items-center justify-center  ">
          <form
            className="bg-teal-300 max-w-sm m-5 text-black w-full rounded-2xl p-6 lg:p-6 flex flex-col justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              submitNote();
            }}
          >
            <h1 className="text-3xl text-teal-950 mb-5 font-bold">
              Add Your Task
            </h1>
            <input
              type="text"
              value={Title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border text-black rounded-md mb-5 w-full flex text-xl px-3 font-semibold h-10 "
              placeholder="Heading"
            />
            <textarea
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              rows={8}
              placeholder="Notes.."
              value={Notes}
              className="border rounded-md w-full text-xl h-20 px-3"
            ></textarea>
            <button
              type="submit"
              className="h-10  mt-3 text-gray-200 rounded-md px-5 hover:bg-teal-600 bg-teal-800 active:bg-teal-600 transition"
            >
              Add Task
            </button>
          </form>
        </div>
        {/*Render all Notes  */}
        <div className="lg:w-1/2 text-wrap overflow-auto w-full flex flex-wrap items-center p-6 gap-5 justify-center bg-white h-screen lg:border-l-2 max-lg:border-t-2 border-dashed border-gray-600">
          {Tasks.map((task , id) => {
            return (
              <div className="w-full flex items-end justify-center p-3 max-w-78 h-78 relative bg-white rounded-4xl shadow-2xl" key={id}>
                <img
                  src="../public/pin.png"
                  className="h-15 w-20 absolute z-10 top-3 me-5"
                  alt="pin"
                />
                <div className="w-full h-58 bg-orange-200 p-4 rounded-4xl">
                  <div className="justify-center gap-2  flex">
                    <h1 className="text-3xl font-bold ">{id+1}.</h1>
                    {console.log(task)}
                  <h1 className="text-4xl  font-semibold text-center text-wrap">{task.Heading}</h1>
                  </div>
                  <p className="text-gray-600 text-xl text-center text-wrap">{task.List}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default App;
