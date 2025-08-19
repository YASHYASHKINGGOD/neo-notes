import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
// Using custom floating toolbar instead of BubbleMenu extension
import { SlashCommandExtension, slashCommandSuggestion } from './SlashCommandExtension';
import { 
  Bold, 
  Italic, 
  Strikethrough,
  Underline as UnderlineIcon,
  Highlighter as HighlightIcon,
  Link as LinkIcon,
  Table as TableIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Type,
  Palette,
  Image as ImageIcon,
  Video,
  ChevronDown,
  Zap
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
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  
  if (!editor) return null;

  const fonts = [
    'Inter, system-ui, sans-serif',
    'Roboto, sans-serif',
    'Poppins, sans-serif',
    'Open Sans, sans-serif',
    'Lato, sans-serif',
    'Montserrat, sans-serif',
    'Source Sans Pro, sans-serif',
    'JetBrains Mono, monospace',
    'Fira Code, monospace',
    'Georgia, serif',
    'Times New Roman, serif',
    'Playfair Display, serif'
  ];

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff8c00', '#9932cc',
    '#32cd32', '#ff1493', '#00bfff', '#ffd700', '#ff6347'
  ];

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    const rows = parseInt(prompt('Number of rows:') || '3');
    const cols = parseInt(prompt('Number of columns:') || '3');
    const withHeader = confirm('Include header row?');
    
    if (rows > 0 && cols > 0) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: withHeader }).run();
    }
    setShowTableMenu(false);
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addVideo = () => {
    const url = window.prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
    }
  };

  const setHighlight = (color: string = '#ffff00') => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  };

  const setFontFamily = (font: string) => {
    editor.chain().focus().setFontFamily(font).run();
    setShowFontSelector(false);
  };

  const addTableRow = () => {
    editor.chain().focus().addRowAfter().run();
    setShowTableMenu(false);
  };

  const addTableColumn = () => {
    editor.chain().focus().addColumnAfter().run();
    setShowTableMenu(false);
  };

  const deleteTableRow = () => {
    editor.chain().focus().deleteRow().run();
    setShowTableMenu(false);
  };

  const deleteTableColumn = () => {
    editor.chain().focus().deleteColumn().run();
    setShowTableMenu(false);
  };


  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b-2 border-[var(--border-main)]">
      {/* Font Family */}
      <div className="relative">
        <button
          onClick={() => setShowFontSelector(!showFontSelector)}
          className="editor-btn flex items-center gap-1"
          title="Font Family"
        >
          <Type size={14} />
          <ChevronDown size={12} />
        </button>
        {showFontSelector && (
          <div className="absolute top-8 left-0 z-50 neo-container p-2 min-w-[200px]">
            {fonts.map((font) => (
              <button
                key={font}
                onClick={() => setFontFamily(font)}
                className="block w-full text-left p-2 text-xs hover:bg-[var(--bg-tertiary)] rounded"
                style={{ fontFamily: font }}
              >
                {font.split(',')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="editor-btn flex items-center gap-1"
          title="Text Color"
        >
          <Palette size={14} />
          <ChevronDown size={12} />
        </button>
        {showColorPicker && (
          <div className="absolute top-8 left-0 z-50 neo-container p-2">
            <div className="grid grid-cols-5 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  className="w-6 h-6 border border-[var(--border-main)] rounded"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-[var(--border-main)]" />

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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`editor-btn ${editor.isActive('underline') ? 'active' : ''}`}
          title="Underline"
        >
          <UnderlineIcon size={14} />
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
          onClick={() => setHighlight()}
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

      {/* Headings */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`editor-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`editor-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`editor-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
          title="Heading 3"
        >
          H3
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

      {/* Media & Links */}
      <div className="flex items-center gap-1">
        <button
          onClick={addLink}
          className={`editor-btn ${editor.isActive('link') ? 'active' : ''}`}
          title="Add Link"
        >
          <LinkIcon size={14} />
        </button>
        <button
          onClick={addImage}
          className="editor-btn"
          title="Insert Image"
        >
          <ImageIcon size={14} />
        </button>
        <button
          onClick={addVideo}
          className="editor-btn"
          title="Insert YouTube Video"
        >
          <Video size={14} />
        </button>
      </div>

      <div className="w-px h-6 bg-[var(--border-main)]" />

      {/* Table Management */}
      <div className="relative">
        <button
          onClick={() => setShowTableMenu(!showTableMenu)}
          className="editor-btn flex items-center gap-1"
          title="Table Options"
        >
          <TableIcon size={14} />
          <ChevronDown size={12} />
        </button>
        {showTableMenu && (
          <div className="absolute top-8 left-0 z-50 neo-container p-2 min-w-[150px]">
            <button
              onClick={addTable}
              className="block w-full text-left p-2 text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              Insert Table
            </button>
            <button
              onClick={addTableRow}
              className="block w-full text-left p-2 text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              Add Row
            </button>
            <button
              onClick={addTableColumn}
              className="block w-full text-left p-2 text-xs hover:bg-[var(--bg-tertiary)] rounded"
            >
              Add Column
            </button>
            <button
              onClick={deleteTableRow}
              className="block w-full text-left p-2 text-xs hover:bg-[var(--accent-secondary)] hover:text-white rounded"
            >
              Delete Row
            </button>
            <button
              onClick={deleteTableColumn}
              className="block w-full text-left p-2 text-xs hover:bg-[var(--accent-secondary)] hover:text-white rounded"
            >
              Delete Column
            </button>
          </div>
        )}
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

      <div className="w-px h-6 bg-[var(--border-main)]" />

      {/* Slash Commands Info */}
      <div className="flex items-center gap-1">
        <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
          <Zap size={12} />
          Type / for commands
        </div>
      </div>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  className = ""
}) => {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const editor: any = useEditor({
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
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        HTMLAttributes: {
          class: 'editor-youtube',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      SlashCommandExtension.configure({
        suggestion: slashCommandSuggestion,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to, empty } = editor.state.selection;
      
      if (!empty) {
        // Text is selected, show floating menu
        const { view } = editor;
        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);
        
        setMenuPosition({
          top: start.top - 50,
          left: (start.left + end.left) / 2 - 100,
        });
        setShowFloatingMenu(true);
      } else {
        // No selection, hide menu
        setShowFloatingMenu(false);
      }
    },
    editorProps: {
      attributes: {
        class: 'rich-text-editor',
        style: 'font-family: var(--font-family, Inter, system-ui, sans-serif)',
      },
      handleKeyDown: (_view: any, event: KeyboardEvent): boolean => {
        // Handle Tab key for indentation
        if (event.key === 'Tab') {
          event.preventDefault();
          if (event.shiftKey) {
            // Shift+Tab - outdent
            return editor.commands.liftListItem('listItem') || editor.commands.outdent();
          } else {
            // Tab - indent
            return editor.commands.sinkListItem('listItem') || editor.commands.indent();
          }
        }
        return false;
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
      <EditorContent 
        editor={editor} 
        className="rich-text-content"
        style={{ minHeight: '200px' }}
      />
      
      {/* Custom Floating Toolbar */}
      {showFloatingMenu && editor && (
        <div
          className="fixed z-50 bg-[var(--bg-secondary)] border-2 border-[var(--border-main)] shadow-lg rounded-lg p-2 flex items-center gap-1"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            boxShadow: '4px 4px 0 0 #000',
          }}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`editor-btn ${editor.isActive('bold') ? 'active' : ''}`}
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`editor-btn ${editor.isActive('italic') ? 'active' : ''}`}
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`editor-btn ${editor.isActive('underline') ? 'active' : ''}`}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`editor-btn ${editor.isActive('strike') ? 'active' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={14} />
          </button>
          
          <div className="w-px h-6 bg-[var(--border-main)]" />
          
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`editor-btn ${editor.isActive('highlight') ? 'active' : ''}`}
            title="Highlight"
          >
            <HighlightIcon size={14} />
          </button>
          <button
            onClick={() => {
              const url = window.prompt('Enter URL');
              if (url) {
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              }
            }}
            className={`editor-btn ${editor.isActive('link') ? 'active' : ''}`}
            title="Link"
          >
            <LinkIcon size={14} />
          </button>
        </div>
      )}
      
      {/* Hidden full toolbar for advanced features - shown via button */}
      <div className="hidden" id="full-toolbar">
        <EditorToolbar editor={editor} />
      </div>
      
      {/* Show advanced toolbar button */}
      <div className="p-2 text-center border-t-2" style={{ borderColor: 'var(--border-main)' }}>
        <button
          onClick={() => {
            const toolbar = document.getElementById('full-toolbar');
            if (toolbar) {
              toolbar.classList.toggle('hidden');
            }
          }}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1 mx-auto"
        >
          <Zap size={12} />
          Advanced Tools & Commands (Type / for quick commands)
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;