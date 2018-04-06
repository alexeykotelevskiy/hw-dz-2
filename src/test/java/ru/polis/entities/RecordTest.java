package ru.polis.entities;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.sun.org.apache.regexp.internal.RE;

import static org.junit.Assert.*;

public class RecordTest {
    static String[] validEmails = {"aa@aa.ru", "bbb@bcd.ru", "123_s@yandex.com", "check_check_22@mail.ru"};
    static String[] invalidEmails = {"asdasdasd", "123123@", "@qweqwe.ru", "asdasdas@asdasd@adasd.ru"};
    static String[] validNames = {"ALex alex", "alex-alex", "Алексей Коелевский", "раз два"};
    static String[] invalidNames = {"asdas2123", "123213", "#asad", "$$213weqwe"};

    List<Record> getValidEmailsRecords(){
        List<Record> list = new ArrayList<>();
        for (int i=0;i<validEmails.length;i++) {
            Record r = new Record();
            r.setName(validNames[0]);
            r.setEmail(validEmails[i]);
            list.add( r);
        }

        return list;
    }

    public List<Record> getInvalidEmailsRecords(){
        List<Record> list = new ArrayList<>();
        for (int i=0;i<invalidEmails.length;i++) {
            Record r = new Record();
            r.setName(validNames[0]);
            r.setEmail(invalidEmails[i]);
            list.add( r);
        }

        return list;
    }

    List<Record> getValidNamesRecords(){
        List<Record> list = new ArrayList<>();
        for (int i=0;i<validNames.length;i++) {
            Record r = new Record();
            r.setName(validNames[i]);
            r.setEmail(validEmails[0]);
            list.add( r);
        }

        return list;
    }


    List<Record> getInvalidNamesRecords(){
        List<Record> list = new ArrayList<>();
        for (int i=0;i<validNames.length;i++) {
            Record r = new Record();
            r.setName(invalidNames[i]);
            r.setEmail(invalidEmails[0]);
            list.add( r);
        }

        return list;
    }

    @Test
    public void checkValidate1() throws Exception {
        List<Record> list = getValidEmailsRecords();
        for (int i=0;i<list.size();i++) {
            assertTrue(list.get(i).checkValidate());
        }
    }

    @Test
    public void checkValidate2(){

        List<Record> list = getInvalidEmailsRecords();
        for (int i=0;i<list.size();i++) {
            assertFalse(list.get(i).checkValidate());
        }
    }


    @Test
    public void checkValidate3(){

        List<Record> list = getValidNamesRecords();
        for (int i=0;i<list.size();i++) {
            assertTrue(list.get(i).checkValidate());
        }
    }


    @Test
    public void checkValidate4(){

        List<Record> list = getInvalidNamesRecords();
        for (int i=0;i<list.size();i++) {
            assertFalse(list.get(i).checkValidate());
        }
    }
}