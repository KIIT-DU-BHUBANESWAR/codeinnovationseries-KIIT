package com.example.kiit.health.hydration.Model;





public class TimeLog {
    long ID;
    private String time;
    private int amount;
    private String date;
    private String containerTyp;

    public String getContainerTyp() {
        return containerTyp;
    }

    public void setContainerTyp(String containerTyp) {
        this.containerTyp = containerTyp;
    }

    public String getDate() {return date;}

    public void setDate(String date) {
        this.date = date;
    }

    public int getAmount() {return amount;}

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public long getID() {
        return ID;
    }


}

