import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const doctorType = defineType({
  name: 'doctor',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Title',
    }),
    defineField({
      name: 'initials',
      type: 'string',
      title: 'Initials (fallback avatar)',
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Biography',
      rows: 5,
    }),
    defineField({
      name: 'credentials',
      type: 'array',
      title: 'Credentials / Specialties',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
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
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
