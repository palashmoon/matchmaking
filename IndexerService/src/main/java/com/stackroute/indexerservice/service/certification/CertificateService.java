package com.stackroute.indexerservice.service.certification;

import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface CertificateService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
