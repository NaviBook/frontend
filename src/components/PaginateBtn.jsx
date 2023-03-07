import React from "react";

const record = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  
//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumber.push(i);
//   }
    for(let i = 1; i <= 5; i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumber.map((pageNum) => (
                <li
                    key={pageNum}
                    className="pagination_item"
                    onClick={() => paginate(pageNum)}
                >
                    {pageNum}
                </li>
            ))}
            <style jsx>{`
                ul {
                    display: flex;
                    justify-content: center;
                }
                li {
                    float: left;
                    margin: 0px 10px;
                    width: 15px;
                    list-style: none;
                    border: 1px solid black;
                    cursor: pointer; 
                }
            `}</style>
        </ul>
    );
};

export default record;
