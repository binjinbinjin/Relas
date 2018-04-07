package relas.java.web.websocket.dto;

public class NewChtRoomDTO {
    private long chatId;

    public long getChatId() {
        return chatId;
    }

    public void setChatId(long chatId) {
        this.chatId = chatId;
    }

    @Override
    public String toString() {
        return "NewChtRoomDTO{" +
            "chatId=" + chatId +
            '}';
    }
}
