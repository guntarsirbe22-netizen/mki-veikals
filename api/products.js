export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json([
      {
        id: 1,
        name: "Orange Nectar Unisex luksusa smaržas",
        price: 19.9,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f"
      },
      {
        id: 2,
        name: "Granello Poise Unisex luksusa smaržas",
        price: 19.9,
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de"
      },
      {
        id: 3,
        name: "Baccarat Rouge Ekskluzīve smaržas",
        price: 27.9,
        image: "https://images.unsplash.com/photo-1585386959984-a41552231658"
      },
      {
        id: 4,
        name: "Aventis Vīriešu luksusa smaržas",
        price: 19.9,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
      }
    ]);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
