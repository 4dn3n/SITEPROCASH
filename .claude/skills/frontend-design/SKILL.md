# Guide d'Adaptation : Frontend-Design + Video-to-Website → E-commerce Restaurant + Stripe

**Date** : 21 septembre 2026  
**Objectif** : Adapter tes deux skills puissants pour générer un site e-commerce restaurant complet avec Stripe et chatbot IA

---

## 🎯 Vue d'ensemble de l'adaptation

### Tes deux skills actuels
1. **frontend-design** : création d'interfaces premium sans "AI slop"
2. **video-to-website** : sites scroll-driven animés avec GSAP + canvas

### Ton besoin
- **E-commerce B2B** d'équipements restaurant
- **Chatbot IA** Claude conversationnel
- **Intégration Stripe** pour paiements
- **Générateur de plan** d'agencement
- **Backend** + frontend produit ensemble

### Défi
Les deux skills sont pensés pour :
- **Frontend-design** : interfaces statiques/légères (componentes)
- **Video-to-website** : sites visuels/narratifs (scroll-driven, animations GSAP)

**TON BESOIN** : application e-commerce dynamique, full-stack, avec logique métier complexe

---

## 🔄 Stratégie d'adaptation en 3 couches

### Couche 1 : Aesthetic & UX (Frontend-Design)
✅ **Applicable directement**

**Appliquer à ton e-commerce** :
- Typographie distinctive (NOT Inter, Roboto)
- Palette couleur dominante + accent sharp
- Animations GSAP pour panier, filtres, checkout
- Compositions asymétriques pour pages produits
- Motion microinteractions (hover, add-to-cart, devis generated)

**Adapter pour e-com** :
- Card produits : oui, mais avec design distinctif (pas glassmorphism classique)
- Hero landing : section "équipements restaurant" avec typographie massive
- Filtres avancés : animations slide-in/slide-out
- Panier sidebar : animation reveal fluid
- Checkout Stripe : minimal, refined, high-contrast

### Couche 2 : Scroll Choreography (Video-to-Website)
⚠️ **Partiellement applicable**

**Garder** :
- Lenis smooth scroll
- ScrollTrigger pour animations au scroll
- Staggered reveals (label → heading → body)
- Marquee text horizontal (pour slogan "équipements restaurant premium")
- Counter animations (stats : "500+ produits", "1000+ clients", etc.)
- Section color zones (background shifts)

