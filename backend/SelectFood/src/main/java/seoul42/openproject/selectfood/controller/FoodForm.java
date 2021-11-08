package seoul42.openproject.selectfood.controller;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FoodForm {

    private Long id;
    private String name;
    private String tag;
    private String ingredient;
    private String youtubeUrl;

}
