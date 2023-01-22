import { createContext, FC, ReactNode, useState } from "react";

export interface ProductPros {
  id: string,
  name: string,
  imageUrl: string,
  price: string,
  basePrice: number

  description: string;
  defaultPriceId: string;
}

interface IShopContext {
  orderList: ProductPros[],
  isOpenSideMenu: boolean
  toggleSideMenu: () => void

  addItemToOrder: (product: ProductPros) => void
  removeItemToOrder: (position: number) => void
}


export const ShopContext = createContext({} as IShopContext)

export const ShopContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpenSideMenu, setOpenSideMenu] = useState(false)
  const toggleSideMenu = () => {
    setOpenSideMenu(prev => !prev)
  }

  const [orderList, setOrderList] = useState<ProductPros[]>([]);

  const addItemToOrder = (product: ProductPros) => {
    setOrderList((prev) => [...prev, product])

    if (!isOpenSideMenu) {
      toggleSideMenu()
    }
  }

  const removeItemToOrder = (position: number) => {
    setOrderList(prev => {
      const base = [...prev]

      base.splice(position, 1)

      return base
    }

    )
  }

  return (
    <ShopContext.Provider value={{
      orderList,
      isOpenSideMenu,
      toggleSideMenu,

      addItemToOrder,
      removeItemToOrder
    }}>
      {children}
    </ShopContext.Provider>
  )
}