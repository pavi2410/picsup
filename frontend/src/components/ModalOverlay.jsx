import { useState, useEffect, useMemo } from "react";
import { HOST } from '../App';
import { useAuth } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ml5 from 'ml5'
import { FaCloudUploadAlt } from "react-icons/fa";

export default function ModalOverlay({ setmodalOverlay }) {
  const auth = useAuth();
  const classifier = useMemo(() => ml5.imageClassifier('MobileNet', { topk: 1 }), [])
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      classifier
        .then(it => it.classify(document.getElementById('img_file')))
        .then(result => {
          const predictions = [...new Set(result[0].label.replaceAll(',', '').split(' '))]
          console.log({ result, predictions })
          setTags(predictions);
        })
    }, 1000)
    return () => clearTimeout(timer);
  }, [file])

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('uploaded_file', file)
    formData.append('tags', tags)
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
      <div className="h-full w-full md:h-auto md:w-auto py-8 px-10 bg-white dark:bg-black dark:text-white m-auto shadow-xl rounded-xl">
        <p className="font-bold text-2xl mt-4 mb-8">Add a new photo</p>
        <div className="pb-16">
          <label
            className="md:w-96 flex flex-col items-center px-4 py-6 bg-white dark:bg-black font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
            {!file ? <FaCloudUploadAlt fontSize="3rem" /> : null}
            {file && <img className="max-h-64" src={URL.createObjectURL(file)} id="img_file" />}
            <span className="mt-2 text-base leading-normal">{file ? file.name : "Select a image"}</span>
            <input type='file' className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          {/* <input className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              aria-describedby="view_model_avatar_help" id="view_model_avatar" name="view_model[avatar]" }
              type="file"
            /> */}
        </div>
        <div className="py-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">{tag}</span>
          ))}
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