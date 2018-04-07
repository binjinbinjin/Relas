package relas.java.web.websocket.dto;

public class NewChtRoom {
    private long chatId;

    public long getChatId() {
        return chatId;
    }

    public void setChatId(long chatId) {
        this.chatId = chatId;
    }

    @Override
    public String toString() {
        return "NewChtRoom{" +
            "chatId=" + chatId +
            '}';
    }
}
