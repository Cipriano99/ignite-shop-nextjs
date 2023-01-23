import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesContainer, SuccessContainer } from "../styles/pages/success";

type ProductType = {
  name: string,
  imageUrl: string,
}

interface SuccessProps {
  customerName: string,
  product: ProductType[],
  quantity: number
}

export default function Success({ customerName, product, quantity }: SuccessProps) {
  return (

    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name='robots' content="noindex" />
      </Head>

      <SuccessContainer>

        <ImagesContainer>
          {product.map(item => (
            <ImageContainer key={item.name}>
              <Image src={item.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul, <strong>{customerName}</strong>, sua compra de {quantity} camiseta
          {quantity > 1 ? 's' : null} já está a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data?.map((item: any) => {
    return {
      name: item?.price?.product?.name,
      imageUrl: item?.price?.product?.images[0]
    }
  })
  // .price?.product as Stripe.Product

  console.log(session.line_items)


  return {
    props: {
      customerName,
      product,
      quantity: 2
    }
  }
}