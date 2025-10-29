import { NextResponse } from "next/server";

export const GET = async () => {
  const topics = [
    {
      id: "1",
      name: "Estrutura Cristalina",
      description: "Estudo da disposição/forma periódica de vetores...",
      slug: "crystal-structure",
      questions: [
        { id: "q1", question: "What is a Bravais lattice?", answer: "..." },
        { id: "q2", question: "What is a crystal system?", answer: "..." }
      ]
    },
    // otros temas...
  ];

  return NextResponse.json(topics);
};
