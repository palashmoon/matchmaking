package com.stackroute.tokenizer.service;

import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.*;

public class DocProcessorTest {

    @Test
    public void testNgramAnalysis() {
        String query = "I want a guy knowing Big Data from Indian Institute of Technology in Computer Science and Engineering who knows Java Script";
        Map<String,Double> res = DocProcessor.performNGramAnalysis(query);
        System.out.println(res.toString());
    }

}