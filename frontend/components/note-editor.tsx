"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface NoteEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function NoteEditor({ value, onChange, placeholder }: NoteEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex gap-1 mb-2">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${
            !isPreview ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${
            isPreview ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Preview
        </button>
      </div>

      {isPreview ? (
        <div className="min-h-[80px] p-3 border rounded-lg bg-muted/50 prose prose-sm max-w-none">
          {value ? (
            <div className="whitespace-pre-wrap text-foreground text-sm">{value}</div>
          ) : (
            <div className="text-muted-foreground italic text-sm">Nothing to preview</div>
          )}
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[80px] rounded-lg border resize-none text-sm"
        />
      )}
    </div>
  )
}
