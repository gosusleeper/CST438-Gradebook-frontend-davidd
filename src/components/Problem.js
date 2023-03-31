import * as React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state={names: "test", date:"2023-01-01", alias:'', course_id:'123456',attempt:null, 
                correct: false,  answer:null,  message:"start"};
  }

  //isItGood:,
  
  componentDidMount() {
    this.render();
  }
  
  fetchProblem = ()=> {
    fetch('http://localhost:8080/multiplication/new')
      .then(response => response.json() )
      .then(responseData => {
        this.setState({
          a: responseData.factorA,
          b: responseData.factorB
        });
      })
      .catch(err => console.error(err));
  }
  
  handleSubmit = () => {
    var holder = 200;
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/assignment/new/${this.state.names}/${this.state.course_id}/${this.state.date}`,
      {  
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': token }
      } )
      .then(res => {
          if (res.ok) {
            this.setState({ message: "working"});
            toast.success("Assignment successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchAssignments();
          } else {
            this.setState({ message: "not working"});
            toast.error("Error new assignment failed.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
     // .catch(err => {
       // toast.error("Error new assignment failed.", {
        //     position: toast.POSITION.BOTTOM_LEFT});
       //   console.error(err);
    //  }) 
}




  handleNext = () => {
    this.setState({attempt:'', message:'', correct:false});
    this.fetchProblem();
  }  


  
  handleChange = (event) =>  {
     this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
    const { names, date, course_id } = this.state;
    return (
      <div>
        <h3>Create new assignment </h3>

        <TextField autoFocus style = {{width:200}} 
             label="Name of Assignment" name="names" 
             onChange={this.handleChange}  /> 
             
        <br/> <br/>
        <TextField style = {{width:200}} label="Date - yyyy-mm-dd" name="date" 
             onChange={this.handleChange}   /> 
        <br/> <br/>
        <TextField style = {{width:200}} label="Course ID" name="course_id" 
             onChange={this.handleChange}  /> 
        <br/> <br/>
        <Button id="submit" variant="outlined" color="primary" style={{margin: 10}}
             onClick={this.handleSubmit} >Submit</Button>
        <h3 id="message">{this.state.message}</h3>
        <ToastContainer autoClose={1500} /> 
      </div>
      ); 
  }
}
export default Problem; 

