package relas.java.web.websocket.dto;

import java.util.List;

public class AddChatMemberDTO {

    private Long chatId;
    private List<Long> addMembers;

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public List<Long> getAddMembers() {
        return addMembers;
    }

    public void setAddMembers(List<Long> addMembers) {
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
