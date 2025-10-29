export default function handler(req, res) {
  const exercises = [
    {
      id: "e1",
      topicId: "1",
      title: "Calcular la densidad atómica",
      description: "Usa el parámetro de red para determinar la densidad en una celda cúbica.",
      difficulty: "intermedio",
    },
    {
      id: "e2",
      topicId: "2",
      title: "Determinar el ancho de banda",
      description: "Calcula el ancho de banda usando el modelo de electrón libre.",
      difficulty: "avanzado",
    }
  ];

  res.status(200).json(exercises);
}
