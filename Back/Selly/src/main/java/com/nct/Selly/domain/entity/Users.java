package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private Integer wallet;

    private String image;

    private String banner;

    private String introduction;

    private String nickname;

    private Date createRegist;

    private Date updateRegist;

    @Builder
    public Users(Long userId, Integer wallet, String image, String banner, String introduction, String nickname, Date createRegist, Date updateRegist) {
        this.userId = userId;
        this.wallet = wallet;
        this.image = image;
        this.banner = banner;
        this.introduction = introduction;
        this.nickname = nickname;
        this.createRegist = createRegist;
        this.updateRegist = updateRegist;
    }
}