**Adapter pour e-com** :
- ❌ Pas de canvas + frames vidéo (ce n'est pas un video-to-website)
- ❌ Pas de 800vh+ total scroll (trop long pour e-com)
- ✅ Utiliser scroll-driven animations **partiellement** :
  - Landing page : hero + 3-4 sections scroll-animated
  - Catalog page : grille produits avec reveal staggered
  - Product detail : specs reveal au scroll
  - Testimonials section : scroll-triggered counters

**Not full scroll-driven** → juste injecter les animations sur certaines pages clés

### Couche 3 : Architecture Full-Stack
❌ **Non couverte par les skills**

**À ajouter** :
- Backend API (Node/Express ou FastAPI)
- Database (PostgreSQL + Prisma)
- Claude API integration (chatbot)
- Stripe integration
- Floor plan generator backend
- Authentication (JWT)
- Cart/checkout logic

---

## 📋 Prompt adapté pour Claude VS Code

### Structure recommandée du prompt

```markdown
# PROJET : Site E-commerce Restaurant + Chatbot IA + Stripe

## Contexte
Tu es un assistant de développement full-stack. Tu vas créer un site e-commerce B2B 
pour équipements de cuisine/restaurant, avec chatbot IA et intégration Stripe.

## Style & Esthétique (Frontend-Design Skill)
- **Aesthetic Direction** : [CHOISIS UN] 
  - Luxury/refined (noir + or, typographie prestigious)
  - Brutalist/raw (gris béton, typographie sans-serif bold)
  - Maximalist (couleurs vives, animations multiples, grille dense)
  - Minimalist (white space, typographie fine, subtle animations)
  
- **Typography**
  - Display font : [choisir parmi : Playfair Display, EB Garamond, Bebas Neue, IBM Plex Mono]
  - Body font : [choisir parmi : Lora, DM Sans, Sora, JetBrains Mono]
  
- **Color Palette**
  - Primary : [couleur dominante]
  - Secondary : [accent sharp]
  - Background : [light/dark]
  - Text : [contrast optimal]
  
- **Animation Strategy**
  - Landing page : GSAP scroll-triggered reveals
  - Catalog : staggered product card entrance
  - Panier : slide-in/slide-out avec feedback
  - Checkout : sequential step animations
  
- **Layouts**
  - Hero : massive typography (4-6rem), asymmetric composition
  - Catalog : 3-column grid (desktop), 1-column (mobile)
  - Product detail : split layout (image left, specs right)
  - Chatbot widget : corner-pinned, slide-in reveal

## Architecture Full-Stack
- **Frontend** : Next.js + React + TypeScript + TanStack Query + Zustand + Tailwind
- **Backend** : Express.js + PostgreSQL + Prisma + Redis
- **Payment** : Stripe integration (Checkout Session flow)
- **IA** : Claude API avec function calling (chatbot)
- **Deploy** : Vercel (frontend) + Railway (backend)

## Features à implémenter

### 1. Landing Page (SCROLL-ANIMATED)
- Hero section avec word-split animation
- "Why us" section avec counter stats
- Featured products carousel
- Testimonials section
- CTA contact chatbot

### 2. Catalog Page
- Search bar + advanced filters
- Product grid avec reveal staggered
- Filtres côté : category, brand, price range, dimensions
- Sorting : relevance, price (asc/desc), newest
- Lazy-loading images

### 3. Product Detail Page
- Main image + thumbnail carousel
- Specs & dimensions
- Pricing + quantity selector
- "Add to cart" button avec feedback GSAP
- Related products carousel
- Reviews section

### 4. Shopping Cart
- Sidebar cart avec remove/quantity update
- Cart summary : subtotal, taxes, shipping
- "Proceed to checkout" button
- Cart persistence (localStorage + DB)

### 5. Checkout (Stripe)
- Multi-step form : shipping → billing → payment
- Stripe Elements (card input)
- Order summary relecture
- Loading state pendant processus Stripe
- Success page post-payment

### 6. Chatbot IA (Claude API)
- Widget corner-pinned (bottom-right)
- Initial greeting + menu options
- Consultation flow (type client → besoins → recommandations)
- Product search via chatbot
- Quote generation
- Contact form integration
- Conversation history (optionnel)

### 7. User Dashboard (optionnel v1)
- Order history
- Saved quotes
- Wishlist
- Profile settings

## Données initiales (seed)
- 20 produits de test (cuisines, frigos, accessoires)
- 5 catégories
- 3 marques pour les tests

## Checklist d'implémentation
- [ ] Setup projet (monorepo)
- [ ] Design system (couleurs, fonts, components)
- [ ] Landing page scrollAnimated
- [ ] Catalog page + API
- [ ] Product detail page
- [ ] Shopping cart (frontend + backend)
- [ ] Stripe integration
- [ ] Chatbot Claude API
- [ ] Authentification (optionnel)
- [ ] Tests E2E
- [ ] Deploy

## Contraintes techniques
- ✅ PRODUCTION-READY : pas de "placeholder" ou "TODO"
- ✅ ZERO generic AI aesthetics : fonts distinctives, animations intentionnelles
- ✅ Mobile-first responsive
- ✅ Accessibility : WCAG 2.1 AA
- ✅ Performance : Lighthouse 90+
- ✅ Error handling : user-friendly messages
- ✅ Stripe : test mode API keys provided
```

---

## 🎨 Recommandations aesthetic pour restaurant e-commerce

### Option 1 : **LUXURY/REFINED** ⭐ Recommandé
```
Purpose : Positionner comme premium B2B supplier
Tone : Sophisticated, elegant, trustworthy
Display Font : EB Garamond (serif elegant) ou Playfair Display
Body Font : Lora ou DM Sans
Colors :
  - Primary : #0a0a0a (deep black)
  - Secondary : #d4af37 (gold accent)
  - Background : #f5f3f0 (warm white)
  - Text : #1a1a1a on light, #ede8e1 on dark
Animations :
  - Subtle: fade-up, slide-left (never too chaotic)
  - Micro-interactions : smooth hover states, elegant loading spinners
  - Scroll-triggered : text reveals, counter animations
Memorable detail :
  - Gold accent bar under headings
  - Custom ornamental corners on hero
  - Elegant serif typography throughout
```

### Option 2 : **BRUTALIST/RAW** (Modern, technical)
```
Purpose : Position as modern, no-nonsense B2B platform
Tone : Direct, technical, efficient
Display Font : IBM Plex Mono Bold ou Courier Prime
Body Font : Sora ou JetBrains Mono
Colors :
  - Primary : #2c2c2c (grey)
  - Secondary : #ff6b35 (orange accent)
  - Background : #fafafa (minimal white)
  - Text : #000000 on light
Animations :
  - Grid reveals, clip-path wipes
  - Bold transitions, no subtlety
  - Raw data counters (numbers count up instantly)
Memorable detail :
  - Thin border frames around product cards
  - Monospace pricing & specs
  - Diagonal grid layouts
```

### Option 3 : **MAXIMALIST** (Energetic, modern)
```
Purpose : Attract younger restaurateurs, chains
Tone : Bold, energetic, youthful
Display Font : Bebas Neue ou Space Grotesk (but make it YOURS with custom spacing)
Body Font : Sora ou Inter (but customize heavily)
Colors :
  - Primary : #6366f1 (indigo)
  - Secondary : #ec4899 (pink)
  - Accent 3 : #14b8a6 (teal)
  - Background : #09090b (dark)
Animations :
  - LOTS of movement: bounce, scale, rotate
  - Colorful gradients & glows
  - Particle effects on hover
Memorable detail :
  - Animated product cards (rotate on hover)
  - Gradient text overlays
  - SVG animations throughout
```

**JE RECOMMANDE : Option 1 (Luxury/Refined)** ← ce positionnement B2B premium convient au marché restaurant

---

## 🔧 Intégrations techniques clés

### 1. Stripe Integration
```typescript
// Frontend (Next.js API route)
import Stripe from 'stripe';

export async function POST(req: Request) {
  const { items, customerEmail } = await req.json();
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    customer_email: customerEmail,
  });
  
  return { sessionId: session.id };
}
```

### 2. Claude API Chatbot
```typescript
// Backend endpoint
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function chatbot(userMessage: string, context: any) {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    tools: [
      {
        name: 'search_products',
        description: 'Search products by query',
        input_schema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            category: { type: 'string' },
          },
        },
      },
      {
        name: 'create_quote',
        description: 'Generate quote from selected items',
        input_schema: {
          type: 'object',
          properties: {
            items: { type: 'array' },
          },
        },
      },
    ],
    system: `Tu es un assistant expert en équipements de restauration.
    Aide les clients à trouver les produits adéquats selon leurs besoins.
    Pose des questions sur le type de cuisine, le volume, et le budget.
    Recommande des packs complets d'équipements.
    Tu peux chercher des produits et générer des devis.`,
    messages: [{ role: 'user', content: userMessage }],
  });
  
  return response;
}
```

### 3. Prisma Schema (ProductDB)
```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  description String
  category    String
  brand       String
  price       Float
  dimensions  String
  weight      Float
  image       String
  specs       Json
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  cartItems   CartItem[]
  orderItems  OrderItem[]
}

model CartItem {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  cartId    String
  createdAt DateTime @default(now())
}

model Order {
  id           String   @id @default(cuid())
  customerId   String
  items        OrderItem[]
  totalAmount  Float
  status       String   @default("pending")
  stripeId     String   @unique
  createdAt    DateTime @default(now())
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}
```

---

## 🎬 Prompt final pour Claude VS

### Pour démarrer le projet complet :

```
Je veux que tu crées un site e-commerce complet pour équipements restaurant.

DESIGN AESTHETIC :
- Style : Luxury/Refined (gold accents, elegant serif typography)
- Display Font : EB Garamond
- Body Font : Lora
- Colors : Black (#0a0a0a) + Gold (#d4af37) + Warm White (#f5f3f0)
- Animations : GSAP scroll-triggered reveals, smooth transitions, elegant micro-interactions

FRONTEND (Next.js) :
1. Landing page (hero scroll-animated + 3 sections) → call frontend-design skill
2. Catalog page (products grid, filters, search)
3. Product detail page (specs, add-to-cart, related products)
4. Shopping cart (sidebar, summary)
5. Checkout (Stripe integration)
6. Chatbot IA Claude (corner widget, conversation flow)

BACKEND (Express.js + PostgreSQL) :
1. Product API (CRUD, filtering, search)
2. Cart API (add, remove, update, persist)
3. Stripe payment processing
4. Claude chatbot endpoint (function calling)
5. Order management
6. Authentication (JWT optional)

DATA :
- 20 produits seed (frigos, plaques, accessoires)
- 5 catégories
- Pricing en EUR

DEPLOYMENT :
- Vercel (frontend)
- Railway (backend)

CONSTRAINTS :
- Production-ready (no placeholders)
- Responsive mobile-first
- Stripe test mode
- Accessible (WCAG 2.1 AA)
- Error handling
- Fast loading (Lighthouse 90+)

START WITH : Landing page design + Catalog page → then build backend
```

---

## 📊 Checklist d'implémentation par phase

### Phase 1 : Foundation (Semaine 1)
- [ ] Monorepo setup (frontend + backend)
- [ ] Design system (tokens, fonts, colors)
- [ ] Landing page hero + basic sections
- [ ] Catalog page skeleton + product grid
- [ ] Product database seed

### Phase 2 : E-commerce Core (Semaine 2)
- [ ] Product API endpoints
- [ ] Shopping cart (frontend + backend)
- [ ] Checkout form (Stripe Elements)
- [ ] Order creation post-payment
- [ ] Basic animations (GSAP)

### Phase 3 : IA & Polish (Semaine 3)
- [ ] Chatbot widget + Claude API
- [ ] Advanced animations (scroll-triggered)
- [ ] Product detail page enhancements
- [ ] Error handling & validation
- [ ] Performance optimization
- [ ] Testing & deploy

---

## ✨ Différenciateurs (utilise les skills à fond)

### Frontend-Design ✅
- Typographie distinctive EB Garamond (PAS Inter/Roboto)
- Animations intentionnelles : hover states, add-to-cart feedback, filter transitions
- Color zones : hero dark + gold, catalog light + accents, checkout refined white
- No glassmorphism : cards avec bordures fines, backgrounds subtiles

### Video-to-Website (partiellement) ✅
- Landing page : Lenis smooth scroll
- Staggered reveals : landing sections + catalog product cards
- Counter animations : "500+ produits", "1000+ clients"
- Marquee text : "Premium Restaurant Equipment" horizontal animation
- ScrollTrigger : product details reveal au scroll

### Full-Stack ✅
- Stripe test checkout complet
- Claude chatbot avec function calling (search_products, create_quote)
- PostgreSQL + Prisma pour data persistence
- JWT auth optionnel
- API REST bien structurée

---

## 🚀 Comment utiliser ce guide

1. **Choisis l'aesthetic** (je recommande Luxury/Refined)
2. **Copie le prompt final** dans Claude VS
3. **Attache les deux skills** (frontend-design + video-to-website)
4. **Ajoute tes clés API** : Stripe, Anthropic (Claude)
5. **Claude génère** : boilerplate + landing + catalog
6. **Tu affines** : chatbot, checkout, animations supplémentaires

Le combo **frontend-design** (pour l'esthétique) + **video-to-website** (pour les animations GSAP) 
= site e-commerce **vraiment distinctif**, pas du "AI slop" générique.

---

**Status** : 🟢 Prêt à lancer | **Prochaine étape** : Donne-moi tes préférences (aesthetic direction + couleurs) et je génère le prompt final optimisé

