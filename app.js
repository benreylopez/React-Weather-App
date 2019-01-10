const API_KEY = "6972499059cc79a2ee53c65801a058eb"

class App extends React.Component {
  state = {
    temp:"",
    humidity:"",
    image:"",
    error:"",
    wind:""
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
        wind:rtr.wind.speed
      });
    }
  else {
    this.setState({
      temp:"",
      humidity:"",
      image:"",
      wind:"",
      error:"Wrong Input"
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
              <input type="text" placeholder="enter city" name="city" className="form-control"/><br></br>
              <input type="text" placeholder="enter country" name="country" className="form-control"/><br></br>
              <button className="btn btn-info">Get Weather</button>
            </form>
            {this.state.image!=''?<img src={`http://openweathermap.org/img/w/${this.state.image}.png`} width="100px" height="100px"/>:''}
            {this.state.location!=''?<h1>{this.state.location}</h1>:''}
            {this.state.temp!=''?<h1>Temp: {this.state.temp}&#8457;</h1>:''}
            {this.state.humidity!=''?<h1>Humidity: {this.state.humidity}%</h1>:''}
            {this.state.wind!=''?<h1>Wind Speed: {this.state.wind} mph</h1>:''}
            {this.state.error!=''?<h1>Error: {this.state.error}</h1>:''}
          </div>
        </center>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));