import { motion } from 'framer-motion';
import { Music, Users, Award } from 'lucide-react';
import { Card, CardContent } from '../nav-bar/tols/Botton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        אודות מיוזיק
      </motion.h1>
      <p className="text-gray-400 mb-8 text-center max-w-2xl">
        ברוכים הבאים ל-מיוזיק, הפלטפורמה הגלובלית המיועדת ליוצרי מוזיקה, חובבים ומקצוענים כאחד, לשיתוף, החלפה ושיתוף פעולה באמצעות קבצי שמע. אנו מעודדים הדדיות ושיתוף פעולה באמצעות מערכת תגמולים פנימית, המאפשרת למשתמשים להרוויח ולהשתמש במטבע וירטואלי.
      </p>

      <div className="flex flex-wrap justify-around items-center gap-6 w-full max-w-4xl">
        <motion.div
          className="w-full sm:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 p-6 text-center">
            <Music size={48} className="text-blue-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">החזון שלנו</h2>
              <p className="text-gray-400 mt-2">
                ליצור קהילה מאוחדת של מוזיקאים מכל העולם, המאפשרת שיתוף פעולה ויצירה משותפת.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="w-full sm:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-800 p-6 text-center">
            <Users size={48} className="text-green-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">הקהילה שלנו</h2>
              <p className="text-gray-400 mt-2">
                קהילה מגוונת של יוצרים, ממלחינים ועד מפיקים, המשתפים פעולה ויוצרים יחד.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="w-full sm:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-800 p-6 text-center">
            <Award size={48} className="text-yellow-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">מערכת התגמולים</h2>
              <p className="text-gray-400 mt-2">
                מערכת תגמולים פנימית המאפשרת למשתמשים להרוויח ולהשתמש במטבע וירטואלי.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
