package com.b304.bobs.api.response;

import com.b304.bobs.db.entity.CommunityComment;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter @Setter
public class CommunityCommentRes {
    private Long user_id;
    private Long community_id;
    private Long community_comment_id;
    private String community_comment_content;
    private LocalDateTime community_comment_created;
    private boolean community_comment_deleted;

    public CommunityCommentRes(CommunityComment communityComment) {
        this.user_id = communityComment.getUser().getUser_id();
        this.community_comment_id = communityComment.getCommunity_comment_id();
        this.community_comment_content = communityComment.getCommunity_comment_content();
        this.community_comment_created = communityComment.getCommunity_comment_created();
        this.community_comment_deleted = communityComment.getCommunity_comment_deleted();
        this.community_id = communityComment.getCommunity().getCommunity_id();
    }

    public CommunityCommentRes() {

    }

}