package com.b304.bobs.api.request;

import lombok.Getter;

@Getter
public class CommunityCommentReq {
    private Long user_id;
    private Long community_id;
    private String community_comment_content;

    public CommunityCommentReq() {
    }


}
