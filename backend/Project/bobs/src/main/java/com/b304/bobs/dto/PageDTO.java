package com.b304.bobs.dto;

import lombok.Getter;

@Getter
public class PageDTO {
    private Long user_id;
    private Long community_id;
    private int page;
    private int size;

    public int getPage() {
        return page-1;
    }

    public int pageSizeForCommunity(){
        return 20;
    }

}
