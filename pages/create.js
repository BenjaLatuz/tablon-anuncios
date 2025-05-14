import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function getServerSideProps({ req, res }) {
  if (req.method === 'POST') {
    const body = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        resolve(new URLSearchParams(data));
      });
    });

    const titulo = body.get('titulo');
    const contenido = body.get('contenido');

    if (titulo && contenido) {
      try {
        await prisma.anuncio.create({
          data: { titulo, contenido },
        });
        
        res.writeHead(302, { Location: '/' });
        res.end();
        return { props: {} };
      } catch (error) {
        console.error('Error al crear anuncio:', error);
        return { props: { error: 'Error al crear el anuncio' } };
      }
    }
  }

  return { props: {} };
}

export default function Crear() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        📝 Crear nuevo anuncio
      </h1>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e1e1e1'
      }}>
        <form method="POST">
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Título
            </label>
            <input 
              name="titulo" 
              required 
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '1rem',
                color: '#000'
              }}
              placeholder="Escribe un título descriptivo"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              Contenido
            </label>
            <textarea 
              name="contenido" 
              required 
              rows={6} 
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '1rem',
                resize: 'vertical',
                color: '#000'
              }}
              placeholder="Escribe los detalles de tu anuncio"
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            justifyContent: 'flex-end'
          }}>
            <Link 
              href="/" 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                color: '#666',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: '#fff',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Publicar anuncio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
