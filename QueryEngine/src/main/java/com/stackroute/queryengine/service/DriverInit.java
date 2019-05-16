package com.stackroute.queryengine.service;

import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;

public class DriverInit {
    Driver driver;
    public DriverInit()
    {

        driver = GraphDatabase.driver("bolt://13.233.180.226",
                AuthTokens.basic("neo4j", "123456"));
    }

    public Driver getDriver() {
        return driver;
    }
}
