package relas.java.web.websocket.dto;

import java.util.List;

public class AddChatMemberDTO {

    private Long chatId;
    private List<String> addMembers;

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public List<String> getAddMembers() {
        return addMembers;
    }

    public void setAddMembers(List<String> addMembers) {
        this.addMembers = addMembers;
    }

    @Override
    public String toString() {
        return "AddChatMemberDTO{" +
            "chatId=" + chatId +
            ", addMembers=" + addMembers +
            '}';
    }
}
