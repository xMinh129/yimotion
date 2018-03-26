import React from 'react';
import axios from 'axios';
const Link = require('react-router-dom').Link;


/****************************  ListOfAllClassesComp  ******************************/

class Classes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: ''
    }
    this.loadData = this.loadData.bind(this);
  }


  loadData() {

     // LOAD data from server...
    axios.get('/api/classes')
      .then(resp => {
        this.setState({
          classes: resp.data
        });

      })
      .catch(console.error);

  }

  componentDidMount() {
      this.loadData();
  }

  componentWillMount() {
      this.loadData();
  }

  componentDidUpdate(){
      this.loadData();
  }

  componentDidCatch(error) {
   this.setState({error})
  }

  render(){

    if (this.state.classes){
      return(
        <div>
          <div className="table-responsive">
            <table id="dataTableExample1" className="table table-bordered table-striped table-hover">
               <thead>
                  <tr className="info">
                     <th>Class name</th>
                     <th>Teacher name</th>
                  </tr>
               </thead>
               <tbody>
                 {this.state.classes.map(clss =>
                    <tr className="patient-row">
                        <td><Link to={`/classes/${clss._id}`}>{clss.class_name}</Link></td>
                        <td>{clss.teacher_name}</td>
                    </tr>
                 )}
               </tbody>
            </table>
          </div>

          {/*<div className="btn btn-add">*/}
            {/*<Link to={'/patients/new'}><i className="fa fa-plus"></i>Add Patient</Link>*/}
          {/*</div>*/}

        </div>
      )
    } else {
        return(
          <div>Loading Data...</div>
        )
    }

  }

}

export default Classes;
