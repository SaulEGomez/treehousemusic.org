import React, { createContext, useContext, useState } from 'react'

// Set our initial context states
const initialContext = {
  isPageTransition: false,
  meganav: {
    isOpen: false,
    activeID: null,
  },
  isLoading: true,
  isCartOpen: false,
  cart: {
    lineItems: [],
  },
  productCounts: [],
}

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider = ({ children }) => {
  const [context, setContext] = useState(initialContext)

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

// Toggle page transition state
function useTogglePageTransition() {
  const {
    context: { isPageTransition },
    setContext,
  } = useContext(SiteContext)

  async function togglePageTransition(state) {
    setContext((prevState) => {
      return { ...prevState, isPageTransition: state }
    })
  }
  return togglePageTransition
}

// Toggle Mega Navigation states
function useToggleMegaNav() {
  const {
    context: { meganav },
    setContext,
  } = useContext(SiteContext)

  async function toggleMegaNav(state, id = null) {
    setContext((prevState) => {
      return {
        ...prevState,
        meganav: {
          isOpen: state === 'toggle' ? !meganav.isOpen : state,
          activeID: state === 'toggle' && meganav.isOpen ? null : id,
        },
      }
    })
  }
  return toggleMegaNav
}

// Toggle cart state
function useToggleCart() {
  const {
    context: { isCartOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleCart() {
    setContext((prevState) => {
      return { ...prevState, isCartOpen: !prevState.isCartOpen }
    })
  }
  return toggleCart
}

// Access the cart item count
function useCartCount() {
  const {
    context: { cart },
  } = useContext(SiteContext)

  let count = 0
  if (cart && cart.lineItems) {
    count = cart.lineItems.reduce((total, item) => total + item.quantity, 0)
  }

  return count
}

// Access product counts
function useProductCount() {
  const {
    context: { productCounts },
  } = useContext(SiteContext)

  function productCount(collection) {
    const collectionItem = productCounts.find((c) => c.slug === collection)
    return collectionItem ? collectionItem.count : 0
  }

  return productCount
}

export {
  SiteContextProvider,
  useSiteContext,
  useTogglePageTransition,
  useToggleMegaNav,
  useToggleCart,
  useCartCount,
  useProductCount,
}
