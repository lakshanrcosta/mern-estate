import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../utils/firebase';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleFileOnChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setError('Avatar upload size limit exceeded. Only 2MB is allowed');
      return;
    }

    if (file.type.split('/')[0] !== 'image') {
      setError('Invalid file type selected. Only images are allowed');
      return;
    }

    const storage = getStorage(app);
    const fileName = `${file.name.split('.')[0]}-${new Date().getTime()}.${
      file.name.split('.')[1]
    }`;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (uploadError) => {
        setError(uploadError.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={handleFileOnChange} type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src={currentUser.avatar}
          alt=""
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center">
          {uploadPercentage > 0 && uploadPercentage < 100 && (
            <span className="text-blue-700">{`Uploading avatar ${uploadPercentage}%`}</span>
          )}
          {uploadPercentage === 100 && (
            <span className="text-green-700">Avatar successfully uploaded</span>
          )}
        </p>
        <input
          type="text"
          placeholder="Display Name"
          id="displayName"
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          required
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-80">
          Update profile data
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-bold">Delete Account</span>
        <span className="text-green-700 cursor-pointer font-bold">Change Password</span>
        <span className="text-red-700 cursor-pointer font-bold">Sign Out</span>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Profile;
