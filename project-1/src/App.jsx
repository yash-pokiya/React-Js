import Card from "./Components/Card";
import CompanyCard from "./Components/CompanyCard";
import ProductCard from "./Components/ProductCard";

const App = () => {
const data = [
  {
    "id": 1,
    "name": "Kiwi Juice",
    "image": "https://images.unsplash.com/photo-1604404894204-03fc8bf2c028?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Kiwi", "Ice Cream", "Milk"],
    "price": 12,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 2,
    "name": "Mango Juice",
    "image": "https://images.unsplash.com/photo-1708782343412-787fade27b60?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Mango", "Milk", "Sugar"],
    "price": 10,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 3,
    "name": "Strawberry Juice",
    "image": "https://images.unsplash.com/photo-1633108787619-9455a0ca4522?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Strawberry", "Milk", "Ice Cream"],
    "price": 11,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 4,
    "name": "Orange Juice",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&h=600&q=80",
    "ingredients": ["Orange", "Ice", "Honey"],
    "price": 9,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 5,
    "name": "Pineapple Juice",
    "image": "https://images.unsplash.com/photo-1708782343412-787fade27b60?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Pineapple", "Mint", "Ice"],
    "price": 10,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 6,
    "name": "Watermelon Juice",
    "image": "https://images.unsplash.com/photo-1641470300943-fe4caf20d761?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Watermelon", "Ice", "Lemon"],
    "price": 8,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 7,
    "name": "Apple Juice",
    "image": "https://images.unsplash.com/photo-1608576210916-1aa6dc4a274b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Apple", "Honey", "Ice"],
    "price": 9,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 8,
    "name": "Banana Smoothie",
    "image": "https://plus.unsplash.com/premium_photo-1769893428849-7d48e1f8962c?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Banana", "Milk", "Ice Cream"],
    "price": 11,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 9,
    "name": "Blueberry Juice",
    "image": "https://images.unsplash.com/photo-1638176066359-7bcd6289c9d8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Blueberry", "Milk", "Sugar"],
    "price": 13,
    "delivery": "Free Delivery until 30/03/2026"
  },
  {
    "id": 10,
    "name": "Papaya Juice",
    "image": "https://images.unsplash.com/photo-1580294293863-ab1874021c7b?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ingredients": ["Papaya", "Milk", "Honey"],
    "price": 10,
    "delivery": "Free Delivery until 30/03/2026"
  },
];
const nikeData = [
  {
    "id": 1,
    "title": "Nike Airforce1 Premium",
    "tagline": "Own the Airforce",
    "description": "Step back into classic hoops style with durable leather and timeless comfort.",
    "price": 111,
    "image": "https://i.pinimg.com/736x/ef/62/2c/ef622cc489f83b6eefba054434b426be.jpg"
  },
  {
    "id": 2,
    "title": "Nike Air Max 270",
    "tagline": "Feel the Air",
    "description": "Inspired by sport and built for comfort with the largest Max Air unit.",
    "price": 135,
    "image": "https://i.pinimg.com/736x/5c/bc/1a/5cbc1ab98b1d747a862e2d0d8f15d416.jpg"
  },
  {
    "id": 3,
    "title": "Adidas Ultraboost 22",
    "tagline": "Boost Your Run",
    "description": "Responsive cushioning with a sleek knit upper designed for performance.",
    "price": 149,
    "image": "https://i.pinimg.com/1200x/11/a4/b7/11a4b7e4934e3aba2b32f5d936f5f461.jpg"
  },
  {
    "id": 4,
    "title": "Puma RS-X Reinvention",
    "tagline": "Bold Street Style",
    "description": "Chunky retro-inspired sneakers built for modern street fashion.",
    "price": 120,
    "image": "https://i.pinimg.com/1200x/a8/e5/6e/a8e56eb656334f6ce468973f6edff70a.jpg"
  },
  {
    "id": 5,
    "title": "Nike Dunk Low Retro",
    "tagline": "Classic Court Style",
    "description": "A timeless basketball sneaker reborn for everyday wear.",
    "price": 115,
    "image": "https://i.pinimg.com/1200x/d7/69/e8/d769e88f51930b119ab4a8586434ddcf.jpg"
  },
  {
    "id": 6,
    "title": "Adidas NMD R1",
    "tagline": "Urban Runner",
    "description": "Lightweight sneaker with Boost cushioning for city exploration.",
    "price": 130,
    "image": "https://i.pinimg.com/736x/fa/12/bf/fa12bf9e878fad04794dab482135b0f9.jpg"
  },
  {
    "id": 7,
    "title": "New Balance 550",
    "tagline": "Retro Basketball",
    "description": "A clean, vintage basketball sneaker with modern comfort.",
    "price": 140,
    "image": "https://i.pinimg.com/1200x/c5/43/8e/c5438e5b233821876b5f521bdda63d1a.jpg"
  },
  {
    "id": 8,
    "title": "Converse Chuck 70",
    "tagline": "Iconic Canvas",
    "description": "Classic high-top sneakers with premium canvas and vintage style.",
    "price": 90,
    "image": "https://i.pinimg.com/736x/4c/d3/99/4cd3990ba246ca0d9fdfea44f02e590e.jpg"
  },
  {
    "id": 9,
    "title": "Vans Old Skool",
    "tagline": "Skate Classic",
    "description": "Durable suede and canvas sneakers with signature side stripe.",
    "price": 85,
    "image": "https://i.pinimg.com/736x/b0/7d/6e/b07d6eeb3e632c2ecd8648db2fb770b3.jpg"
  },
  {
    "id": 10,
    "title": "Jordan 1 Low",
    "tagline": "Legendary Style",
    "description": "Inspired by the original Air Jordan 1 with everyday comfort.",
    "price": 160,
    "image": "https://i.pinimg.com/1200x/95/59/6c/95596c4b5d9c35ba19bba1d604271901.jpg"
  }
] 
const postArray = [
  {
    id: 1,
    company: "Google",
    postFor: "UI/UX Designer",
    jobType: "Part-time",
    level: "Senior level",
    salary: "$120/hr",
    place: "Surat, India",
    posted: "5 days ago",
    saved: false,
    img: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/google-color.png"
  },
  {
    id: 2,
    company: "Amazon",
    postFor: "Web Developer",
    jobType: "Full-time",
    level: "Mid level",
    salary: "$110/hr",
    place: "Ahmedabad, India",
    posted: "3 days ago",
    saved: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCw9ADW_e3phAevjk1wGYCyOujxGmT_3cTQQ&s"
  },
  {
    id: 3,
    company: "Microsoft",
    postFor: "Frontend Engineer",
    jobType: "Full-time",
    level: "Senior level",
    salary: "$130/hr",
    place: "Hyderabad, India",
    posted: "1 week ago",
    saved: false,
    img: "https://i.pinimg.com/1200x/c6/18/ed/c618edb71c600432c13ebd6ef2a0c317.jpg"
  },
  {
    id: 4,
    company: "Apple",
    postFor: "Product Designer",
    jobType: "Part-time",
    level: "Senior level",
    salary: "$140/hr",
    place: "Bengaluru, India",
    posted: "5 days ago",
    saved: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    id: 5,
    company: "Meta",
    postFor: "React Developer",
    jobType: "Remote",
    level: "Mid level",
    salary: "$125/hr",
    place: "Remote, India",
    posted: "2 days ago",
    saved: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZPJAE0dqPukUcuiRdQe0U0oNM6IM7B_ZSA&s"
  },
  {
    id: 6,
    company: "Netflix",
    postFor: "UI Engineer",
    jobType: "Full-time",
    level: "Senior level",
    salary: "$150/hr",
    place: "Mumbai, India",
    posted: "4 days ago",
    saved: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
  },
  {
    id: 7,
    company: "Adobe",
    postFor: "UX Researcher",
    jobType: "Full-time",
    level: "Mid level",
    salary: "$115/hr",
    place: "Noida, India",
    posted: "6 days ago",
    saved: false,
    img: "https://i.pinimg.com/736x/9e/ab/c5/9eabc54fbe3cd7a6931695dcce52cc82.jpg"
  },
  {
    id: 8,
    company: "Uber",
    postFor: "Frontend Developer",
    jobType: "Full-time",
    level: "Mid level",
    salary: "$120/hr",
    place: "Pune, India",
    posted: "3 days ago",
    saved: false,
    img: "https://i.pinimg.com/736x/2c/ea/3e/2cea3e7494f8f6f763216b708c21f4f2.jpg"
  },
  {
    id: 9,
    company: "Airbnb",
    postFor: "Design Engineer",
    jobType: "Remote",
    level: "Senior level",
    salary: "$135/hr",
    place: "Remote, India",
    posted: "1 week ago",
    saved: false,
    img: "https://i.pinimg.com/736x/67/50/3a/67503ad87e35539f2d764fbe4c2c4758.jpg"
  },
  {
    id: 10,
    company: "Spotify",
    postFor: "Web UI Developer",
    jobType: "Full-time",
    level: "Mid level",
    salary: "$118/hr",
    place: "Gurgaon, India",
    posted: "4 days ago",
    saved: false,
    img: "https://i.pinimg.com/736x/cb/65/e8/cb65e80c61f2e534ca47d11cd78fc5fd.jpg"
  },
  {
    id: 11,
    company: "Flipkart",
    postFor: "Frontend Engineer",
    jobType: "Full-time",
    level: "Junior level",
    salary: "$95/hr",
    place: "Bengaluru, India",
    posted: "2 days ago",
    saved: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOM7FdWEWnd34hNStqjECyIPRMBy_k18nUwQ&s"
  },
  {
    id: 12,
    company: "TATA Tech",
    postFor: "UI Developer",
    jobType: "Full-time",
    level: "Junior level",
    salary: "$85/hr",
    place: "Chennai, India",
    posted: "1 week ago",
    saved: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gKGk8lcZvD1_WCB9xyZX4vWumzCmb3cYAg&s"
  }
];
return (
    <>
        <h1 className="text-7xl text-center text-green-950/50">Cards</h1>

      {/* <section className="flex flex-wrap gap-6 py-4 justify-center items-center">
        {data.map((a) => {
          console.log(a)
          return <Card data = {a}/>
        })}
      </section> */}
      {/* <section className="flex flex-wrap gap-6 py-4 justify-center items-center">
        {nikeData.map((a) => {
          console.log(a)
          return <ProductCard data = {a} />
        })}
      </section> */}
      <section className="flex flex-wrap gap-6 py-4 justify-center items-center">
        {postArray.map((a) => {
          console.log(a)
          return <CompanyCard data = {a} />
        })}
      </section>
    </>
  );
};

export default App;
