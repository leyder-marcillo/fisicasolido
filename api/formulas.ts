export default function handler(req, res) {
  const formulas = [
    {
      id: "f1",
      topicId: "1",
      title: "Distancia interatómica",
      expression: "d = a / √2",
      description: "Relación entre el parámetro de red y la distancia entre átomos en una celda cúbica.",
    },
    {
      id: "f2",
      topicId: "2",
      title: "Energía de banda",
      expression: "E(k) = ℏ²k² / 2m",
      description: "Modelo de electrón libre para bandas de energía.",
    }
  ];

  res.status(200).json(formulas);
}
