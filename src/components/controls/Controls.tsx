import axios from "axios";
import { useState } from "react";

const Controls = () => {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isFileUploaded, setIsfileUploaded] = useState(false);
  const [isCsvFile, setIsCsvFile] = useState(false);
  const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true);

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
      } else {
        console.log(`invalid file format .${fileformat}`);
      }
    } else {
      console.log(`no file uploaded`);
      setIsfileUploaded(false);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (isCsvFile && !isFileUploadDisabled) {
      const uploadedFile = e.target.fileUploadInput.files[0];
      const fileUploadRes = await uploadFile(uploadedFile);

      console.log("FILE UPLOAD RESPONSE: ");
      console.log(fileUploadRes);
    }
  };

  const handleClearData = async () => {
    try {
      const { data: fileClearedData } = await axios.get(FILE_CLEAR_URL);
      console.log("fileClearedData: ", fileClearedData);
    } catch (err) {
      console.log("Error removing data ");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="border-gray-400 border-2 p-2  my-4 rounded-md flex items-center justify-start gap-10"
    >
      <div>
        <button
          onClick={handleClearData}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Clear Data
        </button>
      </div>

      <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        <button>
          <input
            type="file"
            name="fileUploadInput"
            id="fileUploadContainer"
            onChange={(e) => {
              verifyFileUpload(e);
            }}
          />
        </button>
      </div>
      <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <button
          id="uploadDataButton"
          disabled={isFileUploadDisabled}
          onClick={() => {}}
          type="submit"
        >
          Upload Data {isFileUploadDisabled ? "(Disabled)" : "(Enabled)"}
        </button>
      </div>
    </form>
  );
};

export default Controls;