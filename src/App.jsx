import { useState,useEffect} from "react";


function App() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
});



  



  const handleAdd = () => {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }
    const newNote = {
      title: title,
      content: content
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };


useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);


  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };
  return (
    <div className="bg-green-800 text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3x1 font-bold mb-6">My Notepad</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={10}
        className="bg-orange-50 text-green-900 p-6 rounded-lg  ml-3 w-80  focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <br />
      <textarea
        placeholder="enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={100}
        className="bg-orange-50 text-green-900 p-2 rounded-lg ml-3 h-40 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400">


      </textarea>
      <br />
      <button onClick={handleAdd}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ">Add</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {notes.map((note, index) => (
          <div
            key={index}
           className="mt-4 bg-gray-500 p-4 rounded-lg shadow"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-10">{note.title}</h2>
            <p className=" text-white-600 mb-3 break-words w-50 max-h-40 overflow-y-auto">{note.content}</p>
            <button onClick={() => handleDelete(index)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Delete</button>
          </div>

        ))}
      </div>
    </div>
  );
}

export default App
