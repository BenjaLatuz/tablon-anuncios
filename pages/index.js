import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const anuncios = await prisma.anuncio.findMany({
    orderBy: { id: 'desc' }
  });

  return {
    props: { anuncios }
  };
}

export default function Home({ anuncios }) {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem' }}>
         Tablón de Anuncios
      </h1>

      <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
        <Link
          href="/create"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}
        >
          ✨ Crear nuevo anuncio
        </Link>
      </div>

      {anuncios.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          backgroundColor: '#f5f5f5',
          padding: '2rem',
          borderRadius: '8px',
          margin: '2rem 0'
        }}>
          <p style={{ margin: 0 }}>No hay anuncios publicados aún.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          gridTemplateColumns: '1fr',
          margin: '2rem 0'
        }}>
          {anuncios.map((anuncio) => (
            <article key={anuncio.id} style={{
              border: '1px solid #e1e1e1',
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h2 style={{ 
                  margin: 0,
                  color: '#1a1a1a',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  {anuncio.titulo}
                </h2>
                <Link 
                  href={`/edit/${anuncio.id}`}
                  style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    color: '#495057',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>✏️</span>
                  Editar
                </Link>
              </div>
              <p style={{ 
                margin: 0,
                color: '#4a4a4a',
                lineHeight: '1.5',
                fontSize: '1rem'
              }}>
                {anuncio.contenido}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
