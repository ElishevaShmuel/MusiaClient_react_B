import { useState } from "react";
import { Button, Input, Card, CardContent } from "../nav-bar/tols/Botton";

import { motion } from "framer-motion";
import { Play, Music, Users } from "lucide-react";
// import { Button, Card, CardContent, Input } from "@mui/material";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10"
   >
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ברוכים הבאים ל-מיוזיק
      </motion.h1>
      <p className="text-gray-400 mb-8 text-center max-w-2xl">
        הפלטפורמה לשיתוף, יצירה ושיתוף פעולה בין מוזיקאים מכל העולם.
      </p>

      <div className="flex space-x-2 mb-8 w-full max-w-md" style={{ height: "50px", margin: "10px" }}>

        <Input
          placeholder="חפש מוזיקה, אמנים ושיתופי פעולה..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border-none text-white"
          style={{ height: "22px", width: "80%", margin: "10px" }}
        />
        <Button className="bg-blue-500 hover:bg-blue-600">חפש</Button>
      </div>

      <div className="flex flex-row justify-around items-center gap-6"
        style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: "6px", margin: "0px" }}>
        <div style={{ width: "20%" }}>
          <Card className="bg-gray-800 p-6 text-center "
          >
            <Music size={48} className="text-blue-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">העלה ושתף</h2>
              <p className="text-gray-400 mt-2">שתף את היצירות שלך עם העולם.</p>
            </CardContent>
          </Card>
        </div>
        <div style={{  width: "20%" }}>

          <Card className="bg-gray-800 p-6 text-center">
            <Play size={48} className="text-green-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">גלה והאזן</h2>
              <p className="text-gray-400 mt-2">מצא שיתופי פעולה חדשים והאזן למוזיקה ייחודית.</p>
            </CardContent>
          </Card>
        </div>
        <div style={{ width: "20%" }}>

          <Card className="bg-gray-800 p-6 text-center">
            <Users size={48} className="text-yellow-400 mx-auto mb-4" />
            <CardContent>
              <h2 className="text-xl font-semibold">התחבר ליוצרים</h2>
              <p className="text-gray-400 mt-2">צור קשר עם מוזיקאים מכל העולם.</p>
            </CardContent>
          </Card>
        </div>
      </div>


      <Button className="mt-10 bg-purple-500 hover:bg-purple-600 text-lg px-6 py-3 rounded-xl shadow-lg">
        הצטרפו עכשיו
      </Button>
    </div>
  );
}

