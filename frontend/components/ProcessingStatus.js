import { motion } from "framer-motion"

export default function ProcessingStatus() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Processing your audio file...</p>
    </motion.div>
  )
}

