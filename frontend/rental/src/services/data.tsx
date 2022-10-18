let products = [
    {
        id: 1,
        name: "Spider man",
        type: "full cosplay",
        price: "$144",
        category: "movies",
        condition: "good",
        quality: "good",
        photoPath: "../assets/spiderMan.jpg"
    },
    {
        id: 2,
        name: "Chucky doll",
        type: "full cosplay",
        price: "$123",
        category: "movies",
        condition: "good",
        quality: "medium",
        photoPath: "../assets/childsPlay.jpg"
    },
    {
        id: 3,
        name: "It clown",
        type: "full cosplay",
        price: "$99",
        category: "movies",
        condition: "medium",
        quality: "good",
        photoPath: "../assets/it.jpg"
    },
    {
        id: 4,
        name: "Maleficent",
        type: "full cosplay",
        price: "$223",
        category: "movies",
        condition: "bad",
        quality: "good",
        photoPath: "../assets/maleficent.webp"
    },
    {
        id: 5,
        name: "Wonder woman",
        type: "full cosplay",
        price: "$664",
        category: "movies",
        condition: "good",
        quality: "good",
        photoPath: "../assets/wonderWoman.webp"
    },
  ];
  
  export function getProducts() {
    return products;
  }