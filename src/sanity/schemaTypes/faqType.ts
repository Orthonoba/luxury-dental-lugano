import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      title: 'Answer',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Dental Treatments', value: 'dental' },
          { title: 'Facial Treatments', value: 'facial' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Appointments', value: 'appointments' },
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
