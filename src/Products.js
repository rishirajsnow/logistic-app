import { useEffect, useState} from 'react';
import _ from 'lodash';


const Products = ({ state, dispatch }) => {
    const pageSize=10;
    const { products } = state;
    const [searchTearm, setsearchTerm] = useState("");
    const [paginatedPosts,setpaginatedPosts]=useState();
    const[currentPage,setcurrentPage]=useState(1);
    const pageCount=products?Math.ceil(products.length/pageSize):0;
    useEffect(()=>{
        setpaginatedPosts(_(products).slice(0).take(pageSize).value());
    },[products])

    if(pageCount===1)return null;
    const pages= _.range(1,pageCount+1);
    
    
console.log(paginatedPosts)
    const pagination=(pageNo)=>{
        setcurrentPage(pageNo);
        const startIndex=(pageNo-1)*pageSize;
        const paginatedPost=_(products).slice(startIndex).take(pageSize).value();
        setpaginatedPosts(paginatedPost);
console.log(paginatedPosts)
    }

    return (
        <div className="container">
            <input type="text" placeholder="Search.." className='form-control' 
            style={{ marginTop: 50, marginBottom: 20, width: "40%" }}
            onChange={(e)=>{
                setsearchTerm(e.target.value);
            }}
            />
            {paginatedPosts&&searchTearm===""?(<table className="table table-bordered" >
                <thead className='thead-dark'>
                    <tr>
                        <th style={{ textAlign: "center" }}>Id</th>
                        <th style={{ textAlign: "center" }}>Vendor</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                </thead>
                <tbody>        {paginatedPosts.map((m) => {
                    return (
                        <tr key={m.id} >
                            <td>{m.id}</td>
                            <td>{m.vendor}</td>
                            <td>{m.date}</td>
                            <td>{m.status}</td>
                        </tr>
                    )
                })}</tbody>

            </table>):(
                <table className="table table-bordered" >
                <thead className='thead-dark'>
                    <tr>
                        <th style={{ textAlign: "center" }}>Id</th>
                        <th style={{ textAlign: "center" }}>Vendor</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                </thead>
                <tbody>        {products.filter((val)=>{
                    if(searchTearm===""){return val;}
                    else if(val.vendor.toLowerCase().includes(searchTearm.toLowerCase())||
                    val.date.toLowerCase().includes(searchTearm.toLowerCase())||
                    val.status.toLowerCase().includes(searchTearm.toLowerCase())||
                    val.id.toLowerCase().includes(searchTearm.toLowerCase())||
                    val.vendor.toLowerCase().includes(searchTearm.toLowerCase())){return val}
                    return null;

                }).map((m) => {
                    return (
                        <tr key={m.id} >
                            <td>{m.id}</td>
                            <td>{m.vendor}</td>
                            <td>{m.date}</td>
                            <td>{m.status}</td>
                        </tr>
                    )
                })}</tbody>

            </table>
            )}
            <nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {
                    pages.map(page=>(
                        <li className={page===currentPage?"page-item active":"page-item"}>
                            <p className='page-link' onClick={()=>pagination(page)}>
                                {page}</p>
                                </li>
                    )
                    )}
                    
                </ul>
            </nav>
        </div>
    )
}

export default Products