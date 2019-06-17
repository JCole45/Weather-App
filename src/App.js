import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'
import { base, sign } from './base';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';

const API_KEY = "77800969e9bf81751f6dd07b47d51942"



class App extends React.Component {

  state = { 
    temperature: undefined,
    city: undefined,
    country:  undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  componentWillMount () {
    this.songsRef = base.syncState('temperature', {
      context: this,
      state: 'temperature'
    })
  }

  componentWillUnmount () {
    base.removeBinding(this.songsRef);
  }
  
  getWeather = async (e) => {
            e.preventDefault()  
            
            const city = e.target.elements.city.value
            const country = e.target.elements.country.value
            
            const api_call = await 
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
            
            const data = await api_call.json();
            
            if(city && country ) {
            console.log(data);

            this.setState({
              temperature: data.main.temp,
              city: data.name,
              country: data.sys.country,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              error: ""
            }) 
            } else {
              this.setState= ({
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Please enter the correct values or ensure City matches to Country Entered"
              })
              }
        }    

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;


  return (
    <div className="App">

{
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
                 
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
      
     {user ? <div> <Form getWeather={this.getWeather} />
      
      
      <Weather
     temperature={this.state.temperature}

     city={this.state.city}

     country={this.state.country}

     humidity={this.state.humidity}
 
     description={this.state.description}

     error={this.state.error} />
     </div> : <Titles/>}

    </div>
  );
  }
}

const firebaseAppAuth = sign;

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);