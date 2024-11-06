import { FC, useState } from 'react';
import { Box, Typography, IconButton, Stack, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { ControlsContainer, MessageBox, MessagesContainer, TextField } from './styles';
import { RenderMarkdownText } from '../rich-text';
import { useAuth } from '../../hooks/use-auth';
import { useChatBot } from '../../hooks/use-chat-bot';
import { useVoiceRecognition } from '../../hooks/use-voice-recognition';
import Menu from '../menu';

const ChatBot: FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const { messages, sendMessage, addMessage, response } = useChatBot();
    const { user } = useAuth();

    const handleTranscription = (transcript: string) => {
        sendMessage(transcript, getName(), getRole());
    }

    const handleError = (error: string) => {
        addMessage(error, 'bot');
    };

    const { isRecording, audioURL, startRecording, stopRecording, cancelRecording } = useVoiceRecognition(
        handleTranscription,
        handleError
    );

    const getName = () => {
        return user ? user.name : 'colega';
    };

    const getRole = () => {
        return user ? user.role : 'ROLE_CUSTOMER';
    };

    const handleSendClick = async () => {
        if (inputText.trim()) {
            setIsProcessing(true);
            try {
                await sendMessage(inputText, getName(), getRole());
                setInputText('');
            } catch (error) {
                console.error('Erro ao enviar mensagem para o bot:', error);
                addMessage('Erro ao enviar a mensagem.', 'bot');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleAudioMessage = async () => {
        if (audioURL) {
            setIsProcessing(true);
            try {
                await sendMessage(audioURL, getName(), getRole());
            } catch (error) {
                console.error('Erro ao transcrever ou enviar mensagem:', error);
                addMessage('Erro ao transcrever ou enviar áudio.', 'bot');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleStopRecording = () => {
        stopRecording();
        handleAudioMessage();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') handleSendClick();
    };

    const isValid = () => {
        if (response) return response.isValidResponse;
        return false;
    };

    const getColor = (user: "user" | "bot") => {
        if (user === "user") return '#d4edda';
        if (user === "bot" && isValid()) return '#e2e3e5';
        return "#ff0000 ";
    };

    return (
        <Stack>
            <Box
                className={'fullscreen-chat'}
                sx={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1300,
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    borderRadius: 0,
                    padding: 2,
                }}
            >
                <Menu/>
                <MessagesContainer sx={{ flexGrow: 1, marginTop: 7 }}>
                    {messages.map((message, index) => (
                        <MessageBox
                            key={index}
                            align={message.sender === 'user' ? 'right' : 'left'}
                            bgcolor={getColor(message.sender)}
                        >
                            {message.sender === 'bot' ? (
                                <RenderMarkdownText text={message.text} />
                            ) : (
                                <Typography variant="body1">
                                    <strong>{message.sender === 'user' ? 'Você' : 'Bot'}:</strong> {message.text}
                                </Typography>
                            )}
                        </MessageBox>
                    ))}
                </MessagesContainer>

                {audioURL && (
                    <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                        <audio controls src={audioURL}></audio>
                        <IconButton color="secondary" onClick={cancelRecording}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}

                <ControlsContainer sx={{ px: 2, py: 1 }}>
                    <TextField
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite ou use a voz..."
                        variant="filled"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    color={isRecording ? 'secondary' : 'primary'}
                                    onClick={isRecording ? handleStopRecording : startRecording}
                                    edge="end"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <CircularProgress size={24} /> : <MicIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSendClick}
                        sx={{ height: 40 }}
                        disabled={isProcessing}
                    >
                        {isProcessing ? <CircularProgress size={24} /> : <SendIcon fontSize="small" />}
                    </IconButton>
                </ControlsContainer>
            </Box>
        </Stack>
    );
};

export default ChatBot;
