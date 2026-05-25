import { defineField, defineType } from 'sanity'
import { StarFilledIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarFilledIcon,
  fields: [
    defineField({
      name: 'patientName',
      type: 'string',
      title: 'Patient Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating (1–5)',
      initialValue: 5,
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'Testimonial Text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'treatment',
      type: 'string',
      title: 'Treatment Received (optional)',
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      title: 'Published At',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured?',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'patientName', subtitle: 'treatment' },
  },
})
