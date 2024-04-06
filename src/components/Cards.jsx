const Cards = ({ title, data }) => {
    return (
      <div className="card">
        <h2>{data}</h2>
        <h2>{title}</h2>
      </div>
    );
  };
  
  export default Cards;