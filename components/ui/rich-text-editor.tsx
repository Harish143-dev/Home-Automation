"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Link2,
  Unlink,
  Undo,
  Redo,
  Code2,
  RemoveFormatting,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  minHeight = "180px",
  className = "",
}: RichTextEditorProps) {
  const [showSource, setShowSource] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent underline font-normal hover:opacity-80 transition-opacity",
        },
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose max-w-none text-foreground font-light text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-0 ${minHeight}`,
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If editor only has an empty paragraph, consider it empty
      const isBlank = html === "<p></p>" || html.trim() === "";
      onChange(isBlank ? "" : html);
    },
  });

  // Synchronize external value updates (e.g. when opening edit modal)
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentHtml = editor.getHTML();
      if (value !== currentHtml && (value || currentHtml !== "<p></p>")) {
        editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
      }
    }
  }, [value, editor]);

  if (!isMounted || !editor) {
    return (
      <div
        className={`w-full rounded-xl border border-border bg-background p-4 animate-pulse flex items-center justify-center text-xs text-muted font-light ${className}`}
        style={{ minHeight }}
      >
        Loading rich text editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const toolbarBtnClass = (isActive: boolean) =>
    `p-1.5 sm:p-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center ${
      isActive
        ? "bg-secondary text-[#F1EBD9] shadow-xs"
        : "text-muted hover:text-foreground hover:bg-black/5"
    }`;

  return (
    <div
      className={`w-full rounded-xl border border-border bg-background overflow-hidden transition-all duration-200 focus-within:ring-1 focus-within:ring-accent focus-within:border-accent ${className}`}
    >
      {/* Editorial Toolbar */}
      <div className="bg-panel/90 border-b border-border/80 px-2 py-1.5 flex flex-wrap items-center justify-between gap-1 select-none">
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
          {/* Paragraph / Headings */}
          <button
            type="button"
            title="Normal Paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={toolbarBtnClass(editor.isActive("paragraph") && !editor.isActive("heading"))}
          >
            <Pilcrow size={14} />
          </button>

          <button
            type="button"
            title="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={toolbarBtnClass(editor.isActive("heading", { level: 2 }))}
          >
            <Heading2 size={14} />
          </button>

          <button
            type="button"
            title="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={toolbarBtnClass(editor.isActive("heading", { level: 3 }))}
          >
            <Heading3 size={14} />
          </button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          {/* Text Styling */}
          <button
            type="button"
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={toolbarBtnClass(editor.isActive("bold"))}
          >
            <Bold size={14} />
          </button>

          <button
            type="button"
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={toolbarBtnClass(editor.isActive("italic"))}
          >
            <Italic size={14} />
          </button>

          <button
            type="button"
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={toolbarBtnClass(editor.isActive("underline"))}
          >
            <UnderlineIcon size={14} />
          </button>

          <button
            type="button"
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={toolbarBtnClass(editor.isActive("strike"))}
          >
            <Strikethrough size={14} />
          </button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          {/* Lists & Quotes */}
          <button
            type="button"
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={toolbarBtnClass(editor.isActive("bulletList"))}
          >
            <List size={14} />
          </button>

          <button
            type="button"
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={toolbarBtnClass(editor.isActive("orderedList"))}
          >
            <ListOrdered size={14} />
          </button>

          <button
            type="button"
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={toolbarBtnClass(editor.isActive("blockquote"))}
          >
            <Quote size={14} />
          </button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          {/* Links */}
          <button
            type="button"
            title="Insert Link"
            onClick={setLink}
            className={toolbarBtnClass(editor.isActive("link"))}
          >
            <Link2 size={14} />
          </button>

          {editor.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors"
            >
              <Unlink size={14} />
            </button>
          )}

          <button
            type="button"
            title="Clear Formatting"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 sm:p-2 rounded-lg text-xs text-muted hover:text-foreground hover:bg-black/5 transition-colors"
          >
            <RemoveFormatting size={14} />
          </button>
        </div>

        {/* History & Source Toggle */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-xs text-muted hover:text-foreground hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Undo size={14} />
          </button>

          <button
            type="button"
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-xs text-muted hover:text-foreground hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Redo size={14} />
          </button>

          <div className="w-[1px] h-4 bg-border mx-1" />

          <button
            type="button"
            title={showSource ? "Switch to Visual Editor" : "Edit Raw HTML Source"}
            onClick={() => setShowSource(!showSource)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono tracking-wider transition-all flex items-center gap-1 border ${
              showSource
                ? "bg-accent text-white border-accent shadow-xs"
                : "bg-background text-muted hover:text-foreground border-border"
            }`}
          >
            <Code2 size={13} />
            <span>{showSource ? "Visual" : "HTML"}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Body */}
      {showSource ? (
        <textarea
          rows={8}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            editor.commands.setContent(e.target.value || "<p></p>", { emitUpdate: false });
          }}
          placeholder="Paste or write raw HTML code here..."
          className="w-full p-4 bg-background text-foreground font-mono text-xs leading-relaxed focus:outline-none border-none resize-y"
          style={{ minHeight }}
        />
      ) : (
        <div
          className="p-4 bg-background cursor-text min-w-0"
          onClick={() => editor.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      )}

      {/* Embedded TipTap styling rules */}
      <style jsx global>{`
        .tiptap {
          outline: none !important;
        }
        .tiptap p {
          margin-bottom: 0.75rem;
          line-height: 1.65;
        }
        .tiptap p:last-child {
          margin-bottom: 0;
        }
        .tiptap h2 {
          font-family: var(--font-display, serif);
          font-size: 1.35rem;
          font-weight: 400;
          line-height: 1.3;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--color-foreground, #111111);
        }
        .tiptap h3 {
          font-family: var(--font-display, serif);
          font-size: 1.15rem;
          font-weight: 400;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 0.4rem;
          color: var(--color-foreground, #111111);
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.4rem;
          margin-bottom: 0.75rem;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.4rem;
          margin-bottom: 0.75rem;
        }
        .tiptap li {
          margin-bottom: 0.25rem;
        }
        .tiptap blockquote {
          border-left: 3px solid var(--color-accent, #8c1817);
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          font-style: italic;
          color: var(--color-muted, #5f6856);
        }
        .tiptap a {
          color: var(--color-accent, #8c1817);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
