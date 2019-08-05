import React, { Component } from "react";
import axios from "axios";
import '../EditBlog.css';
const countryList = require('country-list');

class EditBlogs extends Component{

state = {
    blog:{blogId:0, blogPost:"", country:"", city:"", hotel:"", hotelLink:"", 
    resteaunt:"", resterauntLink:"", attraction:"", attractionLink:"", userName:""},
    users:[],
    countries:[]
}

componentWillMount(){
    this.getUsers()
    this.getCountries()
    this.blogToEdit()
    }

    blogToEdit() {
        this.setState({
            blogId:this.props.blog_id,
            blogPost:this.props.blog_text,
            country:this.props.blog_country_name,
            city:this.props.blog_city,
            resteraunt:this.props.rest_name,
            resterauntLink:this.props.rest_link,
            hotel:this.props.hotel_name,
            hotelLink:this.props.hotel_link,
            attraction:this.props.attract_name,
            attractionLink:this.props.attract_link,
            userName:this.props.user_name
        })
    }

    getUsers(){
        axios.get('http://localhost:8080/users/')
    
        .then(response =>{
          this.setState({users:response.data._embedded.users})
        })
        .catch(function (error) {
        console.log(error);
        })
      }

    getCountries(){
        const currentCountries = countryList.getNames()
        this.setState({countries:currentCountries})
    }  
    
    saveCountry = (event) =>{
        this.setState({country:event.target.value})
      }

    blogCityBoxChanged = (event) =>{
    this.setState({city: event.target.value})
        }

    blogPostBoxChanged = (event) =>{
        this.setState({blogPost: event.target.value})
        }

    hotelTextBoxChanged = (event) =>{
        this.setState({hotel: event.target.value})
        }

    hotelLinkBoxChanged = (event) =>{
        this.setState({hotelLink: event.target.value})
        }
    restTextBoxChanged = (event) =>{
        this.setState({resteraunt: event.target.value})
        }

    restLinkBoxChanged = (event) =>{
        this.setState({resterauntLink: event.target.value})
        }

    attractTextBoxChanged = (event) =>{
        this.setState({attraction: event.target.value})
        }

    attractLinkBoxChanged = (event) =>{
        this.setState({attractionLink: event.target.value})
        }

    saveChangeClicked = () => {
        this.props.saveChangeFunction(this.state.blogId, this.state.country,
                                   this.state.city, this.state.blogPost, this.state.resteraunt,
                                   this.state.resterauntLink, this.state.hotel,
                                   this.state.hotelLink, this.state.attraction,
                                   this.state.attractionLink, this.state.userName);
        } 

    discardChangeClicked = () =>{
        this.props.discardChangeFunction()
    }

render(){
    return (
        <div className="container" >
        <div className="row generalContent">
        <form className="formInTheCentre">
            <div className="row">
                <div className="col-2">
                    <select onChange={this.saveCountry}>
                        <option value={this.props.blog_country_name}>{this.props.blog_country_name}</option>
                            { 
                                this.state.countries.map((element, index)=>{
                                    return <option key={index} value={element}>{element} 
                                        </option>
                                })
                            }
                    </select >
                </div>
                <div className="col-12">    
                    <input onChange={this.blogCityBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.blog_city}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.blogPostBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.blog_text}/>
                </div>
                <div className="col-12">   
                    <input onChange={this.restTextBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.rest_name}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.restLinkBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.rest_link}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.hotelTextBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.hotel_name}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.hotelLinkBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.hotel_link}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.attractTextBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.attract_name}/>
                </div>
                <div className="col-12">    
                    <input onChange={this.attractLinkBoxChanged} className="form-control" type="text"
                    defaultValue={this.props.attract_link}/>
                </div>
                <div className="col-6 text-center">
                    <button className="btn btn-secondary" type="button" onClick={this.saveChangeClicked}>
                    Save changes
                    </button>
                </div>
                <div className="col-6 text-center">
                    <button className="btn btn-secondary" type="button" 
                    onClick={this.discardChangeClicked}>
                    discard changes
                    </button>
                </div>
            </div>
        </form>      
        </div>
    </div>
    ) 
  }
}

export default EditBlogs;