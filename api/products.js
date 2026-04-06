export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "Orange Nectar", price: 19.9, image: "/images/p1.png" },
    { id: 2, name: "Granello Poise", price: 19.9, image: "/images/p2.png" },
    { id: 3, name: "Baccarat Rouge", price: 27.9, image: "/images/p3.png" },
    { id: 4, name: "Aventis", price: 19.9, image: "/images/p4.png" }
  ]);
}
