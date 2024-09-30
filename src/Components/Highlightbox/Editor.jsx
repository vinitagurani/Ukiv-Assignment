import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HighlightBox } from './HighlightBox'; // Import the custom extension
import './HighlightBox.css'
import { useEffect, useState } from 'react';

const MyEditor = () => {

  const [lastUsedColor, setLastUsedColor] = useState('yellow'); 
  const editor = useEditor({
    extensions: [
      StarterKit,
      HighlightBox, // Register the custom HighlightBox extension
    ],
    content: '',
  });


  useEffect(() => {
    if (editor) {
      editor.commands.focus(); // Focus the editor
    }
  }, [editor]); // Only run when the editor is initialized


  const addHighlightBox = (color) => {
    setLastUsedColor(color);
    editor.chain().focus().addHighlightBox({ color }).run();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // On pressing "Enter", add a new highlight box of the same color
      addHighlightBox(lastUsedColor);
      event.preventDefault(); // Prevent default behavior
    }
  };
  
  return (
    <>
      <div className="editor-buttons">
        <button onClick={() => addHighlightBox('lightgreen')}>Add Green Highlight</button>
        <button onClick={() => addHighlightBox('yellow')}>Add Yellow Highlight</button>
        <button onClick={() => addHighlightBox('lightpink')}>Add Pink Highlight</button>
      </div>
        <EditorContent className = "custom-editor" editor={editor} onKeyDown={handleKeyDown}/>
     </>
  );
};

export default MyEditor;



