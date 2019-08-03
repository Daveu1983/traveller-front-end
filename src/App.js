import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import ShowBlogs from './components/ShowBlogs';
import GetBlogs from './components/GetBlogs';
import EditBlog from './components/EditBlog';
import FilterBlogs from './components/FilterBlogs'
import Nav from './components/Nav';


class App extends Component {

  state = {
    blogs: [],
    isABlogInEditing: false,
    blogIdInEditing: 0,
    countriesAvailableToSelect:[],
    filteredCountry:"",
    filterOn:false
  }

  componentWillMount() {
    this.getBlogs();
    console.log(this.state.blogs)
  }

  filterBlogCountry = () =>{
    let bloggedAboutCountries = []
    this.state.blogs.forEach((element) =>{
      if(bloggedAboutCountries.indexOf(element.blog_country_name) === -1){
        bloggedAboutCountries.push(element.blog_country_name)
      }
    });
    this.setState({countriesAvailableToSelect: bloggedAboutCountries, filterOn: true})
  }


  getBlogs() {
    axios.get('http://localhost:8080/blogs/')
      .then(response => {
       this.setState({blogs:response.data._embedded.blogs})
       })
       .catch(function (error) {
       console.log(error);
       })
  }

  

  checkSwears=(blogText) => {
    blogText = blogText.split(" ");
    blogText = blogText.map((word) =>{
      let swears = ["shit", "fuck", "twat", "bastard", "arse", "damn"];
      swears.forEach((element) =>{
        if(word.toLowerCase().slice(0,element.length) === element){
          word = "****"
        }
      });
      return word;
    })
    return blogText.toString().replace(/,/g, ' ');
  }

  defaultValuesForForm = (element) =>{
      if (element === undefined){
        element = "nothing yet entered"
        return element
      }else{
        return element
      }
  } 

  addBlog = (userId, blogCountryName, blogCity, blogText, hotelName, hotelLink, restName, restLink, attractName, attractLink)=>{
    if ((userId === undefined) || (userId === "0")){
      alert("select  user");
    }
    if ((blogCountryName === undefined) || (blogCountryName === "Select the blog country")) {
      alert("select  country");
    }else{
      blogCity = this.defaultValuesForForm(blogCity)
      blogText = this.defaultValuesForForm(blogText)
      hotelName = this.defaultValuesForForm(hotelName)
      hotelLink = this.defaultValuesForForm(hotelLink)
      restName = this.defaultValuesForForm(restName)
      restLink = this.defaultValuesForForm(restLink)
      attractName = this.defaultValuesForForm(attractName)
      attractLink = this.defaultValuesForForm(attractLink)
      blogText =  this.checkSwears(blogText);
      axios.post('http://localhost:8080/blogs/',{
      blog_text:blogText,      
      blog_country_name:blogCountryName,
      blog_city:blogCity,
      user_id:parseInt(userId),
      hotel_name:hotelName,
      hotel_link:hotelLink,
      rest_name:restName,
      rest_link:restLink,
      attract_name:attractName,
      attract_link:attractLink  
     })
    .then(() => {
      if(this.state.filterOn){
        this.filterBlog(this.state.filteredCountry)
      }else{
        this.getBlogs();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  }

  deleteBlog = (blogId) => {
    axios.delete(`http://localhost:8080/blogs/${blogId}`)
      .then(() => {
        if(this.state.filterOn){
          this.filterBlog(this.state.filteredCountry)
        }else{
          this.getBlogs();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  modifyBlog = (blogId) => {
    if (this.state.isABlogInEditing === true) {
      alert("A blog is already in editing, please try again later")
    } else {
      this.setState({ isABlogInEditing: true, blogIdInEditing: blogId })
    }
  }

  saveChanges = (blogId, blogCountryName, blogCity, blogText, restId, restName, restLink, hotelId, hotelName, hotelLink, attractId,attractName, attractLink) =>{
    if ((blogCountryName === undefined)){
      alert("select  country");
    }else{
      blogText =  this.checkSwears(blogText);
      axios.put('http://localhost:8080/blogs/',{ 
      blog_id:parseInt(blogId),
      blog_text:blogText,      
      blog_country_name:blogCountryName,
      blog_city:blogCity, 
      rest_id:restId,
      rest_name:restName,
      rest_link:restLink,
      hotel_id:hotelId,
      hotel_name:hotelName,
      hotel_link:hotelLink,
      attract_id:attractId,
      attract_name:attractName,
      attract_link:attractLink
     })
    .then(() => {
      if(this.state.filterOn){
        this.filterBlog(this.state.filteredCountry)
      }else{
        this.getBlogs();
      }
      this.setState({isABlogInEditing: false, blogIdInEditing:0})
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  }

  discardChanges = () =>{
    this.setState({isABlogInEditing: false, blogIdInEditing:0})
  }

  filterBlog = (country) =>{
    axios.get(`http://localhost:8080/blogs/${country}`)
    .then((response) => {
      let sortedBlogs = response.data.blogs;
      sortedBlogs.sort((a, b) => parseFloat(b.blog_id) - parseFloat(a.blog_id));
      this.setState({blogs:sortedBlogs, filteredCountry:country})
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  resetFilter = () =>{
    this.setState({filterOn:false, filteredCountry:""})
    this.getBlogs()
  }

  
  render(){
    return (
    <div className="container">  
      <div className="App">
        <Nav text="Talking Travel" />
        <div className="col-12" id="subHeader">
          <h4>Welcome to the travel site that gives you first-hand experiences of the places you want to visit</h4>
        </div>
        <div className="col-12"id="subHeader2">
          <h5>Take a look at the recommendations below and check out the best hotels, restaurants and attractions in that area</h5>
        </div>
        <div>
          <GetBlogs addBlogFunction={this.addBlog} />
          <FilterBlogs 
              filteredContent={this.state.filterOn}
              countriesToFilterOn={this.state.countriesAvailableToSelect}
              filterBlogCountryFunction={this.filterBlogCountry}
              filterBlogClickedFunction={this.filterBlog}
              resetFilterClickedFunction={this.resetFilter}/>
          {
            this.state.blogs.map((element, index) => {
              if (this.state.isABlogInEditing) {
                if (this.state.blogIdInEditing === element.blog_id) {
                  return <EditBlog
                    key={index}
                    blog_id={element.blog_id}
                    user_id={element.user_id}
                    user_name={element.userName}
                    blog_country_name={element.country}
                    blog_city={element.city}
                    blog_text={element.blogPost}
                    rest_name={element.resteraunt}
                    rest_link={element.resterauntLink}
                    hotel_name={element.hotel}
                    hotel_link={element.hotelLink}
                    attract_name={element.attraction}
                    attract_link={element.attractionLink}
                    saveChangeFunction={this.saveChanges}
                    discardChangeFunction={this.discardChanges}/>
                }
              } else {
                return<ShowBlogs key={index}
                          blog_id={element.blog_id}
                          user_name={element.userName}
                          blog_country_name={element.country}
                          blog_city={element.city}
                          blog_text={element.blogPost}
                          rest_name={element.resteraunt}
                          rest_link={element.resterauntLink}
                          hotel_name={element.hotel}
                          hotel_link={element.hotelLink}
                          attract_name={element.attraction}
                          attract_link={element.attractionLink}
                          deleteBlogFunction={this.deleteBlog}
                          modifyBlogFunction={this.modifyBlog}/>
                      }
                })
              }
        </div>
        <div id="Footer">
          <p>Powered by 'Appy Go Lucky</p>
        </div>
      </div>
    </div>
    );
  }
}
export default App;
