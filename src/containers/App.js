import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList.js';
import Scroll from '../components/Scroll.js';
import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField } from '../actions'
import { requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
};

const mapDispatchToProps = (dispatch) => {
   return {
       onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
       onRequestRobots: () => dispatch(requestRobots())
    }
}




function App (props) {

//    const [robots, setRobots] = useState([]);
//    const [count, setCount] = useState(0);

   const { searchField, onSearchChange, robots, isPending } = props;


   useEffect(() => {  
    // fetch('https://jsonplaceholder.typicode.com/users')
    //         .then((response) => response.json())
    //         .then((users) => {
    //             setRobots(users);
    //             // console.log(count);
    //     })
    props.onRequestRobots();
   }, []); //if 'count' is added, useEffect will only run if count changes 
    
    const filteredRobots = robots.filter((robot) => {
        // console.log(robot)
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    });

    return isPending? (<h1>Loading...</h1>)
    :
    (
        <div className='tc'>
            <h1 className='f2'>RoboFriends</h1>
            {/*<button onClick={() => setCount(count + 1)} >Click Me</button> */}
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
                
            </Scroll>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);