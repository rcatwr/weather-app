import React, { Component } from "react";
import "./sass/mystyles.scss";
import WeatherCard from "./WeatherCard";
import weather from "./weather-data";
import iconMap from "./iconMap"

 class App extends Component {
    constructor(){
      super()
      this.state = {
        forecast : [],
        city : " ",
        iconId: [],
        date:[]
      }
    }

  componentDidMount(){

     fetch('https://worldweather.wmo.int/en/json/620_en.json')
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.setState({
                forecast: data.city.forecast.forecastDay,
                city: data.city.cityName

              })

              const dateMap = {"-01-":"Jan",
                               "-02-":"Feb",
                               "-03-":"Mar",
                               "-04-":"Apr",
                               "-05-":"May",
                               "-06-":"Jun",
                               "-07-":"Jul",
                               "-08-":"Aug",
                               "-09-":"Sep",
                               "-10-":"Oct",
                               "-11-":"Nov",
                               "-12-":"Dec"};
             // set up arrays
             const yearArray = [];
             const monthArray = [];
             const dayArray = [];
             let fullDate = [];
             console.log(data.city.forecast)
            // chop the year and save it
             data.city.forecast.forecastDay.map((date)=> yearArray.push(date.forecastDate.slice(0,4)))
             console.log(yearArray);
             //chop the month and map it
             data.city.forecast.forecastDay.map((date)=> monthArray.push(dateMap[date.forecastDate.slice(4,8)]))
             console.log(monthArray);
             // chop day out and remove 0 values
             data.city.forecast.forecastDay.map((date)=> dayArray.push( date.forecastDate.slice(7,10).startsWith("-0") ? date.forecastDate.slice(7,10).replace("-0",'') : date.forecastDate.slice(7,10).replace("-",'') ))
             console.log(dayArray)
             monthArray.map((mon, i) => fullDate.push(`${mon} ${dayArray[i]}, ${yearArray[i]}`))
             console.log(fullDate)

             this.setState({date:fullDate})


              //end fetch
            })




  }


  render(){

  let iconArray = [];
  this.state.forecast.map((w,i) => iconArray.push(iconMap[w.weatherIcon].icon))

    const week = new Array()

  const dates=(current)=> {
    const weekDays = ["S","M","T","W","Th","F","S"];
    for (let i = 0; i < 7; i++){
      week.push(weekDays[new Date(current).getDay()]);
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  dates(new Date())








  const weatherComponents = this.state.forecast.slice(0,6).map((w,i) => <WeatherCard weather={this.state.forecast[i].weather} day={week[i]} key={i} date={this.state.date[i]} icon = {iconArray[i]} tempHi = {w.maxTemp} tempLo = {w.minTemp} />)

  return(
    <div className="container is-fluid">
     <section className="hero">
      <div className="hero-body">
        <h1 className="title">Weather for: {this.state.city}<br /><br /></h1>
      </div>
     </section>
      <div className="tile is-ancestor">
          {weatherComponents}
      </div>
    </div>
    )
  }
}
export default App;
