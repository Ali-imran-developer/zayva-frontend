export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Product Type",
    name: "productType",
    componentType: "select",
    options: [
      { id: "new-arrival", label: "New Arrival" },
      { id: "premium-collection", label: "Premium Collection" },
      { id: "saya-essence", label: "Saya Essence" },
      { id: "emmboiered-three-pcs", label: "Emmboiered 3 pcs" },
      { id: "summer-collection", label: "Summer Collection" },
      { id: "other", label: "Other" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      // { id: "accessories", label: "Accessories" },
      // { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "saya", label: "SAYA" },
      { id: "khaadi", label: "Khaadi" },
      { id: "lv", label: "Lv" },
      { id: "adidas", label: "Adidas" },
      { id: "nike", label: "Nike" },
      { id: "limelight", label: "LimeLight" },
      { id: "binsaeed", label: "Bin Saeed" },
      { id: "ittehad", label: "Ittehad" },
      { id: "ramsha", label: "Ramsha" },
      { id: "mariab", label: "Maria.B" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const menuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "new-arrival",
    label: "New Arrival",
    path: "/shop/new-arrival",
  },
  {
    id: "premium-collection",
    label: "Premium Collection",
    path: "/shop/premium-collection",
  },
  {
    id: "saya-essence",
    label: "Saya Essence",
    path: "/shop/saya-essence",
  },
  {
    id: "emmboiered-three-pcs",
    label: "Emmboiered 3 pcs",
    path: "/shop/emmboiered-three-pcs",
  },
  {
    id: "summer-collection",
    label: "Summer Collection",
    path: "/shop/summer-collection",
  },
  {
    id: "refund-return-policy",
    label: "Refund & Return Policy",
    path: "/shop/return-policy",
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    path: "/shop/privacy-policy",
  },
  {
    id: "about",
    label: "About",
    path: "/shop/about",
  },
  // {
  //   id: "products",
  //   label: "Products",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "blogs",
  //   label: "Blogs",
  //   path: "/shop/blogs",
  // },
  // {
  //   id: "contact",
  //   label: "Contact",
  //   path: "/shop/contact",
  // },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    // { id: "accessories", label: "Accessories" },
    // { id: "footwear", label: "Footwear" },
  ],
  options: [
    { id: "saya", label: "SAYA" },
    { id: "khaadi", label: "Khaadi" },
    { id: "lv", label: "Lv" },
    { id: "adidas", label: "Adidas" },
    { id: "nike", label: "Nike" },
    { id: "limelight", label: "LimeLight" },
    { id: "binsaeed", label: "Bin Saeed" },
    { id: "ittehad", label: "Ittehad" },
    { id: "ramsha", label: "Ramsha" },
    { id: "mariab", label: "Maria.B" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
