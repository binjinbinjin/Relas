package relas.java.web.rest.dto;

import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.dto.ChatRoomMemberDTO;

import java.util.List;
import java.util.Objects;

public class MemberOfChatRoomDTO {

    private ChatRoomDTO chatRoom;
    private List<ChatRoomMemberDTO> members;

    public ChatRoomDTO getChatRoom() {
        return chatRoom;
    }

    public void setChatRoom(ChatRoomDTO chatRoom) {
        this.chatRoom = chatRoom;
    }

    public List<ChatRoomMemberDTO> getMembers() {
        return members;
    }

    public void setMembers(List<ChatRoomMemberDTO> members) {
        this.members = members;
    }

    @Override
    public String toString() {
        return "MemberOfChatRoomDTO{" +
            "chatRoom=" + chatRoom +
            ", members=" + members +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MemberOfChatRoomDTO)) return false;
        MemberOfChatRoomDTO that = (MemberOfChatRoomDTO) o;
        return Objects.equals(chatRoom, that.chatRoom) &&
            Objects.equals(members, that.members);
    }

    @Override
    public int hashCode() {

        return Objects.hash(chatRoom, members);
    }
}
