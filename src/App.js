// import{ Component } from 'react';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = ()=>{

  const [ searchField, setSearchField ] = useState('');// [value, setValue]
  const [ monsters, setMonsters ] = useState([]);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);


  useEffect( ()=>{
   fetch('https://jsonplaceholder.typicode.com/users')
   .then((response) => response.json())
   .then((users) => setMonsters(users));
       }, []
  )// useEffect() hook takes two arguments, the first is going to be a callback function, the second is going to be an array of dependencies.

  // fetch('https://jsonplaceholder.typicode.com/users')
  // .then((response) => response.json())
  // .then((users) => setMonsters(users)); // it will lead to an infinit loop, to avoid that we want to trigger side effects by using useEffect() hook;

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  },[ monsters, searchField ])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }



  

  return(
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1> 
      <SearchBox className = 'monsters-search-box' onChangeHandler = {onSearchChange} placeholder = 'search monsters'/>
      <CardList  monsters = {filteredMonsters}/> 
    </div>
  )

}

// class component goes here:
// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       monsters: [],
//       searchField:''
//     };
//   }  

// componentDidMount(){
//   fetch('https://jsonplaceholder.typicode.com/users')
//   .then((response)=>{return response.json()})
//   .then((users)=>{ this.setState(
//     ()=>{
//       return {monsters: users};
//     }
//   )})
// }

// onSearchChange = (event)=>{
//   const searchField = event.target.value.toLowerCase();
//   this.setState(()=>{
//     return { searchField };
//   });
// };

//   render(){
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster)=>{
//       return monster.name.toLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//        <h1 className='app-title'>Monsters Rolodex</h1>
//        <SearchBox onChangeHandler = { onSearchChange } placeholder = 'search monsters' className = 'monsters-search-box' />
//        <CardList monsters = { filteredMonsters} anything = {['a','z']}/>   
//       </div>
//     );
//   }
// }


export default App;
