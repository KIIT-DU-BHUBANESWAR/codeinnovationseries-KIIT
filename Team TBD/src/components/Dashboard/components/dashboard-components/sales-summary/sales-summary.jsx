import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

//Line chart
let lineData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  datasets: [
    {
      label: 'Income',
      borderWidth: 1,
      backgroundColor: 'rgba(94,114,228,.1)',
      borderColor: 'rgb(94,114,228)',
      pointBorderColor: 'rgb(94,114,228)',
      pointBackgroundColor: 'rgb(94,114,228)',
      data: [0, 15, 6, 11, 25, 9, 18, 24],
    },
  ],
};

const SalesSummary = () => {
  return (
    <Card style={{ height: '60vh' }}>
      <div className='overlay-graph'></div>
      <CardBody>
        <div className='d-flex align-items-center'>
          <div>
            <CardTitle>Performance Summary</CardTitle>
            <CardSubtitle>summary of the month</CardSubtitle>
          </div>
        </div>
        <Row>
          <Col lg='12'>
            <div className='campaign ct-charts'>
              <div
                className='chart-wrapper'
                style={{ width: '100%', margin: '0 auto', height: 250 }}
              >
                <Line
                  data={lineData}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: false,
                      labels: { fontFamily: 'Nunito Sans' },
                    },
                    scales: {
                      yAxes: [
                        {
                          stacked: true,
                          gridLines: { display: false },
                          ticks: { fontFamily: 'Nunito Sans' },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: { display: false },
                          ticks: { fontFamily: 'Nunito Sans' },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SalesSummary;
