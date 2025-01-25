"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import abcjs from "abcjs"

export default function LeadSheet({ melody, chords }) {
  const sheetMusicRef = useRef(null)

  useEffect(() => {
    if (sheetMusicRef.current) {
      const abcNotation = `
X:1
T:Generated Lead Sheet
M:4/4
L:1/4
K:C
${chords}
${melody}
`
      abcjs.renderAbc(sheetMusicRef.current, abcNotation, {
        responsive: "resize",
      })
    }
  }, [melody, chords])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-4 border rounded-lg bg-white"
    >
      <h2 className="text-2xl font-semibold mb-4">Generated Lead Sheet</h2>
      <div ref={sheetMusicRef} className="mb-4"></div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => {
          /* TODO: Implement PDF download */
        }}
      >
        Download PDF
      </button>
    </motion.div>
  )
}

