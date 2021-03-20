import React, { Component } from 'react';
import heroapi from '../apiservices/heroapi';

class ListHeroes extends Component {
    constructor(props){
        super(props)
        this.state = {
            heroes:[],
            category:'NAME',
            search:'',
            categories:[{name:"Name", value:"NAME"}, 
            {name:"Code",value:"CODE"}, 
            {name:"Role", value:"ROLE"}, 
            {name:"Specialties", value:"SPECIALTIES"}]
        }
        this.addHero = this.addHero.bind(this);
        this.updateHero = this.updateHero.bind(this);
        this.delHero = this.delHero.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.searchKW = this.searchKW.bind(this);
        this.changeSearchHandler = this.changeSearchHandler.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByCode = this.sortByCode.bind(this);
        this.sortByNameAndCode = this.sortByNameAndCode.bind(this);
        this.watchVideo= this.watchVideo.bind(this);
    }

    componentDidMount(){
        heroapi.getAllHeroes().then((res)=>{
            this.setState({heroes:res.data});
        })
    }

    addHero(){
        this.props.history.push('/add-hero');
    }

    updateHero(id){
        this.props.history.push(`/update-hero/${id}`);
    }

    watchVideo(id){
        console.log('videoId',id);
        id===null||id===undefined || id===''?alert('Sorry, no video added yet.'): this.props.history.push(`/watch-video/${id}`);
    }
    delHero(id){
        var res = window.confirm("Are you sure?");
        if(res){
            heroapi.removeHero(id).then((res) =>{
                this.setState({heroes:this.state.heroes.filter(hero=>hero.id !== id)});
            })
        }
    }

    changeCategoryHandler = (event)=>{
        this.setState({category:event.target.value});
    }

    searchKW = (event)=>{
        if(event.key === "Enter"){
            let searchCriteria = {
                category:this.state.category, 
                searchVal:this.state.search
            }
           heroapi.getHeroesByFilter(searchCriteria).then(res=>{
               this.setState({heroes:res.data});
           });
        }
    }
    changeSearchHandler = (event)=>{
        this.setState({search:event.target.value});
    }

    sortByName(){
        this.setState({heroes:this.state.heroes.sort((a,b)=>this.nameCompare(a,b))});
    }

    sortByCode(){
        this.setState({heroes:this.state.heroes.sort((a,b)=>a.code > b.code?1:-1)});
    }

    sortByNameAndCode(){
        this.setState({heroes:this.state.heroes.sort((a,b)=>
            this.nameCompare(a,b) || a.code-b.code
            )
        })
    }

    nameCompare(a,b){

        if(a.name>b.name){
            return 1;
        }

        if(a.name<b.name){
            return -1;
        }
        return 0;
    }

    render() {
        const xcat = this.state.categories.map(cat=>
            <option key={cat.name} value={cat.value}>{cat.name}</option>
            );

        return (
            <div>
                <h2 className="text-center">MLBB Heroes</h2>
                <div className="row">
                    <div className="col-3 p-0 m-1">
                    {/* <label htmlFor="category">Search:</label> */}
                        <select className="form-control m-1" name="category" id="category" value={this.state.category} onChange={this.changeCategoryHandler}>
                            {xcat}
                        </select>
                    </div>
                    <div className="col-5 p-0 m-1">
                        <input className="form-control m-1" type="text" placeholder="Enter keyword and enter to search" id="search" name="search" 
                        onChange={this.changeSearchHandler} onKeyUp={this.searchKW} value={this.state.search} />
                    </div>
                
                </div>
                
                
                <div className="row d-flex justify-content-end mb-2">
                    <button className="btn btn-primary" onClick={this.addHero}>Add Hero</button>
                </div>
                <div className="row">
                    <button className="caption text-lowercase btn btn-outline-secondary m-1" onClick={this.sortByName}>Sort by Name</button>
                    <button className="caption text-lowercase btn btn-outline-secondary m-1" onClick={this.sortByCode}>Sort by Code</button>
                    <button className="caption text-lowercase btn btn-outline-secondary m-1" onClick={this.sortByNameAndCode}>Sort by Name and Code</button>
                </div>
                <div className="row table-container">
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="sticky-column">Name</th>
                            <th className="sticky-column">Code</th>
                            <th className="sticky-column">Role</th>
                            <th className="sticky-column">Specialty</th>
                            <th className="sticky-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{overflowY:"auto", height:"10px"}}>
                        {
                            this.state.heroes.map(
                                hero=>
                                <tr key={hero.id}>
                                    <td>{hero.name}</td>
                                    <td>{hero.code}</td>
                                    <td>{hero.role}</td>
                                    <td>{hero.specialty}</td>
                                    <td className="d-flex justify-content-center">
                                        <button className="btn btn-info mr-2" onClick={()=> this.updateHero(hero.id)}>Edit</button>
                                        <button className="btn btn-danger mr-2" onClick={()=> this.delHero(hero.id)}>Delete</button>
                                        <button className="btn btn-dark" onClick={()=> this.watchVideo(hero.videoId)}>Watch Tutorial</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListHeroes;