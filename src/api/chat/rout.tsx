import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `אתה עוזר וירטואלי של אתר מיוזיק - פלטפורמה לשיתוף מוזיקה.
    
    תפקידך:
    - לעזור למשתמשים להבין איך להשתמש באתר
    - לענות על שאלות על העלאת קבצי מוזיקה
    - להסביר על מערכת הקרדיטים
    - לעזור עם בעיות טכניות
    - לתת המלצות על שיתופי פעולה מוזיקליים
    
    תמיד תענה בעברית ובצורה ידידותית ומועילה.
    האתר מאפשר למשתמשים להעלות קבצי MP3, להאזין למוזיקה של אחרים, ולהרוויח קרדיטים על ידי העלאת תוכן.`,
    messages,
  })

  return result.toDataStreamResponse()
}
