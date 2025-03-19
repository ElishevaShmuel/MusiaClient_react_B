import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function Button({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      {...props}
      onClick={()=>{}}
    >
      {children}
    </motion.button>
  );
}


export function Input({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      className={`px-4 py-2 rounded-lg border border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      {...props}
    />
  );
}


export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-6">{children}</div>;
}



