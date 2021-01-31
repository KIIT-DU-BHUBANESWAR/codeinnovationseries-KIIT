package com.example.kiit.health.yoga;

import java.util.ArrayList;
import java.util.Collections;

public class Quotations {

    ArrayList<String> quotations;

    public Quotations(){
        quotations = new ArrayList<String>();
        quotations.add("The very heart of yoga practice is abhyasa - steady effort in the direction you want to go -" + System.getProperty("line.separator") + "Sally Kempton.");
        quotations.add("The soul is here for its own joy -" + System.getProperty("line.separator") + System.getProperty("line.separator") + "Rumi.");
        quotations.add("Yoga is the stilling of the fluctuations of the mind -" + System.getProperty("line.separator") + System.getProperty("line.separator") +" Yoga Sutra 12.");
        quotations.add("Yoga is the perfect opportunity to be curious about who you are -" + System.getProperty("line.separator") +  System.getProperty("line.separator") +" Jason Crandell.");
        quotations.add("The attitude of gratitude is the highest yoga - " + System.getProperty("line.separator") +  System.getProperty("line.separator") +"Yogi Bhakan.");
        quotations.add("Yoga teaches us to cure what need not be endured and to endure what cannot be cured -" + System.getProperty("line.separator") + System.getProperty("line.separator") + " BKS Iyengar.");
        quotations.add("The quality of our breath expresses our inner feelings -" + System.getProperty("line.separator") + System.getProperty("line.separator") + " - TKV Desikachar.");
    }


    public String randomQuotation(){
        Collections.shuffle(quotations);
        return quotations.get(0);
    }
}
