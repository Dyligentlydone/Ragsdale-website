"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileIcon, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface UploadedFile {
  file: File
  preview?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  })
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 100 * 1024 * 1024,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
      "application/pdf": [".pdf"],
      "application/postscript": [".ai", ".eps"],
      "application/illustrator": [".ai"],
      "application/x-indesign": [".indd"],
      "application/vnd.adobe.photoshop": [".psd"],
      "application/zip": [".zip"],
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formDataToSend = new FormData()
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      files.forEach((uploadedFile) => {
        formDataToSend.append("files", uploadedFile.file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        message: "",
      })
      setFiles([])
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const totalSize = files.reduce((acc, { file }) => acc + file.size, 0)
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type</Label>
        <Input
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          placeholder="e.g., Business Cards, Banners, Marketing Materials"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Details *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={6}
          placeholder="Tell us about your project, including quantity, size, timeline, one or two sided, and any specific requirements..."
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Files (Optional)</Label>
        <p className="text-sm text-zinc-500 mb-2">
          Upload your design files, logos, or reference images. Accepted formats: PDF, AI, EPS, PSD, INDD, PNG, JPG, JPEG, SVG, GIF, WEBP, ZIP (Max 100MB per file)
        </p>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-zinc-800 bg-zinc-950/50 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-500" />
          {isDragActive ? (
            <p className="text-zinc-300">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-zinc-300 mb-2">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-sm text-zinc-500">
                Up to 100MB per file
              </p>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-white">
                {files.length} file{files.length > 1 ? "s" : ""} selected ({totalSizeMB} MB)
              </p>
            </div>
            {files.map((uploadedFile, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-900 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <FileIcon className="w-12 h-12 text-zinc-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 hover:bg-zinc-800 rounded"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg">
          <CheckCircle2 className="w-5 h-5" />
          <p>Thank you! We've received your message and will get back to you soon.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
          <X className="w-5 h-5" />
          <p>There was an error submitting your form. Please try again or contact us directly.</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
