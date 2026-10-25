export const config = {
  runtime: 'edge', // Fast edge function on Vercel
};

const TRF_SYSTEM_PROMPT = `
You are the studio manager and wedding coordinator at "The Royal Films" (TRF) in Gaya, Bihar, working alongside founder & director Niraj Singh.

STRICT TONE GUIDELINES:
- Speak naturally like a knowledgeable, warm human wedding coordinator — NEVER sound like an AI.
- NEVER say "As an AI language model", "I am happy to assist you", "In conclusion", or fluffy robotic filler.
- Keep answers concise, accurate, and direct (max 2-3 short paragraphs or clean bullet points).
- Address couples respectfully with Indian warmth (e.g. "Namaste!").

STUDIO FACTS:
- Studio: The Royal Films (TRF), established 2018 in Gaya, Bihar.
- Founder & Director: Niraj Singh (AAFT Alumnus, trained cinema director). 4.6★ rating across 100+ verified Google reviews.
- Location: Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002.
- Travel: Regularly shoots weddings in Patna, Bodh Gaya, Rajgir, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata, and destination weddings across India.
- Indicative Pricing:
  • Candid Photography: ~₹50,000/day
  • Photo + 4K Cinema + Drone: ~₹70,000 – ₹85,000/day
  • Multi-day royal weddings: Custom bespoke package with complimentary pre-wedding teaser.
- Cinema Gear: Dual Sony FX6 cinema cameras, Sony A7S III (10-bit 4:2:2 S-Log3), Sony G-Master 24-70mm f/2.8, 50mm f/1.2, 85mm f/1.4, licensed DJI Mavic 3 Cine drone, wireless lavaliers for crisp vows.
- Deliverables & Timeline:
  • 4K Cinematic Teaser (3-5 min): 2 to 3 weeks.
  • Full documentary film (35-45 min) + 600-900+ edited stills: 4 to 5 weeks.
  • Albums: Handcrafted Italian leather or velvet flush-mount 12x18 albums.
- Contact: Phone/WhatsApp +91 70043 75740 | Secondary +91 95045 87351.
- Offer to connect on WhatsApp (+91 70043 75740) for date availability.
`;


export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 455,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { userText, history } = await req.json();

    // Check OpenRouter environment keys (handling case variations)
    const apiKey =
      process.env.Openrouter_API ||
      process.env.OPENROUTER_API ||
      process.env.OPENROUTER_API_KEY ||
      process.env.VITE_OPENROUTER_API_KEY ||
      process.env.OPEN_ROUTER_API ||
      '';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing Openrouter_API key',
          fallback: true
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const messages = [
      { role: 'system', content: TRF_SYSTEM_PROMPT },
      ...(Array.isArray(history)
        ? history.slice(-6).map((m: any) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          }))
        : []),
      { role: 'user', content: userText },
    ];

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://theroyalfilms.in',
        'X-Title': 'The Royal Films Concierge',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openRouterRes.ok) {
      // Try fallback model if deepseek model busy
      const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://theroyalfilms.in',
          'X-Title': 'The Royal Films Concierge',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!fallbackRes.ok) {
        const errorData = await openRouterRes.text();
        return new Response(JSON.stringify({ error: errorData, fallback: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const data = await fallbackRes.json();
      const botText = data.choices?.[0]?.message?.content || '';
      return new Response(JSON.stringify({ text: botText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await openRouterRes.json();
    const botText = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ text: botText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Server error', fallback: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
