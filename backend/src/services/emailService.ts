import { logger } from "../lib/logger.js";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_ADDRESS = "PROCASH <onboarding@resend.dev>";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

interface OrderConfirmationInput {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  items: { productName: string; quantity: number; price: number }[];
}

function buildHtml(order: OrderConfirmationInput) {
  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;color:#1a1a1a;">${item.productName} &times; ${item.quantity}</td>
        <td style="padding:8px 0;text-align:right;color:#1a1a1a;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `
  <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a1a;">
    <h1 style="font-size:22px;">Commande confirmée</h1>
    <p>Bonjour ${order.customerName},</p>
    <p>Merci pour votre commande <strong>${order.orderNumber}</strong>. Voici le récapitulatif :</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      ${rows}
    </table>
    <p style="font-size:18px;font-weight:bold;">Total : ${formatPrice(order.totalAmount)}</p>
    <p style="color:#666;font-size:13px;">PROCASH — Équipements Restaurant Premium</p>
  </div>`;
}

/**
 * No-op (logs and returns) when RESEND_API_KEY isn't configured, so the checkout/webhook flow
 * never fails just because email isn't set up yet.
 */
export async function sendOrderConfirmationEmail(order: OrderConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.warn("RESEND_API_KEY not set — skipping order confirmation email");
    return { sent: false };
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: order.customerEmail,
        subject: `Confirmation de commande ${order.orderNumber}`,
        html: buildHtml(order),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      logger.error({ status: res.status, body }, "Failed to send order confirmation email");
      return { sent: false };
    }

    return { sent: true };
  } catch (err) {
    logger.error({ err }, "Order confirmation email request failed");
    return { sent: false };
  }
}
