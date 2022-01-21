
import axios from "axios";

async function getData(Number){
    const {data: users} = await axios("https://jsonplaceholder.typicode.com/users/" + Number );

    const {data: posts} = await axios("https://jsonplaceholder.typicode.com/posts?id=" + Number );

    // console.log(users)
    // console.log(posts)

    return {"users":users, "posts":posts}
}
getData(1);




export default getData;







