import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList.js';
// import {robots} from './robots.js';
import Scroll from '../components/Scroll.js';
import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';


function App () {

   const [robots, setRobots] = useState([]);
   const [searchField, setSearchField] = useState('');
   const [count, setCount] = useState(0);

   useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => {
                setRobots(users);
                console.log(count);
        })
   }, [count]); //only run if count changes

   const onSearchChange = (event) => {
    // this.setState({ searchField: event.target.value})
    setSearchField(event.target.value);
    }

    // const {robots, searchField} = this.state;
    // console.log(robots)
    const filteredRobots = robots.filter((robot) => {
        console.log(robot)
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    });

    return !robots.length? (<h1>Loading...</h1>)
    :
    (
        <div className='tc'>
            <h1 className='f2'>RoboFriends</h1>
            <button onClick={() => setCount(count + 1)} >Click Me</button>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
                
            </Scroll>
        </div>
    )
}

export default App;