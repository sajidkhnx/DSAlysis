import React, { useEffect, useState } from "react";
// import axios from "axios";
import Navbar1 from "./components/Navbar1";
import HomeUI from "./components/HomeUI";


export default function Homenew() {
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   axios.get("https://dsalysis.onrender.com/api/questions").then((res) => {
  //     setQuestions(res.data);
  //     console.log(res.data); 
  //   });
  // }, []);

  // Filter questions
  // const filteredQuestions = questions.filter(q => q.check === true);
  // const UnfilteredQuestions = questions.filter(q => q.check === false);

  // const categoryMap = {};
  // questions.forEach(q => {
  //   if (!categoryMap[q.category]) {
  //     categoryMap[q.category] = { solved: 0, unsolved: 0 };
  //   }
  //   if (q.check === true) {
  //     categoryMap[q.category].solved++;
  //   } else {
  //     categoryMap[q.category].unsolved++;
  //   }
  // });


  return (
    <div>
      <Navbar1/>
      {/* <h2>UPLOAD kro IDHAR <Link to = "/upload"> 
      Dashboard 
      </Link> </h2> */}
      {/* <div>
        <h2>DSA Sheet Analytics</h2>
         <table border="1" cellPadding="10" cellSpacing="0" bgcolor="	#F0F0F0" >
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Company</th>
              <th>Link</th>
              <th>Check</th>  
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id}>
                <td>{q.title}</td>
                <td>{q.category}</td>
                <td>{q.difficulty}</td>
                <td>{q.companyTags.join(", ")}</td>
                <td><a href={q.link} target="_blank" rel="noreferrer">View</a></td>
                <td>{q.check ? "true" : "false"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        
      </div> */}
      <HomeUI />
    </div>
  );
}
