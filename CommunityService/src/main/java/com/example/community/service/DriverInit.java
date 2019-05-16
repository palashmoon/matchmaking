package com.example.community.service;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;

public class DriverInit {
    Driver driver;
    public DriverInit(String uri)
    {
        driver = GraphDatabase.driver(uri);
    }

    public Driver getDriver() {
        return driver;
    }
}
