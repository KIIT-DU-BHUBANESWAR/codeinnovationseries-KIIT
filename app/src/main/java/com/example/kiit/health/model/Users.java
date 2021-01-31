package com.example.kiit.health.model;

public class Users {
    private String name,phone,password,image,weight,height,age,email,bmi;
    public Users()
    {

    }

    public Users(String name, String phone, String password, String image,String bmi, String weight, String age, String height, String email) {
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.image = image;
        this.age=age;
        this.email=email;
        this.height=height;
        this.weight = weight;
        this.bmi=bmi;
    }

    public String getBmi() {
        return bmi;
    }

    public void setBmi(String bmi) {
        this.bmi = bmi;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
