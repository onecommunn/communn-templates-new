"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Save,
  Trash2,
  Pencil,
  X,
  NotebookPen,
} from "lucide-react";

type Note = {
  id: string;
  html: string;
  createdAt: string;
};

export default function NotesPanel() {
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    immediatelyRender: false, // ✅ Fix TipTap SSR hydration mismatch
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none dark:prose-invert focus:outline-none min-h-[120px] px-3 py-2",
      },
    },
  });

  const canSave = useMemo(() => {
    const text = editor?.getText()?.trim() ?? "";
    return text.length > 0;
  }, [editor, editor?.getText()]);

  const resetEditor = () => {
    editor?.commands.setContent("<p>Write your note…</p>");
    setEditingId(null);
  };

  const onSave = () => {
    if (!editor) return;

    const text = editor.getText().trim();
    if (!text) return;

    const html = editor.getHTML();

    if (editingId) {
      setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, html } : n)));
    } else {
      setNotes((prev) => [
        {
          id: crypto.randomUUID(),
          html,
          createdAt: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }

    resetEditor();
  };

  const onEdit = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note || !editor) return;

    setEditingId(id);
    editor.commands.setContent(note.html);
  };

  const onDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) resetEditor();
  };

  // ✅ Prevent rendering editor until client mounted
  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-semibold">Notes</p>
        </div>

        <div className="rounded-2xl border bg-background p-4">
          <div className="h-4 w-40 bg-muted rounded mb-3" />
          <div className="h-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Notes</p>
        </div>
        <span className="text-xs text-muted-foreground">{notes.length} notes</span>
      </div>

      {/* Editor Card */}
      <div className="rounded-2xl border bg-background overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b bg-muted/40 p-2">
          <ToolBtn
            active={!!editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            label="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            label="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("underline")}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            label="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("strike")}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            label="Strike"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolBtn>

          <Divider />

          <ToolBtn
            active={!!editor?.isActive("heading", { level: 1 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            label="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("heading", { level: 2 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            label="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolBtn>

          <Divider />

          <ToolBtn
            active={!!editor?.isActive("bulletList")}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            label="Bullets"
          >
            <List className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("orderedList")}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            label="Numbered"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolBtn>

          <Divider />

          <ToolBtn
            active={!!editor?.isActive("blockquote")}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            label="Quote"
          >
            <Quote className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            active={!!editor?.isActive("code")}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            label="Inline code"
          >
            <Code className="h-4 w-4" />
          </ToolBtn>

          <div className="flex-1" />

          <ToolBtn
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            label="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </ToolBtn>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} placeholder="Write your note…"/>

        {/* Actions */}
        <div className="flex items-center justify-between border-t p-2">
          <div className="flex items-center justify-end w-full gap-2">
            {editingId && (
              <button
                onClick={resetEditor}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted transition"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}

            <button
              onClick={onSave}
              disabled={!canSave}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition ${
                canSave
                  ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Save className="h-4 w-4" />
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 && (
          <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No notes yet. Save your first note above ✍️
          </div>
        )}

        {notes.map((n) => (
          <div key={n.id} className="rounded-2xl border bg-background p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs text-muted-foreground">{n.createdAt}</span>

              <div className="flex items-center gap-1">
                <IconBtn onClick={() => onEdit(n.id)} label="Edit">
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn onClick={() => onDelete(n.id)} label="Delete">
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>

            <div
              className="prose prose-sm max-w-none dark:prose-invert mt-2"
              dangerouslySetInnerHTML={{ __html: n.html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-border" />;
}

function ToolBtn({
  children,
  onClick,
  active,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`h-9 w-9 inline-flex items-center justify-center rounded-lg border transition
        ${active ? "bg-background" : "bg-transparent"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-background"}
      `}
    >
      {children}
    </button>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-8 w-8 rounded-lg border hover:bg-muted flex items-center justify-center transition"
    >
      {children}
    </button>
  );
}
