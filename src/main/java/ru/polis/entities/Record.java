package ru.polis.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.validator.routines.EmailValidator;


@Entity
public class Record implements Serializable, Comparable<Record>{
    @Id
    @GeneratedValue
    private int  id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String title;

    @Column
    String comment;

    @Column(name = "startTime", columnDefinition="DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    private static boolean checkWithRegExp(String string){
        Pattern p = Pattern.compile("^[a-zа-я \\-]+$", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CHARACTER_CLASS);
        Matcher m = p.matcher(string);
        return m.matches();
    }


    public boolean checkValidate(){
        boolean emailValid = EmailValidator.getInstance().isValid(getEmail());
        boolean nameValid = checkWithRegExp(getName());
        return getEmail().length() > 0 && getName().length() > 0 && emailValid && nameValid;
    }



    @Override
    public int compareTo(Record o) {
        return Integer.compare(id, o.getId());
    }
}
