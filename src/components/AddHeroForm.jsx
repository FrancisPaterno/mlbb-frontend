import React, { Component } from 'react';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import heroapi from '../apiservices/heroapi';

class AddHeroForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id:this.props.match.params.id,
            name:'',
            code:'',
            role:'',
            specialty:'',
            video_id:'',
            error:'',
            roles:[
                {name:"Tank",value:"TANK"},
                {name:"Fighter",value:"FIGHTER"},
                {name:"Mage",value:"MAGE"},
                {name:"Assassin",value:"ASSASSIN"},
                {name:"Support",value:"SUPPORT"},
                {name:"Marksman",value:"MARKSMAN"},
            ]
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.changeSpecialtyHandler = this.changeSpecialtyHandler.bind(this);
        this.saveHero = this.saveHero.bind(this);
        this.changeVideoIdHandler = this.changeVideoIdHandler.bind(this);
    }
    changeNameHandler = (event)=>{
        this.setState({name:event.target.value});
    }

    changeCodeHandler = (event)=>{
        this.setState({code:event.target.value})
    }

    changeRoleHandler = (event)=>{
        this.setState({role:event.target.value})
    }

    changeSpecialtyHandler = (event)=>{
        this.setState({specialty:event.target.value})
    }

    changeVideoIdHandler = (event) =>{
        this.setState({video_id:event.target.value})
    }

    saveHero = (event)=>{
        event.preventDefault();
        
        let hero = {
                    name:this.state.name,
                    code:this.state.code,
                    role:this.state.role,
                    specialty:this.state.specialty,
                    videoId:this.state.video_id
        };
        console.log('hero', hero);
        if(this.state.id === undefined){
            heroapi.createHero(hero).then((res)=>{
                this.props.history.push('/');
            })
            .catch(()=>{
                this.setState({error:'Error saving hero. Please try again.'})
            });
        }
        else{
            heroapi.updateHero(hero, this.state.id).then(res=>{
                this.props.history.push('/');
            });
        }
    }

    cancel(){
        this.props.history.push('/');
    }

    getTitle(){
        return this.state.id === undefined? 'Add Hero': 'Edit Hero';
    }

    componentDidMount(){

        if(this.state.id === undefined){
            return
        }
        else{
            heroapi.getHerobyId(this.state.id).then(res=>{
                let hero = res.data;
                this.setState({
                    name:hero.name,
                    code:hero.code,
                    role:hero.role,
                    specialty:hero.specialty,
                    video_id:hero.videoId
                });
            });
        }
    }


    render() {
        const xroles = this.state.roles.map(xrole=>
            <option key={xrole.name} value={xrole.value}>{xrole.name}</option>
            );
        
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">{this.getTitle()}</h3>
                            <span className="text-danger text-center">{this.state.error }</span>
                            <div className="card-body">
                                <ValidatorForm ref="form" onSubmit={this.saveHero} onError={errors=>console.log(errors)}>
                                    <div className="form-group">
                                        <TextValidator label="Name" name="name" className="form-control mb-4" id="name"  value={this.state.name}
                                        placeholder="Enter hero name" onChange={this.changeNameHandler}
                                        validators={['required']} errorMessages={['Name is required.']}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextValidator type="number" label="Code" name="code" id="code" className="form-control mb-4"  value={this.state.code}
                                        placeholder="Enter code" onChange={this.changeCodeHandler} 
                                        validators={['required']} errorMessages={['Code is required.']}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <SelectValidator label="Role" className="form-control mb-4" id="role" name="role" value={this.state.role} 
                                          onChange={this.changeRoleHandler}
                                          validators={['required']} errorMessages={['Please select role.']}
                                        >
                                            {xroles}
                                        </SelectValidator>
                                    </div>
                                    <div className="form-group">
                                        <TextValidator label="Specialty" name="specialty" id="specialty" className="form-control mb-4"  value={this.state.specialty}
                                        placeholder="Enter specialty seperated by ," onChange={this.changeSpecialtyHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <TextValidator label="Youtube Video Id" name="videoId" id="videoId" className="form-control mb-4"  value={this.state.video_id}
                                        placeholder="Enter youtube video id  ," onChange={this.changeVideoIdHandler}/>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                    <button  type="submit" className="btn btn-success" >Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} 
                                    style={{marginLeft:"10px"}}>Cancel</button>
                                    </div>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHeroForm;