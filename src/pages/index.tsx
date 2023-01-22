import Head from "next/head"
import Image from "next/image"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../lib/stripe"

import { useKeenSlider } from 'keen-slider/react'
import { OrderButton } from "../components/Header"
import { ProductPros } from "../context/ShopContext"

import { HomeContainer, ProductCard } from "../styles/pages/home"
import { HiOutlineShoppingBag } from "react-icons/hi"
import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: ProductPros[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef,] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => {
          return (
            <ProductCard
              href={`/product/${product.id}`}
              className="keen-slider__slide"
              key={product.id}
              prefetch={false}
            >
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <OrderButton
                  css={{
                    backgroundColor: '$green300'
                  }}
                >
                  <HiOutlineShoppingBag size={24} color='#fff' />
                </OrderButton>
              </footer>

            </ProductCard>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      basePrice: price.unit_amount
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }

};