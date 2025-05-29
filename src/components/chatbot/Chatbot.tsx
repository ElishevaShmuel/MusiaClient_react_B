"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Box, Paper, TextField, IconButton, Typography, Avatar, Fab, List, ListItem, Divider } from "@mui/material"
import { Send, Close, SmartToy, Person, ChatBubble } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { ChatbotService, type ChatMessage } from "../../services/ChatbotService"

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatbotService = ChatbotService.getInstance()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await chatbotService.sendMessage([...messages, userMessage])

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "מצטער, יש לי בעיה טכנית כרגע. אנא נסה שוב מאוחר יותר.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* כפתור צף לפתיחת הצ'אט */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "rgba(107, 50, 113, 0.9)",
          "&:hover": {
            backgroundColor: "rgba(143, 69, 150, 0.9)",
          },
          zIndex: 1000,
        }}
      >
        {isOpen ? <Close /> : <ChatBubble />}
      </Fab>

      {/* חלון הצ'אט */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 90,
              right: 20,
              width: 350,
              height: 500,
              zIndex: 999,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1e1e1e",
                border: "1px solid rgba(107, 50, 113, 0.3)",
                borderRadius: 2,
              }}
            >
              {/* כותרת הצ'אט */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(107, 50, 113, 0.9)",
                  color: "white",
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SmartToy />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  עוזר מיוזיק
                </Typography>
                <IconButton size="small" onClick={toggleChat} sx={{ color: "white" }}>
                  <Close />
                </IconButton>
              </Box>

              {/* אזור ההודעות */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "auto",
                  p: 1,
                  backgroundColor: "#2a2a2a",
                }}
              >
                <List sx={{ p: 0 }}>
                  {messages.length === 0 && (
                    <ListItem sx={{ flexDirection: "column", alignItems: "center", py: 4 }}>
                      <SmartToy sx={{ fontSize: 48, color: "rgba(107, 50, 113, 0.7)", mb: 2 }} />
                      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ color: "#ccc" }}>
                        שלום! אני כאן לעזור לך עם כל מה שקשור לאתר מיוזיק. איך אני יכול לעזור לך היום?
                      </Typography>
                    </ListItem>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem
                        sx={{
                          flexDirection: message.role === "user" ? "row-reverse" : "row",
                          alignItems: "flex-start",
                          gap: 1,
                          py: 1,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: message.role === "user" ? "rgba(107, 50, 113, 0.8)" : "rgba(74, 51, 77, 0.8)",
                            width: 32,
                            height: 32,
                          }}
                        >
                          {message.role === "user" ? <Person /> : <SmartToy />}
                        </Avatar>

                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            maxWidth: "80%",
                            backgroundColor:
                              message.role === "user" ? "rgba(107, 50, 113, 0.2)" : "rgba(74, 51, 77, 0.2)",
                            color: "white",
                            borderRadius: message.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {message.content}
                          </Typography>
                        </Paper>
                      </ListItem>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Avatar sx={{ bgcolor: "rgba(74, 51, 77, 0.8)", width: 32, height: 32 }}>
                        <SmartToy />
                      </Avatar>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          ml: 1,
                          backgroundColor: "rgba(74, 51, 77, 0.2)",
                          borderRadius: "16px 16px 16px 4px",
                        }}
                      >
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Typography variant="body2" color="white">
                            מקליד...
                          </Typography>
                        </motion.div>
                      </Paper>
                    </ListItem>
                  )}
                </List>
                <div ref={messagesEndRef} />
              </Box>

              <Divider sx={{ borderColor: "rgba(107, 50, 113, 0.3)" }} />

              {/* אזור הקלט */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 2,
                  display: "flex",
                  gap: 1,
                  backgroundColor: "#1e1e1e",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="כתוב הודעה..."
                  value={input}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(107, 50, 113, 0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(107, 50, 113, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(107, 50, 113, 0.9)",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#ccc",
                      opacity: 1,
                    },
                  }}
                />
                <IconButton
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  sx={{
                    color: "rgba(107, 50, 113, 0.9)",
                    "&:hover": {
                      backgroundColor: "rgba(107, 50, 113, 0.1)",
                    },
                    "&:disabled": {
                      color: "rgba(107, 50, 113, 0.3)",
                    },
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
