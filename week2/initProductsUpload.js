const products = [
  {
    "title": "Deluxe Dog Bed",
    "category": "Dog Accessories",
    "origin_price": 79.99,
    "price": 59.99,
    "unit": "bed",
    "description": "A comfortable and durable bed for your canine companion.",
    "content": "This deluxe dog bed offers superior comfort with its plush cushioning and removable, washable cover.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1598397678815-c5dc869035b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1646195164326-124b72fb9d34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1669910803409-a447456beaca?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615751194950-ad48191006ae?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1663416771563-4c2342b62551?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1503595855261-9418f48a991a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Cat Scratching Post",
    "category": "Cat Furniture",
    "origin_price": 45.00,
    "price": 35.00,
    "unit": "post",
    "description": "A sturdy scratching post to keep your cat's claws healthy.",
    "content": "This scratching post is made from high-quality sisal and provides a perfect outlet for your cat's natural scratching instincts.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1625241589108-d4ceb8dbcc4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1522526469673-5b73aed892ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1636543459633-53c7216fee3c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1630843764858-00ab3ed30db8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1636543459635-4a2b0e8704de?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Bird Cage",
    "category": "Bird Supplies",
    "origin_price": 120.00,
    "price": 99.99,
    "unit": "cage",
    "description": "A spacious and safe cage for your feathered friend.",
    "content": "This bird cage features multiple perches, feeding bowls, and a swing to keep your bird entertained.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1552826580-0d47cf898dee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1732971941147-a88b45f69f39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1666628622379-2ededbecec03?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1630048579739-54b462256cd4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1634413102755-7f0857eba45b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1651954960222-896c076d697a?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Aquarium Starter Kit",
    "category": "Fish Supplies",
    "origin_price": 150.00,
    "price": 129.99,
    "unit": "kit",
    "description": "An all-in-one aquarium kit perfect for beginners.",
    "content": "This starter kit includes a 10-gallon tank, filter, heater, and LED lighting to create a healthy environment for your fish.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1436891461396-6df41158de09?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1691387824643-227cc84127cf?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1667763207293-fab06a1accb1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1578313097818-dfe8d38aa758?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733288577038-9c8e103da012?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1655158083995-5fba782d100b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Rabbit Hutch",
    "category": "Small Animal Housing",
    "origin_price": 200.00,
    "price": 179.99,
    "unit": "hutch",
    "description": "A spacious hutch for your rabbit or guinea pig.",
    "content": "This wooden hutch provides a comfortable living space with a secure outdoor run for your small pet.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1611601361616-43a49bc718bd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1518747024683-1a740a4d8854?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1717126754195-0b9092d16d9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1703106209463-d8408ca50cfd?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1711348533934-0f2fa5ff17ae?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1592600216684-c792cb784d58?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Hamster Wheel",
    "category": "Small Animal Accessories",
    "origin_price": 25.00,
    "price": 19.99,
    "unit": "wheel",
    "description": "A silent spinner wheel for your hamster's exercise needs.",
    "content": "This hamster wheel operates quietly and provides ample exercise space to keep your pet healthy and active.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1657076761228-bdb21cf0bc7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1625899890010-6d4a6039e37b?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1452721226468-f95fb66ebf83?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1623680281292-9cc7009eb227?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1666526123516-9a9ff85e0df5?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1657399621130-67f3e1bd8da7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Dog Collar",
    "category": "Dog Accessories",
    "origin_price": 15.99,
    "price": 12.99,
    "unit": "collar",
    "description": "A stylish and durable collar for dogs.",
    "content": "This collar is made from high-quality materials and features an adjustable buckle for comfort and security.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1722456481489-274e9a40a5ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://plus.unsplash.com/premium_photo-1664303512978-ba50c50f3283?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1697302859053-e10dcda1d01f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1500063207684-5dac4525ad1c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1524698604136-5a02fb1f7ec9?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1721855806374-4285051c3b56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  }, {
    "title": "Fish Tank Gravel",
    "category": "Fish Supplies",
    "origin_price": 12.99,
    "price": 9.99,
    "unit": "bag",
    "description": "Decorative gravel for aquarium tanks.",
    "content": "This non-toxic gravel enhances the aesthetic of your fish tank and provides a natural habitat feel for your aquatic pets.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1520989244660-118e51ae94bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://plus.unsplash.com/premium_photo-1675543163354-e4dc1f541330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1606137029647-71daa7c9c5c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1675116050278-0b28170407e5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1520199144204-310fca6d9fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Chew Toys Bundle",
    "category": "Dog Accessories",
    "origin_price": 24.99,
    "price": 19.99,
    "unit": "set",
    "description": "A set of durable chew toys for dogs of all sizes.",
    "content": "This bundle includes three toys made of tough, safe materials to keep your dog entertained and their teeth healthy.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1477884143921-51d0a574ee09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1522008693277-086ad6075b78?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668918112517-8ebe0f3eb1f4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1549297161-14f79605a74c?q=80&w=1851&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580915039535-eafb7e1cf16a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    "title": "Cat Litter Box",
    "category": "Cat Supplies",
    "origin_price": 35.00,
    "price": 29.99,
    "unit": "box",
    "description": "A compact and easy-to-clean litter box for cats.",
    "content": "This litter box features a high wall to prevent spills and an easy-scoop design to simplify cleaning.",
    "is_enabled": 1,
    "imageUrl": "https://images.unsplash.com/photo-1518365971303-fbb2d838ff37?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imagesUrl": [
      "https://images.unsplash.com/photo-1532357025082-484dcb55dd98?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1675519410061-2791206dae05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1655527213462-b6b67b18e855?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1608149477473-16d65433637c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  }
]

const API_BASE = 'https://ec-course-api.hexschool.io/v2'
const API_PATH = ''
const USERNAMES = ''
const PASSWORDS = ''

const signin = async () => {
  const res = await fetch(`${API_BASE}/admin/signin`, {
    method: "POST",
    body: JSON.stringify({ username: USERNAMES, password: PASSWORDS }),
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data.token
}

const upload = async () => {
  const token = await signin()

  products.forEach(async item => {
    const res = await fetch(`${API_BASE}/api/${API_PATH}/admin/product`, {
      method: "POST",
      body: JSON.stringify({ data: item }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
    })
    const data = await res.json()
    console.log(data)
  })

  const getProductRes = await fetch(`${API_BASE}/api/${API_PATH}/admin/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  })
  console.log(await getProductRes.json())

}

upload()


// headers: {
//   "Content-Type": "application/json",
//   "Accept": "application/json",
//   "Authorization": `Bearer ${token}`,
// }

// try {
//   const res = await fetch.post(`${API_BASE}/admin/signin`, loginFormData);
//   const { token, expired } = res.data;
//   document.cookie = `authToken=${token};expires=${new Date(expired)};`;
//   axios.defaults.headers.common.Authorization = token;
//   getProducts();
//   setIsLogin(true);
// } catch (err) {
//   console.log(err);
//   alert("Login Fail: \n" + err);
// }