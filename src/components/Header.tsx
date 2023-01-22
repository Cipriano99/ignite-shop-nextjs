import { useShopContext } from "../hooks/useShopContext"
import Image from "next/image"
import logoImg from '../assets/logo.svg'
import { styled } from "../styles"
import { HiOutlineShoppingBag } from 'react-icons/hi'

export const Header = () => {
  const { orderList, toggleSideMenu } = useShopContext()

  const howManyProducts = orderList.length

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <OrderButton onClick={toggleSideMenu}>
        <HiOutlineShoppingBag size={24} color='#8d8d99' />
        {howManyProducts > 0 ? (
          <span>{howManyProducts}</span>
        ) : null}
      </OrderButton>
    </HeaderContainer>
  )
}

const HeaderContainer = styled('header', {
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: "flex",
  justifyContent: "space-between"
})

export const OrderButton = styled('button', {
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray800',
  display: "flex",
  alignItems: 'center',
  justifyContent: "center",
  position: "relative",
  borderRadius: '6px',
  border: 0,
  cursor: 'pointer',

  '&:hover': {
    filter: 'brightness(0.9)'
  },

  span: {
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: '$green300',
    color: '$gray100',
    display: "flex",
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    borderRadius: '50%',
    top: '-8px',
    right: '-8px',
  }
})