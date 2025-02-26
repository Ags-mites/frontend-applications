// src/app/components/HelpChat.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export const HelpChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false); // Estado para la animación de "escribiendo"
    const navigate = useNavigate();

    const handleSend = () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true); // Activa la animación de "escribiendo"

        // Simula el retraso de 3 segundos antes de responder
        setTimeout(() => {
            let botResponse;

            switch (message.toLowerCase().trim()) {
                case "hola":
                    botResponse = { sender: "bot", text: "Hola, ¿en qué te puedo ayudar?" };
                    break;
                case "quiero generar una nueva factura":
                    botResponse = {
                        sender: "bot",
                        text: "Andá a la pantalla de facturación, seleccioná el botón 'Crear Factura' y llená los datos.",
                    };
                    break;
                case "adiós":
                    botResponse = {
                        sender: "bot",
                        text: "Espero haber sido de ayuda, ¡adiós y cuidate!",
                    };
                    break;
                default:
                    botResponse = {
                        sender: "bot",
                        text: "No entendí, ¿en qué te puedo ayudar?",
                    };
            }

            setChatHistory((prev) => [...prev, botResponse]);
            setIsTyping(false); // Desactiva la animación
        }, 3000); // Retraso de 3 segundos
    };

    // Efecto para mantener el scroll al final del chat
    useEffect(() => {
        const chatBody = document.getElementById("chat-body");
        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, [chatHistory, isTyping]);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 1300,
            }}
        >
            {!isOpen ? (
                <IconButton
                    onClick={() => setIsOpen(true)}
                    sx={{
                        backgroundColor: "primary.main", // #011C26
                        "&:hover": { backgroundColor: "primary.dark" },
                    }}
                >
                    <ChatIcon sx={{ color: "white" }} />
                </IconButton>
            ) : (
                <Box
                    sx={{
                        width: 300,
                        height: 400,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "primary.main", // #011C26
                            color: "white",
                            p: 1,
                            borderRadius: "2px 2px 0 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6">Chat de Ayuda</Typography>
                        <IconButton onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        id="chat-body"
                        sx={{
                            flexGrow: 1,
                            overflowY: "auto",
                            p: 2,
                            backgroundColor: "#f5f5f5", // Fondo gris claro para el área de mensajes
                        }}
                    >
                        {chatHistory.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        maxWidth: "70%",
                                        p: 1,
                                        borderRadius: 2,
                                        backgroundColor:
                                            msg.sender === "user"
                                                ? "secondary.main" // #225C73 para el usuario
                                                : "primary.light", // Un tono más claro basado en #011C26 para el bot
                                        color: msg.sender === "user" ? "white" : "text.primary",
                                        boxShadow: 1,
                                    }}
                                >
                                    {msg.text}
                                </Typography>
                            </Box>
                        ))}
                        {isTyping && (
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <CircularProgress size={16} sx={{ mr: 1, color: "primary.light" }} />
                                <Typography sx={{ color: "text.secondary" }}>Escribiendo...</Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribí aquí..."
                            size="small"
                            fullWidth
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button variant="contained" onClick={handleSend}>
                            Enviar
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};