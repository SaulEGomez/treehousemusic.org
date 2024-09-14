export default {
    title: 'Section',
    name: 'section',
    type: 'document',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string',
        validation: Rule => Rule.required(),
      },
      {
        title: 'Content',
        name: 'content',
        type: 'array',
        of: [{ type: 'block' }],
      },
    ],
  };
  