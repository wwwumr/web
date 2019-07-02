import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout } from 'antd';
import { Bar as BarChart } from 'react-chartjs';
import Navigation from '../layout/header';
import Tagger from '../layout/footer';
  
const { Content } = Layout;

class Analize extends Component{
    static propTypes = {};
    constructor(props){
        super(props);
        this.state={
            userName:this.props.match.params.userName||"user"
        }
    }
    render(){
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'My First dataset',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
              data: [65, 59, 80, 81, 56, 55, 40],
            }],
          };
          const options = {
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
              }],
            },
        };
        return (
            <Layout>
            <Navigation userName={this.state.userName}></Navigation>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                统计信息
                <BarChart data={data} options={options} width="600" height="250" />
                {/*<BarChart data={data} options={options} width="600" height="250" />*/}
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
        );
    }
}

export default Analize;

