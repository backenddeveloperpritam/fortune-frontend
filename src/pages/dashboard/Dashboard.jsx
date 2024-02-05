import React, { useEffect, useState } from "react";
import "../dashboard/dashboard.css";
import { useStyles } from "../dashboard/dashboardStyles";
import Chart from "react-apexcharts";
import { Grid, TextField } from "@mui/material";
import { connect } from "react-redux";
import * as DashboardActions from '../../redux/Actions/dashboardActions'
import Loader from "../../Components/loading/Loader";

const Dashboard = ({ dashboardData , dispatch}) => {
  console.log(dashboardData)
  var classes = useStyles();

  useEffect(()=>{
    dispatch(DashboardActions.getDashboard())
  }, [])

  const [chartData, setChartData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <div className={classes.dashboard_container}>
      <Loader />
      <div className={classes.dashboard_inner_container}>
        <Grid container spacing={2}>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut">
                <img
                  src={require("../../assets/images/zodiac.png")}
                  alt="zodiac"
                  style={{ height: "8rem", width: "8rem" }}
                />
                <h1 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.total_astrologers}</h1>
                <h4>All Astrologers</h4>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut">
                <img
                  src={require("../../assets/images/team.png")}
                  alt="users"
                  style={{ height: "8rem", width: "8rem" }}
                />
                <h1 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.total_customers}</h1>
                <h4>All Users</h4>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ paddingTop: "20px" }}>
                <img
                  src={require("../../assets/images/phone-call.png")}
                  alt="users"
                  style={{ height: "6rem", width: "6rem" }}
                />
                <h1 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.total_call}</h1>
                <h4>No. Of Calls</h4>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ paddingTop: "20px" }}>
                <img
                  src={require("../../assets/images/comment.png")}
                  alt="users"
                  style={{ height: "6rem", width: "6rem" }}
                />
                <h1 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.total_chat}</h1>
                <h4>No. Of Chats</h4>
              </div>
            </div>
          </Grid>
          {/* <Grid item lg={6} sm={12} md={12} xs={12}>
            <div className={classes.graph_card}>
              <div className="donut">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="donut"
                  width="330"
                />
              </div>
            </div>
          </Grid> */}
          {/* <Grid item lg={6} sm={12} md={12} xs={12}>
            <div className={classes.graph_card}>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={data.options}
                      series={data.series}
                      type="bar"
                      width="330"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
