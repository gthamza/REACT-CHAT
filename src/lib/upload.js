import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Function to upload file to Firebase Storage
const upload = async (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(); // Get the Firebase Storage instance
    const date = new Date().getTime(); // Get a unique timestamp for the file name
    const storageRef = ref(storage, `images/${date}_${file.name}`); // Reference to the file path in storage

    // Start the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload progress and handle success or error
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done"); // Display upload progress
      },
      (error) => {
        reject("Something went wrong: " + error.code); // Handle any error in uploading
      },
      () => {
        // When upload is complete, get the download URL of the file
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Resolve the promise with the download URL
        });
      },
    );
  });
};

export default upload;
