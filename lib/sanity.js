import createSanityClient from '@sanity/client'
import sanityImage from '@sanity/image-url'

const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET, // Updated to match .env.local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Updated to match .env.local
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

export const sanityClient = createSanityClient(options)
export const imageBuilder = sanityImage(sanityClient)

export function createPreviewClient(token) {
  return createSanityClient({
    ...options,
    useCdn: false,
    token,
  })
}

export function getSanityClient(preview) {
  if (preview?.active) {
    return createPreviewClient(preview.token)
  } else {
    return sanityClient
  }
}
