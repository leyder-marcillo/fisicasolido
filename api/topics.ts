export default async function handler(request: Request): Promise<Response> {
  const topics = [
    {
      id: "1",
      name: "Estrutura Cristalina",
      description: "Estudo da disposição/forma periódica de vetores...",
      slug: "crystal-structure",
      icon: "crystal-structure",
      questions: [
        { id: "q1", question: "What is a Bravais lattice?", answer: "..." },
        { id: "q2", question: "What is a crystal system?", answer: "..." }
      ]
    },
    {
      id: "2",
      name: "Teoria de Bandas",
      description: "Estudo da estrutura eletrônica de sólidos...",
      slug: "band-theory",
      icon: "band-theory",
      questions: [
        { id: "q3", question: "What is a semiconductor?", answer: "..." },
        { id: "q4", question: "What is a band gap?", answer: "..." }
      ]
    }
  ];

  return new Response(JSON.stringify(topics), {
    headers: { "Content-Type": "application/json" },
  });
}
