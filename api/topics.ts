import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const topics = [
    {
      id: "1",
      name: "Estrutura Cristalina",
      description: "Estudo da disposição/forma periódica de vetores em níveis/dimensões cristalinas, redes de Bravais e sistemas cristalinos.",
      slug: "crystal-structure",
      questions: [
        { id: "q1", question: "What is a Bravais lattice?", answer: "A Bravais lattice is..." },
        { id: "q2", question: "What is a crystal system?", answer: "A crystal system is..." }
      ]
    },
    {
      id: "2",
      name: "Teoria de Bandas",
      description: "Estudo da estrutura eletrônica de sólidos, bandas de energia permitidas e proibidas.",
      slug: "band-theory",
      questions: [
        { id: "q3", question: "What is a semiconductor?", answer: "A semiconductor is..." },
        { id: "q4", question: "What is a band gap?", answer: "A band gap is..." }
      ]
    },
    // Puedes agregar más temas aquí
  ];

  return NextResponse.json(topics);
};
