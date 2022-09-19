import { useDropzone } from "react-dropzone";
import React, { useCallback, useState, useMemo } from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "rgb(0, 0, 0)",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: 150,
  marginTop: 10,
  alignment: "center",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone = ({ setImage }) => {
  const [selectedImage, setSelectedImage] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImage(acceptedFiles[0]);

      setSelectedImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setImage]
  );

  const maxSize = 3145728;
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,

      multiple: false,
      minSize: 0,
      maxSize: { maxSize },
      accept: { "image/*": [] },
    });
  const isFileTooLarge = selectedImage.size > maxSize;

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const selected_images = selectedImage?.map((file) => (
    <div>
      <img src={file.preview} alt="" style={{ width: "200px" }} />
    </div>
  ));

  return (
    <div>
      <label>Your Image</label>

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} id="imageFile" key="img" />
        {isFileTooLarge && (
          <div style={{ color: "red" }}>File is too large.</div>
        )}
        <p>Drop Your Image Here ...</p>
      </div>
      {selected_images}
    </div>
  );
};

export default Dropzone;
