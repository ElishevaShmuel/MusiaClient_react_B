import axios from "axios"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  id: string
}

export class  ChatbotService{
  private static instance: ChatbotService
  private serverUrl: string

  private constructor() {
    this.serverUrl = import.meta.env.VITE_SERVERURL

  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService()
    }
    return ChatbotService.instance
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      // ננסה קודם לשלוח לשרת שלך
      const response = await this.callServerAPI(messages)
      if (response) {
        return response
      }
    } catch (error) {
      console.log("Server API not available, using preset responses")
    }

    // אם השרת לא זמין, נשתמש בתגובות מוכנות מראש
    return this.getPresetResponse(messages[messages.length - 1].content)
  }

  private async callServerAPI(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await axios.post(`${this.serverUrl}/api/chat`, {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })
      console.log("Response from server:", response.data);
      
      return response.data.message

    } catch (error) {
      throw new Error("Server API call failed")
    }
  }

  private getPresetResponse(userMessage: string): string {
    const message = userMessage.toLowerCase()

    // תגובות מוכנות מראש לשאלות נפוצות
    if (message.includes("העלאה") || message.includes("העלה") || message.includes("upload")) {
      return `🎵 להעלאת קבצי מוזיקה:
1. היכנס לעמוד הפרופיל שלך
2. לחץ על כפתור "upload"
3. בחר קובץ MP3 מהמחשב שלך
4. לחץ על "העלה"

💰 תקבל 10 קרדיטים על כל קובץ שתעלה!`
    }

    if (message.includes("קרדיט") || message.includes("מטבע") || message.includes("כסף")) {
      return `💰 מערכת הקרדיטים:
- תקבל 10 קרדיטים על כל קובץ שתעלה
- הורדת קובץ עולה 10 קרדיטים
- הקרדיטים שלך מוצגים בעמוד הפרופיל
- ככל שתעלה יותר תוכן, תוכל להוריד יותר מוזיקה!`
    }

    if (message.includes("הורדה") || message.includes("הורד") || message.includes("download")) {
      return `⬇️ להורדת קבצי מוזיקה:
1. עבור לעמוד "כל השירים"
2. חפש את השיר שאתה רוצה
3. לחץ על אייקון ההורדה
4. הקובץ יורד אוטומטית למחשב שלך

💡 זכור: הורדה עולה 10 קרדיטים`
    }

    if (message.includes("השמעה") || message.includes("נגן") || message.includes("play")) {
      return `▶️ להשמעת מוזיקה:
- לחץ על כפתור ה-Play ליד השיר
- ההשמעה חינמית ולא עולה קרדיטים
- תוכל להאזין לכל השירים באתר בחינם!`
    }

    if (message.includes("רשמה") || message.includes("חשבון") || message.includes("התחבר")) {
      return `👤 ניהול חשבון:
- הירשם באמצעות אימייל וסיסמה
- בחר תפקיד: User או Admin
- לאחר ההרשמה תוכל להעלות ולהוריד מוזיקה
- הפרופיל שלך יציג את הקרדיטים והקבצים שלך`
    }

    if (message.includes("בעיה") || message.includes("שגיאה") || message.includes("לא עובד")) {
      return `🔧 פתרון בעיות נפוצות:
- ודא שהקובץ הוא בפורמט MP3
- בדוק את החיבור לאינטרנט
- נסה לרענן את הדף
- אם הבעיה נמשכת, צור קשר דרך עמוד "צור קשר"`
    }

    if (message.includes("שיתוף") || message.includes("קולבורציה") || message.includes("עבודה")) {
      return `🤝 שיתופי פעולה מוזיקליים:
- העלה את הפרויקטים שלך לאתר
- חפש מוזיקאים אחרים באמצעות החיפוש
- הורד קבצים לעבודה משותפת
- השתמש במערכת הקרדיטים לעידוד שיתוף`
    }

    if (message.includes("שלום") || message.includes("היי") || message.includes("hello")) {
      return `שלום! 👋 ברוך הבא לאתר מיוזיק!

אני העוזר הוירטואלי שלך ואני כאן לעזור לך עם:
🎵 העלאת קבצי מוזיקה
⬇️ הורדת שירים
💰 מערכת הקרדיטים
▶️ השמעת מוזיקה
👤 ניהול חשבון
🔧 פתרון בעיות
🤝 שיתופי פעולה

איך אני יכול לעזור לך היום?`
    }

    // תגובה כללית
    return `שלום! 👋 אני כאן לעזור לך עם אתר מיוזיק.

אני יכול לעזור לך עם:
🎵 העלאת קבצי מוזיקה
⬇️ הורדת שירים
💰 מערכת הקרדיטים
▶️ השמעת מוזיקה
👤 ניהול חשבון
🔧 פתרון בעיות

איך אני יכול לעזור לך היום?`
  }
}