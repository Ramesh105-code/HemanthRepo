function PersonCard({ name, total, isHighest }) {
  return (
    <div style={{ fontWeight: isHighest ? 'bold' : 'normal', color: isHighest ? 'green' : 'black' }}>
      {name}: ₹{total} {isHighest && '✅'}
    </div>
  );
}

export default PersonCard;
