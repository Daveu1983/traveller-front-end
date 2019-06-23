import React, { Component } from "react";
import axios from "axios";
import "./GetBlogs.css";
const countryList = require('country-list');

class GetBlogs extends Component{

    state = {
        blog:{blog_text:"", blog_country_name:"", blog_city:"", user_id:0, hotel_name:"",
              hotel_link:"", rest_name:"", rest_link:"", attract_name:"", attract_link:""},
        users:[],
        countries:[]
    }
    
    componentWillMount(){
        this.getUsers()
        this.getCountries()
      }
    
    getUsers(){
        axios.get('https://v1mglih8ha.execute-api.eu-west-2.amazonaws.com/dev/traveller/user')
    
        .then(response =>{
          this.setState({users:response.data.users})
        })
        .catch(function (error) {
        console.log(error);
        })
      }

    getCountries(){
        const currentCountries = countryList.getNames()
        this.setState({countries:currentCountries})
    }  

    saveUser = (event) =>{
        this.setState({user_id:event.target.value})
      }
    
    saveCountry = (event) =>{
        this.setState({blog_country_name:event.target.value})
      }

    blogCityBoxChanged = (event) =>{
    this.setState({blog_city: event.target.value})
        }

    blogPostBoxChanged = (event) =>{
        this.setState({blog_text: event.target.value})
        }

    hotelTextBoxChanged = (event) =>{
        this.setState({hotel_name: event.target.value})
        }

    hotelLinkBoxChanged = (event) =>{
        this.setState({hotel_link: event.target.value})
        }
    restTextBoxChanged = (event) =>{
        this.setState({rest_name: event.target.value})
        }

    restLinkBoxChanged = (event) =>{
        this.setState({rest_link: event.target.value})
        }

    attractTextBoxChanged = (event) =>{
        this.setState({attract_name: event.target.value})
        }

    attractLinkBoxChanged = (event) =>{
        this.setState({attract_link: event.target.value})
        }

    addBlogClicked = () => {
        this.props.addBlogFunction(this.state.user_id, this.state.blog_country_name,
                                   this.state.blog_city, this.state.blog_text,
                                   this.state.hotel_name,this.state.hotel_link,
                                   this.state.rest_name,this.state.rest_link,
                                   this.state.attract_name,this.state.attract_link);
        } 

    render(){
        return (
            <div>
                <div className="container generalContent">
                    <form className="formInTheCentre">
                        <div className="row">
                            <div className="col-2">
                                <select onChange={this.saveUser}>
                                    <option value="0">Select a user below</option>
                                        { 
                                            this.state.users.map((element, index)=>{
                                                return <option key={index} value={element.user_id}>{element.user_name} 
                                                    </option>
                                            })
                                        }
                                </select >
                            </div>
                            <div className="col-2">
                                <select onChange={this.saveCountry}>
                                    <option value="0">Select the blog country</option>
                                        { 
                                            this.state.countries.map((element, index)=>{
                                                return <option key={index} value={element}>{element} 
                                                    </option>
                                            })
                                        }
                                </select >
                            </div>
                        <div className="col-10">  
                            <input onChange={this.blogCityBoxChanged} className="form-control" type="text"
                            placeholder="Blog City"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.blogPostBoxChanged} className="form-control" type="text"
                            placeholder="Blog post"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.hotelTextBoxChanged} className="form-control" type="text"
                            placeholder="Hotel Text"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.hotelLinkBoxChanged} className="form-control" type="text"
                            placeholder="Hotel Link"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.restTextBoxChanged} className="form-control" type="text"
                            placeholder="Resteraunt Text"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.restLinkBoxChanged} className="form-control" type="text"
                            placeholder="Resteraunt Link"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.attractTextBoxChanged} className="form-control" type="text"
                            placeholder="Attraction Text"/>
                        </div>
                        <div className="col-10">  
                            <input onChange={this.attractLinkBoxChanged} className="form-control" type="text"
                            placeholder="Attraction Link"/>
                        </div>
                    <div className="col-12 text-center">
                        <button type="reset" className="btn btn-secondary"  onClick={this.addBlogClicked}>
                        save blog post
                        </button>
                    </div>
                </div>
            </form>
        </div>
            </div>
        ) 
    }
}

export default GetBlogs;