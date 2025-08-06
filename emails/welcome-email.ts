import { Html, Head, Body, Container, Text, Link, Img, Section, Hr } from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  userName?: string;
}

export function WelcomeEmail({ userName = 'Nuevo Usuario' }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img src="https://www.717store.com/logo.png" width="60" height="60" alt="717 Store Logo" style={logo} />
          </Section>
          <Text style={heading}>¡Bienvenido a 717 Store, {userName}!</Text>
          <Text style={paragraph}>
            Estamos emocionados de tenerte como parte de nuestra comunidad. En 717 Store, encontrarás la mejor selección de streetwear con diseños únicos y la más alta calidad.
          </Text>
          <Text style={paragraph}>
            Explora nuestra última colección y descubre tus nuevas prendas favoritas.
          </Text>
          <Section style={buttonContainer}>
            <Link href="https://www.717store.com/productos" style={button}>
              Explorar Productos
            </Link>
          </Section>
          <Text style={paragraph}>
            Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
          </Text>
          <Text style={paragraph}>
            ¡Gracias por unirte a 717 Store!
          </Text>
          <Text style={signature}>El equipo de 717 Store</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Este correo electrónico fue enviado por 717 Store. Si no esperabas este correo, por favor ignóralo.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const logoSection = {
  textAlign: 'center' as const,
  paddingBottom: '20px',
}

const logo = {
  margin: '0 auto',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  color: '#333',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  color: '#555',
}

const buttonContainer = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const button = {
  backgroundColor: '#4A1518',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
  display: 'inline-block',
}

const signature = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left' as const,
  color: '#333',
  marginTop: '20px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#888',
  fontSize: '12px',
  textAlign: 'center' as const,
}
