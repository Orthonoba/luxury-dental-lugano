import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const treatmentType = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Dental', value: 'dental' },
          { title: 'Facial', value: 'facial' },
        ],
      },
    }),
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Badge / Tag (e.g. Signature, Premium)',
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (card/list view)',
      rows: 3,
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Full Description',
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefits (bullet points)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured?',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
})
