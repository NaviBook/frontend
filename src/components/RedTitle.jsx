

const Title = ({title}) => {
    return (
        <div>
            <h1>{title}</h1>
            <style jsx>{`
                h1 {
                    color: red;
                    padding-left: 100px;
                }
            `}</style>
        </div>
    );
}

export default Title;