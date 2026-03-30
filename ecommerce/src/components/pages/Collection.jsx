import { Card } from "../ui/Card";

export const Collections = () => {

  const categories = [

   {

     name: "furniture",

     width: 300,

     height: 400,

     color: "#FADADD",

     textColor: "#333333",

     image:

       "https://i.pinimg.com/736x/55/75/fe/5575fe45e42b0b62b61fa7ed4e77fbfd.jpg",

   },

   {

     name: "fragrances",

     width: 280,

     height: 350,

     color: "#D8BFD8",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "furniture",

     width: 420,

     height: 500,

     color: "#BC8F8F",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "groceries",

     width: 310,

     height: 380,

     color: "#90EE90",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "bmw",

     width: 360,

     height: 450,

     color: "#FFF8DC",

     textColor: "#333333",

     image:

       "https://i.pinimg.com/736x/56/6a/8c/566a8c1454639870abe5bb2cce51299e.jpg",

   },

   {

     name: "kitchen-accessories",

     width: 340,

     height: 420,

     color: "#E0E0E0",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "laptops",

     width: 450,

     height: 360,

     color: "#B0C4DE",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "mens-shirts",

     width: 320,

     height: 480,

     color: "#4682B4",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "mens-shoes",

     width: 330,

     height: 390,

     color: "#A0522D",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "mens-watches",

     width: 290,

     height: 410,

     color: "#556B2F",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "mobile-accessories",

     width: 350,

     height: 320,

     color: "#FFD700",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "motorcycle",

     width: 480,

     height: 550,

     color: "#CD5C5C",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "skin-care",

     width: 270,

     height: 430,

     color: "#FFB6C1",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "smartphones",

     width: 400,

     height: 460,

     color: "#36454F",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "sports-accessories",

     width: 370,

     height: 400,

     color: "#3CB371",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "sunglasses",

     width: 250,

     height: 340,

     color: "#B8860B",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "tablets",

     width: 410,

     height: 370,

     color: "#778899",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "tops",

     width: 300,

     height: 440,

     color: "#DB7093",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "vehicle",

     width: 500,

     height: 400,

     color: "#4169E1",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "womens-bags",

     width: 330,

     height: 470,

     color: "#800080",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "BMW",

     width: 380,

     height: 520,

     color: "#C71585",

     textColor: "#FFFFFF",

     image:

       "https://i.pinimg.com/736x/64/98/8a/64988a1062c815e25bf4333bff4fbc6e.jpg",

   },

   {

     name: "womens-jewellery",

     width: 260,

     height: 380,

     color: "#CFB53B",

     textColor: "#333333",

     image:

       "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "womens-shoes",

     width: 340,

     height: 410,

     color: "#B22222",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=500",

   },

   {

     name: "womens-watches",

     width: 280,

     height: 360,

     color: "#DA70D6",

     textColor: "#FFFFFF",

     image:

       "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=500",

   },

  ];



  return (

   <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-10">

     {categories.map((data, id) => (

        <Card key={id} data={data} />
     ))}

   </section>

  );

};



// ---------------- MAIN PAGE ----------------

export default Collections;