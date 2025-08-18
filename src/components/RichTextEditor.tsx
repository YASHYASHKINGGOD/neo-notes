import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { 
  Bold, 
  Italic, 
  Strikethrough,
  Highlighter as HighlightIcon,
  Link as LinkIcon,
  Table as TableIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

interface EditorToolbarProps {
  editor: any;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const setHighlight = () => {
    editor.chain().focus().toggleHighlight().run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b-2 border-[var(--border-main)]">
      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`editor-btn ${editor.isActive('bold') ? 'active' : ''}`}
          title="Bold"
        >
          <Bold size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`editor-btn ${editor.isActive('italic') ? 'active' : ''}`}
          title="Italic"
        >
          <Italic size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`editor-btn ${editor.isActive('strike') ? 'active' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={14} />
        </button>
        <button
          onClick={setHighlight}
          className={`editor-btn ${editor.isActive('highlight') ? 'active' : ''}`}
          title="Highlight"
        >
          <HighlightIcon size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`editor-btn ${editor.isActive('code') ? 'active' : ''}`}
          title="Inline Code"
        >
          <Code size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-[var(--border-main)]" />

      {/* Lists */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`editor-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
          title="Bullet List"
        >
          <List size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`editor-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
          title="Numbered List"
        >
          <ListOrdered size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`editor-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
          title="Quote"
        >
          <Quote size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-[var(--border-main)]" />

      {/* Advanced */}
      <div className="flex items-center gap-1">
        <button
          onClick={addLink}
          className={`editor-btn ${editor.isActive('link') ? 'active' : ''}`}
          title="Add Link"
        >
          <LinkIcon size={14} />
        </button>
        <button
          onClick={addTable}
          className="editor-btn"
          title="Insert Table"
        >
          <TableIcon size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-[var(--border-main)]" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="editor-btn"
          title="Undo"
        >
          <Undo size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="editor-btn"
          title="Redo"
        >
          <Redo size={14} />
        </button>
      </div>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  className = ""
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'rich-text-editor',
      },
    },
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`neo-rich-editor ${className}`}>
      <EditorToolbar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="rich-text-content"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default RichTextEditor;