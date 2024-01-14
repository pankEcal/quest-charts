import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { errorTost, laodingTost, successTost } from "../../utils/toast.util";

const Controls = () => {
  const [isFileUploaded, setIsfileUploaded] = useState(false);
  const [isCsvFile, setIsCsvFile] = useState(false);
  const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const FILE_UPLOAD_URL = "http://localhost:3333/quest/upload/csv";
  const FILE_CLEAR_URL = "http://localhost:3333/quest/clear/csv";

  const uploadFile = (fileData: any) => {
    if (fileData) {
      const formData = new FormData();
      formData.append("csvfile", fileData);

      const fileUploadRes = new Promise((resolve, reject): any => {
        axios
          .post(FILE_UPLOAD_URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response: any) => {
            // handle the response
            const { data } = response;

            if (data.success) {
              setIsfileUploaded(true);
              resolve(data);
            } else {
              reject(null);
            }
          })
          .catch((error) => {
            // handle errors
            errorTost(`${uploadedFileName} upload failed`);
            console.log(error);
            reject(null);
          });
      });

      return fileUploadRes;
    } else {
      console.log("FILE DATA MISSING");
      return null;
    }
  };

  const verifyFileUpload = (e: any) => {
    e.preventDefault();
    const fileName: string = String(e?.target?.files[0].name);

    if (fileName.length > 1) {
      setIsfileUploaded(true);
      const _ = fileName.split(".");
      const fileformat = _[_.length - 1];
      if (fileformat === "csv") {
        setIsCsvFile(true);
        setIsFileUploadDisabled(false);
        setUploadedFileName(fileName);
        successTost(`valid file format .${fileformat}`);
      } else {
        setIsCsvFile(false);
        setIsFileUploadDisabled(true);
        errorTost(`invalid file format .${fileformat}`);
        console.log(`invalid file format .${fileformat}`);
      }
    } else {
      errorTost(`no file uploaded`);
      console.log(`no file uploaded`);
      setIsfileUploaded(false);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (isFileUploaded && isCsvFile && !isFileUploadDisabled) {
      const uploadTost = laodingTost(`Uploading ${uploadedFileName}`);
      const uploadedFile = e.target.fileUploadInput.files[0];
      const fileUploadRes = await uploadFile(uploadedFile);

      if (fileUploadRes) {
        toast.dismiss(uploadTost);
        successTost(`${uploadedFileName} uploaded successfully`);
      } else {
        toast.dismiss(uploadTost);
        errorTost(`${uploadedFileName} upload failed`);
      }
    }
  };

  const handleClearData = async () => {
    const dataClearingTost = laodingTost("Clearing QuestDB data!");
    try {
      await axios.get(FILE_CLEAR_URL);
      toast.dismiss(dataClearingTost);
      successTost("successfully cleared QuestDB data!");
    } catch (err) {
      toast.dismiss(dataClearingTost);
      errorTost("Error clearing QuestDB data");
      console.log("Error clearing QuestDB data");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="border-gray-400 border-2 p-2  my-4 rounded-md flex items-center justify-start gap-14"
    >
      <div>
        <Toaster />
        <button
          onClick={handleClearData}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Clear Data
        </button>
      </div>

      <div className="flex items-center justify-center gap-1">
        <div>
          <button
            className="bg-green-600 hover:bg-green-700 text-gray-100 font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded cursor-pointer"
            id="uploadDataButton"
            disabled={isFileUploadDisabled}
            onClick={() => {}}
            type="submit"
          >
            Upload Data {isFileUploadDisabled ? "(Disabled)" : "(Enabled)"}
          </button>
        </div>

        <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          <input
            type="file"
            name="fileUploadInput"
            id="fileUploadContainer"
            onChange={(e) => {
              verifyFileUpload(e);
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default Controls;
