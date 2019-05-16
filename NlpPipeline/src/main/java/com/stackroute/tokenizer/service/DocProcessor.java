package com.stackroute.tokenizer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

/**
 * This Utility class contains methods to process a document
 */
public class DocProcessor {

    private DocProcessor() {}
    private  static DocProcessor docProcessor;
    public static DocProcessor getInstance(){
        if (docProcessor==null){
            docProcessor =new DocProcessor();
        }
        return docProcessor;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(DocProcessor.class);

    /**
     * This function sorts a Map according to its value field in descending order.
     * @param map: the input Map
     * @return: HashMap object which has same data as the input but with order is changed now with its value field in decreasing order.
     */
    public static Map sortByValues(Map map) {

        List list = new LinkedList(map.entrySet());
        Collections.sort(list,(o1,o2) ->
                ((Comparable) ((Map.Entry) (o2)).getValue()).compareTo(((Map.Entry) (o1)).getValue())
        );

        HashMap sortedHashMap = new LinkedHashMap();
        for (Iterator it = list.iterator(); it.hasNext();) {
            Map.Entry entry = (Map.Entry) it.next();
            sortedHashMap.put(entry.getKey(), entry.getValue());
        }
        return sortedHashMap;
    }

    /**
     * This function performs N-Gram analysis on a String.We begin with setting how many N-grams we want to deal with.
     * For example,if a combination of 5 words makes sense while individual words don't,then we might wan't to set N-grams to 5.
     * If N=3,then we will be able to make sense of "United States Of America" if  we encounter this in a text as these
     * individual words don't make much sense.
     * @param paragraph: inout String paragraph
     * @return: Map of {key,value} pairs where key is the keyword and value is the score of the keyword.
     */
    public static Map<String,Double> performNGramAnalysis(String paragraph)  {

        List<Integer> ns = Arrays.asList(1,2,3,4);

        TfIdf.Normalization normalization = TfIdf.Normalization.COSINE;
        boolean smooth = true;
        boolean noAddOne = false;

        List<String> text = Arrays.asList(paragraph.trim().split("\\.|\\n"));

        Iterable<Collection<String>> documents = NGram.ngramDocumentTerms(ns, text);

        Iterable<Map<String, Double>> tfs = TfIdf.tfs(documents);
        Map<String, Double> idf = TfIdf.idfFromTfs(tfs, smooth, !noAddOne);
        LOGGER.info("TF-IDF scores: ");
        Map<String,Double> res = new HashMap<>();
        for (Map<String, Double> tf : tfs) {
            Map<String, Double> tfIdf = TfIdf.tfIdf(tf, idf, normalization);
            Map<String,Double> tmp = sortByValues(tfIdf);
            int i=0;
            for(Map.Entry<String,Double> entry : tmp.entrySet()) {
                if(i<Math.min(100,tmp.size())) {
                    res.put(entry.getKey(),entry.getValue());
                    i++;
                }
            }
        }
        return res;
    }
}
