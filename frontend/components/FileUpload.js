import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"

export default function FileUpload({ onFileUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "audio/mpeg",
    multiple: false,
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ease-in-out ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the MP3 file here...</p>
        ) : (
          <p className="text-gray-500">Drag and drop an MP3 file here, or click to select a file</p>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500 text-center">
        For optimal transcription, use audio files with minimal background noise.
      </p>
    </motion.div>
  )
}

