const API_KEY = "6972499059cc79a2ee53c65801a058eb"

class App extends React.Component {
  state = {
    temp:"",
    humidity:"",
    image:"",
    error:"",
    wind:"",
    description:""
  }
handleClick = async(e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`);
  const rtr = await api.json();
  if(city && country)
    {
      this.setState({
        temp:rtr.main.temp,
        humidity:rtr.main.humidity,
        image:rtr.weather[0].icon,
        location:rtr.name,
        wind:rtr.wind.speed,
        description:rtr.weather[0].description
      });
    }
  else {
    this.setState({
      temp:"",
      humidity:"",
      image:"",
      wind:"",
      description:"",
      error:"Please complete both fields"
    });
  }
}

  render() {
    
    return (
      <div className="container">
        <center>
          <div className="card" id="card1">
            <h1>Current Weather Forcast</h1>
            <form onSubmit={this.handleClick}>
              <input type="text" placeholder="Enter City" name="city" className="form-control"/><br></br>
              <input type="text" placeholder="Enter Country" name="country" className="form-control"/><br></br>
              <button className="btn btn-info">Get Weather</button>
            </form><br></br>
            {this.state.image!=''?<img src={`http://openweathermap.org/img/w/${this.state.image}.png`} width="100px" height="100px"/>:''}
            {this.state.location!=''?<h1>{this.state.location}</h1>:''}
            {this.state.temp!=''?<h2>Temp: {this.state.temp}&#8457;</h2>:''}
            {this.state.humidity!=''?<h2>Humidity: {this.state.humidity}%</h2>:''}
            {this.state.wind!=''?<h2>Wind Speed: {this.state.wind} mph</h2>:''}
            {this.state.description!=''?<h2>{this.state.description}</h2>:''}
            {this.state.error!=''?<h3>SORRY! {this.state.error}</h3>:''}
          </div>
        </center>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
