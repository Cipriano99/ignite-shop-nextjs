import { styled } from ".."

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,
  gap: '2.75rem',

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    // marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: "none",
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImagesContainer = styled('div', {
  display: 'flex',

  'div ~ div': {
    marginLeft: -52,
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 132,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 9999,
  padding: '0.25rem',
  marginTop: '4rem',

  boxShadow: '-8px 1px 20px #000c',

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: 'cover'
  }
})