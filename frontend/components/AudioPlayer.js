"use client"

import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"

export default function AudioPlayer({ file, leadSheet }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (file && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
        cursorColor: "navy",
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
      })

      wavesurfer.current.loadBlob(file)

      wavesurfer.current.on("play", () => setIsPlaying(true))
      wavesurfer.current.on("pause", () => setIsPlaying(false))
      wavesurfer.current.on("seek", (progress) => {
        // TODO: Implement syncing with lead sheet
        console.log("Audio progress:", progress)
      })

      return () => wavesurfer.current.destroy()
    }
  }, [file])

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause()
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Audio Playback</h2>
      <div ref={waveformRef} />
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  )
}

