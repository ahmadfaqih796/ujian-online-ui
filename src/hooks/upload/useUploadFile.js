import { useEffect, useState } from "react";

const useUploadFile = (defaultPreview = undefined) => {
  const validationMessage = "*File harus berupa dokumen teks (Word) atau PDF";
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState();
  const [errorMessage, setErrorMessage] = useState(validationMessage);
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
      setBanner(undefined);
      setErrorFiles(false);
      setErrorMessage("");
      return;
    }

    if (file[0]?.size > 2000000) {
      setBanner(undefined);
      setErrorFiles(true);
      setErrorMessage("*File harus dibawah 2 MB");
      return;
    }

    const pattern = /(image-.*)|(.*\.pdf$)|(.*\.docx$)/i;
    if (!file[0]?.name.match(pattern)) {
      setBanner(undefined);
      setErrorFiles(true);
      setErrorMessage("*File harus berupa dokumen teks (Word) atau PDF");
      return;
    }
    setErrorFiles(false);
    setErrorMessage("");
    setBanner(file[0]);
  };

  const handleDeletePoster = () => {
    setBanner(null);
    setPreview(undefined);
    setUserFile(undefined);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    errorFiles,
    preview,
    banner,
    errorMessage,
  };
};

export default useUploadFile;
