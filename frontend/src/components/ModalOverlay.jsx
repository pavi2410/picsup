import { useState } from "react";
import { HOST } from '../App';
import { useAuth } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalOverlay({ setmodalOverlay }) {
  const auth = useAuth();
  const [file, setFile] = useState(null);

  const uploadFile = () => {
    const formData = new FormData()
    formData.append(
      'uploaded_file',
      file
    )
    fetch(`${HOST}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${auth.user}`
      },
      body: formData
    })
      .then(res => {
        console.log("File Uploaded Sucessfully");
        toast("File Uploaded Sucessfully!!", { type: "success" });
        setFile(null);
        setmodalOverlay(false);
      })
      .catch(err => {
        console.log(err);
        toast("Some error occured! Try harder ;)", { type: "error" });
      });
  }
  return (
    <div className="fixed left-0 top-0 z-10 overflow-y-hidden w-full h-full flex justify-center align-center bg-green-200 backdrop-filter backdrop-blur-3xl bg-opacity-50">
      <div className="h-full w-full md:h-auto md:w-auto py-8 px-10 bg-white m-auto shadow-xl rounded-xl">
        <p className="font-bold text-2xl mb-16">Add a new photo</p>
        <div className="pb-16">
          <label
            className="md:w-96 flex flex-col items-center px-4 py-6 bg-white font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
            <i className="fas fa-cloud-upload-alt fa-3x"></i>
            {file && <img className="max-h-64" src={URL.createObjectURL(file)} />}
            <span className="mt-2 text-base leading-normal">{file ? file.name : "Select a image"}</span>
            <input type='file' className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          {/* <input className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              aria-describedby="view_model_avatar_help" id="view_model_avatar" name="view_model[avatar]" }
              type="file"
            /> */}
        </div>
        <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
            onClick={() => setmodalOverlay(false)}
          >
            Close
          </button>
          <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={uploadFile}>
            Upload
          </button>
        </div>
      </div>
    </div>

  )
}