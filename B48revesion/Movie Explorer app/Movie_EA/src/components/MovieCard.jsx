export default function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : `https://placehold.co/342x513?text=${encodeURIComponent(movie.Title)}`;
  return (
    <div style={{width:"30%",minHeight:"250px",border:"1px solid white",borderRadius:"15px",boxShadow:"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"}}>
      <img src={poster} alt={movie.Title} style={{width:"100%",maxHeight:"200px",borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}} />
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h3 style={{fontSize:"15px",margin:"0px"}} >{movie.Title}</h3>
        <p style={{fontSize:"10px",margin:"0px"}}>{movie.Year}</p>
      </div>
    </div>
  );
}
