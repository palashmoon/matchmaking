package com.stackroute.interestservice.service;

import com.stackroute.interestservice.domain.CommonOutput;
import com.stackroute.interestservice.domain.Section;

/*It is an interface for the certificate service*/

public interface InterestService {
    void processInterestDetails(Section section);
}