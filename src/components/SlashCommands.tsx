import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Type, 
  List, 
  ListOrdered, 
  Code, 
  Quote,
  Image,
  Video,
  Table,
  Minus
} from 'lucide-react';

export interface SlashCommand {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: (editor: any) => void;
}

interface SlashCommandsProps {
  editor: any;
  range?: any;
}

export interface SlashCommandsRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const SlashCommands = forwardRef<SlashCommandsRef, SlashCommandsProps>(({ editor, range }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: SlashCommand[] = [
    {
      id: 'paragraph',
      title: 'Text',
      description: 'Start writing with plain text',
      icon: <Type size={16} />,
      action: (editor) => editor.chain().focus().setParagraph().run(),
    },
    {
      id: 'heading-1',
      title: 'Heading 1',
      description: 'Large section heading',
      icon: <Heading1 size={16} />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      id: 'heading-2',
      title: 'Heading 2',
      description: 'Medium section heading',
      icon: <Heading2 size={16} />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      id: 'heading-3',
      title: 'Heading 3',
      description: 'Small section heading',
      icon: <Heading3 size={16} />,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Create a simple bullet list',
      icon: <List size={16} />,
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
      id: 'numbered-list',
      title: 'Numbered List',
      description: 'Create a list with numbering',
      icon: <ListOrdered size={16} />,
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      id: 'blockquote',
      title: 'Quote',
      description: 'Capture a quote or citation',
      icon: <Quote size={16} />,
      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      id: 'code-block',
      title: 'Code Block',
      description: 'Display code with syntax highlighting',
      icon: <Code size={16} />,
      action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      id: 'image',
      title: 'Image',
      description: 'Upload or embed an image',
      icon: <Image size={16} />,
      action: (editor) => {
        const url = window.prompt('Enter image URL');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Embed a YouTube video',
      icon: <Video size={16} />,
      action: (editor) => {
        const url = window.prompt('Enter YouTube URL');
        if (url) {
          editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
        }
      },
    },
    {
      id: 'table',
      title: 'Table',
      description: 'Insert a table',
      icon: <Table size={16} />,
      action: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      id: 'divider',
      title: 'Divider',
      description: 'Insert a horizontal rule',
      icon: <Minus size={16} />,
      action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
  ];

  const executeCommand = (command: SlashCommand) => {
    if (range) {
      editor.chain().focus().deleteRange(range).run();
    }
    command.action(editor);
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex + commands.length - 1) % commands.length);
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % commands.length);
        return true;
      }

      if (event.key === 'Enter') {
        executeCommand(commands[selectedIndex]);
        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  return (
    <div className="neo-container p-2 w-80 max-h-80 overflow-y-auto">
      <div className="text-xs font-semibold mb-2 text-[var(--text-muted)] uppercase tracking-wide">
        Quick Actions
      </div>
      {commands.map((command, index) => (
        <button
          key={command.id}
          onClick={() => executeCommand(command)}
          className={`w-full flex items-center gap-3 p-2 text-left text-sm rounded hover:bg-[var(--bg-tertiary)] ${
            index === selectedIndex ? 'bg-[var(--bg-tertiary)]' : ''
          }`}
        >
          <div 
            className="flex-shrink-0"
            style={{ color: 'var(--icon-color)' }}
          >
            {command.icon}
          </div>
          <div className="flex-1">
            <div className="font-medium">{command.title}</div>
            <div className="text-xs text-[var(--text-muted)]">{command.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
});

SlashCommands.displayName = 'SlashCommands';

export default SlashCommands;