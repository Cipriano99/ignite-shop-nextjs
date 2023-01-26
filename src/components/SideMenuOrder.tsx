import axios from "axios"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { HiX } from "react-icons/hi"
import { useShopContext } from "../hooks/useShopContext"
import { styled } from "../styles"
import { useRouter } from "next/router"

export const SideMenuOrder: FC = () => {
  const router = useRouter()

  const { orderList, isOpenSideMenu, toggleSideMenu, removeItemToOrder } = useShopContext()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  useEffect(() => {
    if (isOpenSideMenu) {
      toggleSideMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  if (!isOpenSideMenu) {
    return <></>
  }

  const totalPrice = orderList.reduce((total, curr) => total + curr.basePrice, 0)
  const prideFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice ? totalPrice / 100 : 0)

  const handleBuyProduct = async () => {
    const orderListToCheckout: { price: string, quantity: number }[] = []
    const orderListPricesId = orderList.map(item => item.defaultPriceId)

    new Set(orderListPricesId).forEach(orderItem => {
      orderListToCheckout.push({
        price: orderItem,
        quantity: 0,
      })
    })

    orderListPricesId.forEach(itemId => {
      const hasAddedItem = orderListToCheckout.findIndex(listItem => listItem.price === itemId)

      if (hasAddedItem >= 0) {
        orderListToCheckout[hasAddedItem].quantity += 1
      }
    })

    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        orderList: orderListToCheckout,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog | Sentry)

      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <SideContainer>
      <HiX size={24} onClick={toggleSideMenu} />
      <h2>Sacola de compras</h2>

      <OrderList>
        {orderList.length === 0 ? (
          <div className="empty">
            <span>Sacola vazia...</span>
          </div>
        ) : orderList.map((item, index) => (
          <li key={item.id + index}>
            <div className="imageContainer">
              <Image src={item.imageUrl} width={86} height={86} alt='' />
            </div>

            <div className="content">
              <div className="info">
                <p>{item.name}</p>
                <span>
                  {item.price}
                </span>
              </div>

              <button onClick={() => removeItemToOrder(index)} >Remover</button>
            </div>
          </li>
        ))}
      </OrderList>

      <OrderResume>
        <div className="quantity">
          <span>Quantidade</span>
          <span>{orderList.length} itens</span>
        </div>

        <div className="total">
          <span>Valor total</span>
          <span className="price">{prideFormatted}</span>
        </div>

        <button
          onClick={handleBuyProduct}
          disabled={orderList.length === 0 || isCreatingCheckoutSession}
        >
          Finalizar compra
        </button>
      </OrderResume>
    </SideContainer>
  )
}

const SideContainer = styled('div', {
  height: '100%',
  width: '480px',
  backgroundColor: '$gray800',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 5,
  position: 'absolute',
  right: 0,
  padding: '1.5rem',


  svg: {
    color: '$gray300',
    marginLeft: 'auto',
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.2)'
    }
  },

  h2: {
    fontSize: '$lg',
    margin: '1.5rem 0 2rem'
  }


})

const OrderList = styled('ul', {
  listStyle: 'none',
  height: '100%',
  overflowY: 'auto',
  paddingBottom: '16px',
  marginBottom: '16px',

  'li + li': {
    marginTop: '16px',
  },

  li: {
    display: 'flex',
    gap: '8px',

    '.imageContainer': {
      width: '6rem',
      height: '6rem',
      background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '.content': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    '.info': {
      fontSize: '1.125rem',
      p: {
        color: '$gray300',
        lineHeight: '160%'
      },
      span: {
        fontWeight: 'bold'
      },
    },

    button: {
      background: 'none',
      border: 0,
      color: '$green300',
      width: 'fit-content',
      padding: '4px',
      fontWeight: 'bold',

      '&:hover': {
        filter: 'brightness(1.5)',
        cursor: 'pointer'
      }
    }
  },

  '.empty': {
    display: 'flex',
    justifyContent: 'center'
  }
})

const OrderResume = styled('div', {
  marginTop: 'auto',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },

  '.quantity': {
    color: '$gray300',
  },

  '.total': {
    fontWeight: 'bold',
    fontSize: '1.125rem',

    '.price': {
      fontSize: '1.25rem',
    },
  },

  button: {
    width: '100%',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    marginTop: '1.5rem',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  }
})