package com.bookmyvenue.enums;

public enum UploadFolder {
    FOOD_ITEMS("food_item"),
    PROFILE_IMAGES("profile-images"),
    VENUES("venues"),
    REVIEWS("reviews");



    private final String folderName;

    UploadFolder(String folderName) {
        this.folderName = folderName;
    }

    public String getFolderName() {
        return folderName;
    }
}