import img1 from "../../../assets/images/users/1.jpg";
import img2 from "../../../assets/images/users/2.jpg";
import img3 from "../../../assets/images/users/3.jpg";
import img4 from "../../../assets/images/users/4.jpg";

import sprd1 from "../../../assets/images/products/s1.jpg";
import sprd2 from "../../../assets/images/products/s2.jpg";
import sprd3 from "../../../assets/images/products/s3.jpg";

//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: img2,
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: img3,
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: img4,
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
];

//
// Messages dropdown
//
const messages = [
  {
    avatar: img1,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
    time: "9:08 AM",
    status: "success",
  },
  {
    avatar: img2,
    title: "New message received",
    subtitle: "Salma sent you new message",
    time: "11:56 AM",
    status: "warning",
  },
  {
    avatar: img3,
    title: "New Payment received",
    subtitle: "Check your earnings",
    time: "4:39 AM",
    status: "success",
  },
  {
    avatar: img4,
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
    time: "1:12 AM",
    status: "danger",
  },
];

//
// Ecommerce dropdown
//
const products = [
  {
    imgsrc: sprd1,
    name: "butterscotch ice-cream",
    subtext: "Milk product",
    price: "250",
  },
  {
    imgsrc: sprd2,
    name: "Supreme fresh tomato",
    subtext: "Vegetable Item",
    price: "450",
  },
  {
    imgsrc: sprd3,
    name: "Red color candy",
    subtext: "Food Item",
    price: "190",
  },
];

export { notifications, messages, products };
