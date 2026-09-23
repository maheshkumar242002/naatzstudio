import type { CartItem, ShippingAddress, Product } from '../types';

export const PRIMARY_WHATSAPP_NUMBER = '8220960818';
export const STUDIO_CALL_NUMBER = '7639989363';

export const generateCartWhatsAppUrl = (
  items: CartItem[],
  address: ShippingAddress,
  totalAmount: number
): string => {
  const itemLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*\n   • Qty: ${item.quantity}\n   • Price: ₹${item.product.price} each\n   • Subtotal: ₹${item.product.price * item.quantity}${item.customNote ? `\n   • Custom Note: _${item.customNote}_` : ''}`
    )
    .join('\n\n');

  const text = `🟡 *NEW ORDER FROM NAATZ STUDIO* 🟡
━━━━━━━━━━━━━━━━━━━━
📸 _Your Memories... Our Creation..._

👤 *CUSTOMER DETAILS:*
• Name: *${address.fullName}*
• Phone: *${address.phone}*

📍 *DELIVERY ADDRESS:*
• Address: ${address.streetAddress}
${address.landmark ? `• Landmark: ${address.landmark}\n` : ''}• City: ${address.city}
• State: ${address.state}
• Pincode: *${address.pincode}*

📦 *ITEMS ORDERED:*
${itemLines}

━━━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY:*
• Subtotal: ₹${totalAmount}
• Shipping: FREE (Studio Promo)
• *Grand Total: ₹${totalAmount}*
• Payment Mode: ${address.paymentMethod === 'whatsapp_pay' ? 'Pay on WhatsApp (UPI)' : address.paymentMethod === 'upi' ? 'Direct UPI' : 'Cash on Delivery'}

${address.customizationDetails ? `🎨 *CUSTOMIZATION / SPECIAL INSTRUCTIONS:*\n"${address.customizationDetails}"\n\n` : ''}Please confirm my order and let me know the estimated dispatch date! ✨`;

  const encoded = encodeURIComponent(text);
  const targetNumber = PRIMARY_WHATSAPP_NUMBER.startsWith('91')
    ? PRIMARY_WHATSAPP_NUMBER
    : `91${PRIMARY_WHATSAPP_NUMBER}`;

  return `https://wa.me/${targetNumber}?text=${encoded}`;
};

export const generateSingleProductWhatsAppUrl = (
  product: Product,
  customNote?: string
): string => {
  const text = `🟡 *NAATZ STUDIO - PRODUCT ENQUIRY / INSTANT ORDER* 🟡
━━━━━━━━━━━━━━━━━━━━
Hi Naatz Studio! I would like to order:

🏷️ *Product:* ${product.name}
📂 *Category:* ${product.categoryName}
💵 *Price:* ₹${product.price}
${customNote ? `📝 *Custom Request:* ${customNote}\n` : ''}
Please share delivery details and address format to place this order! 🚀`;

  const encoded = encodeURIComponent(text);
  const targetNumber = PRIMARY_WHATSAPP_NUMBER.startsWith('91')
    ? PRIMARY_WHATSAPP_NUMBER
    : `91${PRIMARY_WHATSAPP_NUMBER}`;

  return `https://wa.me/${targetNumber}?text=${encoded}`;
};

export const generateServiceBookingWhatsAppUrl = (
  serviceName: string,
  phoneModel: string,
  issueDetails: string,
  customerName: string,
  customerAddress: string
): string => {
  const text = `🔧 *NAATZ STUDIO - MOBILE SERVICE BOOKING* 🔧
━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${customerName}
📱 *Device / Model:* ${phoneModel}
🛠️ *Required Service:* ${serviceName}
📝 *Issue Description:* ${issueDetails}
📍 *Customer Address / Pickup:* ${customerAddress}

Please provide a quote and appointment slot. Thank you!`;

  const encoded = encodeURIComponent(text);
  const targetNumber = PRIMARY_WHATSAPP_NUMBER.startsWith('91')
    ? PRIMARY_WHATSAPP_NUMBER
    : `91${PRIMARY_WHATSAPP_NUMBER}`;

  return `https://wa.me/${targetNumber}?text=${encoded}`;
};
