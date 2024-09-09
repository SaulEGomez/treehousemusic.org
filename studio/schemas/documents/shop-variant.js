import React from 'react'
import { Copy } from 'phosphor-react'

export default {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  fieldsets: [
    {
      title: '',
      name: '2up',
      options: { columns: 2 }
    }
  ],
  icon: () => <Copy />,
  fields: [
    {
      title: 'Display Title',
      name: 'title',
      type: 'string',
      description:
        'Shown where variant names appear (for example: Above the product title in the cart)',
      group: 'content'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    },
    {
      title: 'Options Settings',
      name: 'options',
      type: 'array',
      of: [{ type: 'productOptionSettings' }],
      description: 'Define additional settings for product options',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title ?? '(Untitled Variant)'
      }
    }
  }
}
