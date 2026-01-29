package com.cloudtask.userservice.dto;

import com.cloudtask.userservice.entity.ProjectMember;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberResponse {
    private Long id;
    private Long userId;
    private String userEmail;
    private String displayName;
    private String role;
    private LocalDateTime joinedAt;

    public static MemberResponse fromEntity(ProjectMember member) {
        MemberResponse response = new MemberResponse();
        response.setId(member.getId());
        response.setUserId(member.getUser().getId());
        response.setUserEmail(member.getUser().getEmail());
        response.setDisplayName(member.getUser().getDisplayName());
        response.setRole(member.getRole().name());
        response.setJoinedAt(member.getJoinedAt());
        return response;
    }
}