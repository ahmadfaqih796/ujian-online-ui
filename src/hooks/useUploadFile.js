import { useEffect, useState } from "react";

const useUploadPhoto = (defaultPreview = undefined) => {
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState();
  const [pesan, setPesan] = useState();
  const [userPhoto, setUserPhoto] = useState(defaultPreview);

  useEffect(() => {
    if (!gambar) {
      if (userPhoto) {
        setPreview(defaultPreview);
        return;
      }
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(gambar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [gambar, userPhoto, defaultPreview]);

  const onSelectFile = (e) => {
    const file = e.target.files;

    if (!file || file.length === 0) {
      setGambar(undefined);
      return;
    }

    if (file[0].size > 2000000) {
      setGambar(undefined);
      setPesan("*File harus dibawah 2 MB");
      return;
    }

    const pattern = /image-*/;

    if (!file[0].type.match(pattern)) {
      setGambar(undefined);
      setPesan("*File harus berupa gambar");
      return;
    }
    setGambar(file[0]);
  };

  const handleDeletePoster = () => {
    setGambar(null);
    setPreview(undefined);
    setUserPhoto(undefined);
  };

  return {
    handleDeletePoster,
    onSelectFile,
    preview,
    gambar,
    pesan,
  };
};

export default useUploadPhoto;
