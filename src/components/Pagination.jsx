function Pagination({ total, limit, page, setPage}) {
    const pageNum = Math.ceil(total / limit);
    
    return(
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
            {Array(pageNum)
            .fill()
            .map((_, i) => (
                <button key={i+1} onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}>
                    {i + 1}
                </button>
            ))}
            <button onClick={() => setPage(page + 1)} disabled={page === pageNum}>&gt;</button>
            <style jsx>{`
                button {
                    margin: 2px;
                }
            `}</style>
        </div>
    )

}

export default Pagination;