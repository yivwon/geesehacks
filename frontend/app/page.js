"use client"

import { useState } from "react"
import { AppProvider } from "../context/AppContext"
import FileUpload from "../components/FileUpload"
import ProcessingStatus from "../components/ProcessingStatus"
import LeadSheet from "../components/LeadSheet"
import AudioPlayer from "../components/AudioPlayer"

export default function Home() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [leadSheet, setLeadSheet] = useState(null)

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile)
    setIsProcessing(true)
    // TODO: Implement backend call to process the file
    // For now, we'll simulate processing with a timeout
    setTimeout(() => {
      setIsProcessing(false)
      setLeadSheet({
        melody: "C2 D2 | E2 F2 | G2 A2 | B2 C'2 |",
        chords: '"C"C2 "Dm"D2 | "Em"E2 "F"F2 | "G"G2 "Am"A2 | "B°"B2 "C"C\'2 |',
      })
    }, 3000)
  }

  return (
    <AppProvider>
      <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">MP3 to Lead Sheet Generator</h1>
            {!file && <FileUpload onFileUpload={handleFileUpload} />}
            {isProcessing && <ProcessingStatus />}
            {leadSheet && (
              <>
                <LeadSheet melody={leadSheet.melody} chords={leadSheet.chords} />
                <AudioPlayer file={file} leadSheet={leadSheet} />
              </>
            )}
          </div>
        </div>
      </main>
    </AppProvider>
  )
}

