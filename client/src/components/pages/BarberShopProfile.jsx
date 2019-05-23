import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class BarberShopProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barbershop: null,
      date: new Date(),
      availableTimes: [],
    }
  }
  convertToReadbleHour(hourAndMinutes) {
    let h = Math.floor(hourAndMinutes/60)
    let m = "00"
    return h + ":" + m
  }
  render() {
    return (
      <div className="BarberShopProfile">
        <MainNavBar canGoBack>BarberShop</MainNavBar>
          {this.state.barbershop && 
          <div>
            <img src={this.state.barbershop.logo} alt="" height="150px;"/>
            <div>
              <h1>{this.state.barbershop.name}</h1>
              <p>Address: {this.state.barbershop.address.streetAddress}</p>
              <ul>
                <li><strong>Monday:</strong> {this.state.barbershop.workingHours.workingHourMonBegin} - {this.state.barbershop.workingHours.workingHourMonEnd}</li>
                <li><strong>Tuesday:</strong> {this.state.barbershop.workingHours.workingHourTueBegin} - {this.state.barbershop.workingHours.workingHourTueEnd}</li>
                <li><strong>Wednesday:</strong> {this.state.barbershop.workingHours.workingHourWedBegin} - {this.state.barbershop.workingHours.workingHourWedEnd}</li>
                <li><strong>Thursday:</strong> {this.state.barbershop.workingHours.workingHourThuBegin} - {this.state.barbershop.workingHours.workingHourThuEnd}</li>
                <li><strong>Friday:</strong> {this.state.barbershop.workingHours.workingHourFriBegin} - {this.state.barbershop.workingHours.workingHourFriEnd}</li>
                <li><strong>Saturday:</strong> {this.state.barbershop.workingHours.workingHourSatBegin} - {this.state.barbershop.workingHours.workingHourSatEnd}</li>
                <li><strong>Sunday:</strong> {this.state.barbershop.workingHours.workingHourSunBegin} - {this.state.barbershop.workingHours.workingHourSunEnd}</li>
              </ul>
              <button>Book Appointment</button>
            </div>

            <div>
              <h2>Book an appointment</h2>
              {this.state.date.toLocaleDateString()}

              <ul>
                {this.state.availableTimes.map(time => <li key={time.hourAndMinutes}>
                  {this.convertToReadbleHour(time.hourAndMinutes)}-
                    {time.status}-
                    {time.status === "Available" && <button>Book</button>}
                </li>)}
              </ul>
            </div>
          </div>}
        <MainFooter />
      </div>
    );
  }
  
  componentDidMount() {
    Promise.all([
      api.getBarberShop(this.props.match.params.barberShopId),
      api.getAvailableTimes(this.props.match.params.barberShopId, this.state.date)
    ])
    .then(([barbershop, availableTimes]) => {
      console.log("TCL: BarberShopProfile -> componentDidMount -> availableTimes", availableTimes)
      
      this.setState({
        barbershop: barbershop,
        availableTimes: availableTimes
      })
      console.log("TCL: BarberShopProfile", this.state.barbershop.address.streetAddress)
    })
    .catch(err => console.log(err))
  }
}