import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Stripe from "stripe"
import { ProductPros } from "../../context/ShopContext"
import { useShopContext } from "../../hooks/useShopContext"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductType extends ProductPros {
  description: string,
  defaultPriceId: string,
}

interface IProductProps {
  product: ProductType
}

export default function Product({ product }: IProductProps) {
  const { addItemToOrder } = useShopContext()

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={() => addItemToOrder(product)}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '' } } // opcional: produtos mais acessados
    ],
    fallback: 'blocking', // Busca assíncrona dos dados pelo id: usar isFallback -> useRouter + loading screen
    // fallback: false, // Não busca novos produtos pelo id acessado
    // fallback: 'blocking', // Mostra a tela do produto após carregar todos os dados (demora)
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id ?? ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        basePrice: price.unit_amount
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
