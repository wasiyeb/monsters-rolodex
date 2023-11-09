import { useState, useEffect } from 'react'

import CardList from './components/card-list/CardList'
import SearchBox from './components/search-box/SearchBox'
import './App.css'

const App = () => {
    const [searchField, setSearchField] = useState('') //[value, setValue]
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters)

    //the only time the following fetch func need to run is on mount. []no dependnce
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => setMonsters(users)); 
    }, [])    
    
    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchField.toLowerCase())
        })

        setFilteredMonsters(newFilteredMonsters)
    },[monsters, searchField])

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);    
    };

    return (
        <div className='App'>
            <h1 className='app-title'>Monsters Rolodex</h1>
            
            <SearchBox 
                className='search-box'
                onChangeHandler={onSearchChange}
                placeholder='search monsters' 
            />
            <CardList monsters={filteredMonsters}/>
        </div>
    )
}

// class App extends Component {
//     constructor() {
//         super()

//         this.state = {
//             monsters: [],
//             searchField: ''
//         }
//         // console.log('constructor')
//     }
   
//     componentDidMount() {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then(users => {this.setState({monsters: users})});        
//         // console.log('componentDidMount')
//     }

//     //the onSearchChange func is part of the component and placing it outside the render method enhances performance
    

//     render() {
//         // console.log('render')
//         const {monsters, searchField} = this.state;

//         const filteredMonsters = monsters.filter(monster => {
//             return monster.name.toLowerCase().includes(searchField.toLowerCase());
//         })
//         return !monsters.length ? //monsters.length === 0
//         <h1>Loading</h1> :    
//         (
//             <div className='tc'>
                
//                 <Scroll>
//                     <ErrorBoundary>
//                         <CardList monsters={filteredMonsters}/>
//                     </ErrorBoundary>
//                 </Scroll>
//             </div>
//         );
//     }
// }

export default App