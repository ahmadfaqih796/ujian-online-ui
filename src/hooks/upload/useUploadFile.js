import { useEffect, useState } from "react";

const useUploadFile = (defaultPreview = undefined) => {
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [userFile, setUserFile] = useState(defaultPreview);
  const [errorFiles, setErrorFiles] = useState(false);

  useEffect(() => {
    if (!banner) {
      if (userFile) {
        setPreview(defaultPreview);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(banner);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [banner, userFile, defaultPreview]);

  const onSelectFile = (e) => {
    const file = e.target.files;

    if (!file || file.length === 0) {
      e.target.value = "";
      setBanner(undefined);
      setErrorFiles(false);
      setErrorMessage("");
      return;
    }

    if (file[0].size > 2000000) {
      e.target.value = "";
      setBanner(undefined);
      setErrorFiles(true);
      setErrorMessage("*File harus dibawah 2 MB");
      return;
    }

    const pattern =
      /(image-.*)|(.*\.pdf$)|(.*\.docx$)|(.*\.jpeg$)|(.*\.jpg$)|(.*\.png$)/i;
    if (!file[0].name.match(pattern)) {
      e.target.value = "";
      setBanner(undefined);
      setErrorFiles(true);
      setErrorMessage(
        "*File harus berupa gambar, dokumen teks (Word) atau PDF"
      );
      return;
    }
    setErrorFiles(false);
    setErrorMessage("");
    setBanner(file[0]);
  };

  const handleDeleteFile = () => {
    setBanner(null);
    setPreview(undefined);
    setErrorMessage("");
    setErrorFiles(false);
    setUserFile(undefined);
  };

  return {
    handleDeleteFile,
    onSelectFile,
    errorFiles,
    preview,
    banner,
    errorMessage,
  };
};

export default useUploadFile;
