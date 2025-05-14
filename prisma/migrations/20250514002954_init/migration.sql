-- CreateTable
CREATE TABLE "Anuncio" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);
