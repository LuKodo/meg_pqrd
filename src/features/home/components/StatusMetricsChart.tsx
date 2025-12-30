import { Card, CardBody } from "@/features/shared/components/Card"
import { Col, Row } from "@/features/shared/components/Grid"

export const StatusMetricsChart = () => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col md={3} className="border-end">
                    </Col>
                    <Col md={3} className="border-end">
                    </Col>
                    <Col md={3} className="border-end">
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} className="border-end">
                        <div className="p-4 py-3 py-md-4">
                            <p className="fs-4 text-primary mb-0">
                                <span className="text-primary">
                                    <span className="round-8 text-bg-primary rounded-circle d-inline-block me-1" />
                                </span>
                                Followers
                            </p>
                            <h3 className=" mt-2 mb-0">1,500+</h3>
                        </div>
                    </Col>
                    <Col md={3} className="border-end">
                        <div className="p-4 py-3 py-md-4">
                            <p className="fs-4 text-info mb-0">
                                <span className="text-info">
                                    <span className="round-8 text-bg-info rounded-circle d-inline-block me-1" />
                                </span>
                                Campaign
                            </p>
                            <h3 className=" mt-2 mb-0">560</h3>
                        </div>
                    </Col>
                    <Col md={3} className="border-end">
                        <div className="p-4 py-3 py-md-4">
                            <p className="fs-4 text-info mb-0">
                                <span className="text-info">
                                    <span className="round-8 text-bg-info rounded-circle d-inline-block me-1" />
                                </span>
                                Campaign
                            </p>
                            <h3 className=" mt-2 mb-0">560</h3>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="p-4 py-3 py-md-4">
                            <p className="fs-4 text-info mb-0">
                                <span className="text-info">
                                    <span className="round-8 text-bg-info rounded-circle d-inline-block me-1" />
                                </span>
                                Campaign
                            </p>
                            <h3 className=" mt-2 mb-0">560</h3>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    )
}