import { Node, mergeAttributes } from '@tiptap/core';

export const HighlightBox = Node.create({
  name: 'highlightBox',

  group: 'block',

  content: 'inline*', // This allows inline content (text, images, etc.) within the box

  addAttributes() {
    return {
      color: {
        default: 'yellow', // Default color for the highlight box
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="highlightBox"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'highlightBox',
        style: `border: 2px solid ${HTMLAttributes.color}; background-color: ${HTMLAttributes.color}; padding: 10px;`,
      }),
      ['div', 0], // The 0 means it's a placeholder for the content
    ];
  },

  addCommands() {
    return {
      addHighlightBox: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});



