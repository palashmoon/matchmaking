package com.stackroute.locationservice.service;

import com.stackroute.locationservice.domain.CommonOutput;
import com.stackroute.locationservice.domain.Section;

/*It is an interface for the location service*/
public interface LocationService {
    public void processLocationDetails(Section section);
}
