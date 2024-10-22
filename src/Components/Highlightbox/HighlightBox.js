import { Node, mergeAttributes } from '@tiptap/core';

let enterCount = 0;
export const HighlightBox = Node.create({
  name: 'highlightBox',

  group: 'block',

  content: 'inline*', // This allows inline content (text, images, etc.) within the box

  addAttributes() {
    return {
      color: {
        default: 'yellow', // Default color
      },
      borderRadius: {
        default: '5px', // Default border radius
      },
    };
   
  },

  parseHTML() {
    return [{ tag: 'div[data-type="highlightBox"]' }];
  },
  // if in addAttributes already some properties have been defined , then why in mergeAttributes others also have been defined.
  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'highlightBox',
        style: `border: 2px solid ${HTMLAttributes.color}; background-color: ${HTMLAttributes.color}; padding: 10px; border-radius: ${HTMLAttributes.borderRadius}; margin: 0;`,
      }),
      0, // The 0 means it's a placeholder for the content
    ];
  },
  
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, commands } = editor; // destructuring of the editor object
        const { selection } = state;
        const { $from } = selection;
  
        // Increment the counter on each Enter press
        enterCount += 1;
        console.log(enterCount);
        // If Enter is pressed twice, exit the highlight box without deleting content
        if (enterCount === 2) {
          const node = $from.node($from.depth);
          console.log(enterCount);
          console.log("Helo")
  
          // Check if the current node is a highlightBox
          if (node.type.name === 'highlightBox') {
            commands.splitBlock();
            enterCount = 0; // Reset the counter after exiting
            return true; // Prevent default behavior
          }
        }

        // Reset enterCount if only one Enter was pressed
        setTimeout(() => {
          enterCount = 0;
        }, 500); // Reset after 500ms if no double Enter
  
        // Otherwise, insert a new line and stay within the highlight box
        return commands.insertContent('<br>');
      },
    };
  },
  


  addCommands() {
    return {
      addHighlightBox: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },

      wrapSelectedTextInHighlightBox: (color) => ({ commands, state }) => {
        const { selection } = state;
      
        // Check if there's a selection
        if (selection.empty) {
          console.log("No text selected to highlight.");
          return false; // Or handle accordingly
        }
      
        const { from, to } = selection; // Get the selected text range
      
        // Create a highlight box node by passing JSON content
        const highlightNode = {
          type: this.name,
          attrs: { color }, // Pass the color as an attribute
          content: [{ type: 'text', text: state.doc.textBetween(from, to) }] // Text content inside the node
        };
      
        console.log(state.doc.textBetween(from, to));

        commands.deleteRange({ from, to });
      
        // Replace the selected text with the highlight box node
        commands.insertContentAt(from, highlightNode); // Pass the node's JSON representation
   
        return true; // Indicate success
      },
      
    };
  },
});



