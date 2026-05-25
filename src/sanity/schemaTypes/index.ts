import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { treatmentType } from './treatmentType'
import { doctorType } from './doctorType'
import { galleryImageType } from './galleryImageType'
import { faqType } from './faqType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    treatmentType,
    doctorType,
    galleryImageType,
    faqType,
    testimonialType,
  ],
}
