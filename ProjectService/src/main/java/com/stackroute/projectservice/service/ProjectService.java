package com.stackroute.projectservice.service;

import com.stackroute.projectservice.domain.CommonOutput;
import com.stackroute.projectservice.domain.Section;

/*It is an interface for the Project service*/
public interface ProjectService {
    void processProjectDetails(Section section);
}
