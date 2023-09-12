import React from "react";

const ChatFileDrag = () => {
  const [dragging, setDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const firstFile = files[0];
      setSelectedFile(firstFile);
    }
    console.log("Daftar file yang di-drop:", files);
  };
  console.log("File yang di-drop:", selectedFile);
  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        borderColor: dragging ? "#0070f3" : null,
      }}
    >
      {dragging ? "ini ke drag" : "belum kedrag"}
      <p>Drag & Drop file di sini</p>
    </div>
  );
};

export default ChatFileDrag;
