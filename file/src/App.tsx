import React, { useState } from "react";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageScrList, setImageScrList] = useState<string[]>([]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageSrc(reader.result as string | null);
    };
  };

  const clearImage = () => {
    setImageSrc(null);
  };

  const onConfirm = () => {
    if (imageSrc) {
      setImageScrList((prevList) => [...prevList, imageSrc]);
      setImageSrc(null);
    }
  };

  return (
    <div className="App">
      <input accept="image/*" multiple type="file" onChange={onUpload} />
      {imageSrc && (
        <div className="preview">
          <img
            className="upload"
            src={imageSrc}
            alt="Uploaded Image"
            onLoad={() => URL.revokeObjectURL(imageSrc)}
          />
          <button onClick={clearImage}>Remove</button>
        </div>
      )}
      <button onClick={onConfirm} className="confirm">
        확인
      </button>
      <div className="image-list">
        {imageScrList.map((scr, index) => (
          <img
            key={index}
            className="list-item"
            src={scr}
            alt={`image$(index)`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
