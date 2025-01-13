import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Code, Unlink } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4',
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4',
          },
        },
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        validate: href => /^https?:\/\//.test(href),
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[150px]',
      },
    },
  });

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Add https if no protocol is specified
    const validUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    editor?.chain().focus().extendMarkRange('link').setLink({ href: validUrl }).run();
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  const addIframe = () => {
    const url = window.prompt('Enter embed URL (e.g., YouTube embed URL)');
    if (url) {
      const iframe = `<iframe src="${url}" frameborder="0" allowfullscreen class="w-full aspect-video rounded-lg mb-4"></iframe>`;
      editor?.chain().focus().insertContent(iframe).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
        {editor.isActive('link') && (
          <button
            onClick={removeLink}
            className="p-2 rounded hover:bg-gray-100"
            title="Remove Link"
          >
            <Unlink size={18} />
          </button>
        )}
        <button
          onClick={addIframe}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Embed (iframe)"
        >
          <Code size={18} />
        </button>
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}