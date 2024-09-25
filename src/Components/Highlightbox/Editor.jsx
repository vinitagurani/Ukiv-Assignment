import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HighlightBox } from './HighlightBox'; // Import the custom extension
import './HighlightBox.css'

const MyEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HighlightBox, // Register the custom HighlightBox extension
    ],
    content: '',
  });

  // Function to insert a highlight box
  const addHighlightBox = (color) => {
    editor.chain().focus().addHighlightBox({ color }).run();
  };

  return (
    <div className="editor-buttons">
      <button onClick={() => addHighlightBox('lightgreen')}>Add Green Highlight</button>
      <button onClick={() => addHighlightBox('yellow')}>Add Yellow Highlight</button>
      <button onClick={() => addHighlightBox('lightpink')}>Add Pink Highlight</button>
      <div  className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MyEditor;


