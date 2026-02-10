// import { motion } from "framer-motion";
// import {
//   FaShoppingBag,
//   FaHeart,
// } from "react-icons/fa";
// import { MdLocalOffer } from "react-icons/md";
// import { HiShieldCheck } from "react-icons/hi";

// const premiumImages = {
//   shipping: "https://images.unsplash.com/photo-1543258103-2151c3b40f9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//   security: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//   discount: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//   returns: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
// };

// const features = [
//   {
//     image: premiumImages.shipping,
//     title: "White Glove Delivery",
//     desc: "Hand-delivered by our concierge team with full setup service",
//     icon: <FaShoppingBag className="text-amber-600" />,
//   },
//   {
//     image: premiumImages.security,
//     title: "Absolute Security",
//     desc: "Bank-level encryption and fraud protection for all transactions",
//     icon: <HiShieldCheck className="text-rose-600" />,
//   },
//   {
//     image: premiumImages.discount,
//     title: "Exclusive Access",
//     desc: "Priority access to limited editions and private collections",
//     icon: <MdLocalOffer className="text-violet-600" />,
//   },
//   {
//     image: premiumImages.returns,
//     title: "Effortless Returns",
//     desc: "365-day return policy with complimentary pickup service",
//     icon: <FaHeart className="text-blue-600" />,
//   },
// ];

// export const PremiumFeatures = () => {
//   return (
//     <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
//             Uncompromising Excellence
//           </h2>
//           <p className="text-gray-500 max-w-2xl mx-auto font-light">
//             Every aspect of our service is designed to provide an unparalleled
//             luxury experience
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard key={index} feature={feature} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const FeatureCard = ({ feature, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
//     >
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={feature.image}
//           alt={feature.title}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//         <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
//           {feature.icon}
//         </div>
//       </div>
//       <div className="p-6">
//         <h3 className="text-xl font-light text-gray-900 mb-2">
//           {feature.title}
//         </h3>
//         <p className="text-gray-500 text-sm font-light">
//           {feature.desc}
//         </p>
//       </div>
//     </motion.div>
//   );
// };