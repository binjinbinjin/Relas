package relas.java.web.websocket.dto;

import relas.java.service.dto.ChatRoomDTO;
import relas.java.service.dto.ChatRoomMemberDTO;

import java.util.List;
import java.util.Objects;

public class NewRoomAndMemberDTO {
    private AddChatMemberDTO newMembers;
    private ChatRoomDTO room;
    private List<ChatRoomMemberDTO> roomMembers;

    public AddChatMemberDTO getNewMembers() {
        return newMembers;
    }

    public void setNewMembers(AddChatMemberDTO newMembers) {
        this.newMembers = newMembers;
    }

    public ChatRoomDTO getRoom() {
        return room;
    }

    public void setRoom(ChatRoomDTO room) {
        this.room = room;
    }

    public List<ChatRoomMemberDTO> getRoomMembers() {
        return roomMembers;
    }

    public void setRoomMembers(List<ChatRoomMemberDTO> roomMembers) {
        this.roomMembers = roomMembers;
    }

    @Override
    public String toString() {
        return "NewRoomAndMemberDTO{" +
            "newMembers=" + newMembers +
            ", room=" + room +
            ", roomMembers=" + roomMembers +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewRoomAndMemberDTO)) return false;
        NewRoomAndMemberDTO that = (NewRoomAndMemberDTO) o;
        return Objects.equals(newMembers, that.newMembers) &&
            Objects.equals(room, that.room) &&
            Objects.equals(roomMembers, that.roomMembers);
    }

    @Override
    public int hashCode() {

        return Objects.hash(newMembers, room, roomMembers);
    }
}
