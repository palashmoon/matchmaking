package com.stackroute.service;

import com.stackroute.domain.CommonOutput;
import com.stackroute.domain.Section;

/*It is an interface for the certificate service
for loosely coupling and changes for future*/
public interface CertificateService {
    public void processCertificateDetails(Section section);
}
