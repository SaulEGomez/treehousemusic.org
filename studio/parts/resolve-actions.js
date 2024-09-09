import React, { useState } from 'react'
import axios from 'axios'

import sanityClient from 'part:@sanity/base/client'

import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
  DeleteAction,
} from 'part:@sanity/base/document-actions'

import { useToast } from '@sanity/ui'
import { EyeOpenIcon, BasketIcon, SyncIcon } from '@sanity/icons'

const singletons = [
  'generalSettings',
  'cookieSettings',
  'promoSettings',
  'headerSettings',
  'footerSettings',
  'shopSettings',
  'seoSettings',
]

const editAndDelete = ['product', 'productVariant']

const previews = ['page', 'product', 'collection']

const PreviewAction = (props) => {
  const slug = props.draft
    ? props.draft.slug?.current
    : props.published?.slug?.current

  return {
    label: 'Open Preview',
    icon: EyeOpenIcon,
    onHandle: async () => {
      const localURL = 'http://localhost:3000'
      const remoteURL = await sanityClient.fetch(
        '*[_type == "generalSettings"][0].siteURL'
      )

      const frontendURL =
        window.location.hostname === 'localhost' ? localURL : remoteURL

      window.open(
        `${frontendURL}/api/preview?token=HULL&type=${props.type}&slug=${
          slug || ''
        }`
      )
    },
  }
}

export default function resolveDocumentActions(props) {
  const isSingle = singletons.indexOf(props.type) > -1
  const canEditDelete = editAndDelete.indexOf(props.type) > -1
  const canPreview = previews.indexOf(props.type) > -1
  const isProduct = props.type === 'product'

  if (isSingle) {
    return [
      PublishAction,
      DiscardChangesAction,
      ...(canPreview ? [PreviewAction] : []),
    ]
  }

  if (canEditDelete) {
    return [
      PublishAction,
      DiscardChangesAction,
      DeleteAction,
      ...(canPreview ? [PreviewAction] : []),
    ]
  }

  return [...defaultResolve(props), ...(canPreview ? [PreviewAction] : [])]
}
